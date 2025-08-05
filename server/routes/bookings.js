const express = require("express")
const { body, validationResult } = require("express-validator")
const { authenticateToken } = require("../middleware/auth")
const Booking = require("../models/Booking")
const Test = require("../models/Test")
const Patient = require("../models/Patient")

const router = express.Router()

// Book a test
router.post(
  "/",
  authenticateToken,
  [
    body("testId").notEmpty().withMessage("Test ID is required"),
    body("scheduledDate").isISO8601().withMessage("Please enter a valid scheduled date"),
    body("scheduledTime").notEmpty().withMessage("Scheduled time is required"),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        })
      }

      const { testId, scheduledDate, scheduledTime, notes } = req.body

      // Check if test exists
      const test = await Test.findById(testId)
      if (!test || !test.isActive) {
        return res.status(404).json({
          success: false,
          message: "Test not found",
        })
      }

      // Check if patient already has a booking for this test on the same date
      const existingBooking = await Booking.findOne({
        patient: req.patient._id,
        test: testId,
        scheduledDate: new Date(scheduledDate),
        status: { $in: ["Scheduled", "In Progress"] },
      })

      if (existingBooking) {
        return res.status(400).json({
          success: false,
          message: "You already have a booking for this test on the selected date",
        })
      }

      // Create new booking
      const booking = new Booking({
        patient: req.patient._id,
        test: testId,
        scheduledDate: new Date(scheduledDate),
        scheduledTime,
        price: test.price,
        notes,
        reportAvailable: Math.random() > 0.5, // Randomly set report availability for demo
      })

      await booking.save()

      // Populate the booking with test and patient details
      await booking.populate("test patient")

      res.status(201).json({
        success: true,
        message: "Test booked successfully",
        data: booking,
      })
    } catch (error) {
      console.error("Book test error:", error)
      res.status(500).json({
        success: false,
        message: "Failed to book test",
        error: error.message,
      })
    }
  },
)

// Get patient's bookings
router.get("/", authenticateToken, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query
    const query = { patient: req.patient._id }

    // Filter by status
    if (status) {
      query.status = status
    }

    const skip = (page - 1) * limit

    const bookings = await Booking.find(query)
      .populate("test", "name category price duration")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number.parseInt(limit))

    const total = await Booking.countDocuments(query)

    res.json({
      success: true,
      data: bookings,
      pagination: {
        current: Number.parseInt(page),
        total: Math.ceil(total / limit),
        count: bookings.length,
        totalRecords: total,
      },
    })
  } catch (error) {
    console.error("Get bookings error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to get bookings",
      error: error.message,
    })
  }
})

// Get booking by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      patient: req.patient._id,
    }).populate("test patient")

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      })
    }

    res.json({
      success: true,
      data: booking,
    })
  } catch (error) {
    console.error("Get booking error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to get booking",
      error: error.message,
    })
  }
})

// Cancel booking
router.patch("/:id/cancel", authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      patient: req.patient._id,
    })

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      })
    }

    if (booking.status === "Completed") {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel completed booking",
      })
    }

    booking.status = "Cancelled"
    await booking.save()

    res.json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking,
    })
  } catch (error) {
    console.error("Cancel booking error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to cancel booking",
      error: error.message,
    })
  }
})

// Download report
router.get("/:id/report", authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      patient: req.patient._id,
    }).populate("test patient")

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      })
    }

    if (!booking.reportAvailable) {
      return res.status(400).json({
        success: false,
        message: "Report not available yet",
      })
    }

    // Generate dummy report content
    const reportContent = `
HEALTHLAB DIAGNOSTIC REPORT
===========================

Patient Information:
- Name: ${booking.patient.name}
- Patient ID: ${booking.patient.patientId}
- Email: ${booking.patient.email}
- Phone: ${booking.patient.phone}

Test Information:
- Test Name: ${booking.test.name}
- Category: ${booking.test.category}
- Booking ID: ${booking.bookingId}
- Test Date: ${booking.scheduledDate.toLocaleDateString()}
- Report Generated: ${new Date().toLocaleDateString()}

RESULTS:
========

All parameters are within normal reference ranges.

Key Findings:
- No abnormalities detected
- All values within expected limits
- No immediate health concerns identified

Recommendations:
- Continue regular health monitoring
- Follow up with healthcare provider if needed
- Next screening recommended in 6-12 months

Laboratory Values:
- Parameter 1: Normal (Reference: Normal)
- Parameter 2: Normal (Reference: Normal)
- Parameter 3: Normal (Reference: Normal)

Notes:
${booking.notes || "No additional notes"}

---
This is a computer-generated report.
For questions, contact: support@healthlab.com
Report ID: ${booking.bookingId}_${Date.now()}
    `.trim()

    // Set headers for file download
    res.setHeader("Content-Type", "text/plain")
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${booking.test.name.replace(/\s+/g, "_")}_Report_${booking.bookingId}.txt"`,
    )

    res.send(reportContent)
  } catch (error) {
    console.error("Download report error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to download report",
      error: error.message,
    })
  }
})

module.exports = router

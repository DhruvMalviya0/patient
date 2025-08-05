const express = require("express")
const { authenticateToken } = require("../middleware/auth")
const Patient = require("../models/Patient")

const router = express.Router()

// Get patient profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    res.json({
      success: true,
      data: req.patient,
    })
  } catch (error) {
    console.error("Get profile error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to get profile",
      error: error.message,
    })
  }
})

// Update patient profile
router.put("/profile", authenticateToken, async (req, res) => {
  try {
    const allowedUpdates = ["name", "phone", "address", "emergencyContact", "medicalHistory"]

    const updates = {}
    Object.keys(req.body).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key]
      }
    })

    const patient = await Patient.findByIdAndUpdate(req.patient._id, updates, { new: true, runValidators: true })

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: patient,
    })
  } catch (error) {
    console.error("Update profile error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    })
  }
})

module.exports = router

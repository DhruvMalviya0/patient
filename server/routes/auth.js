const express = require("express")
const { body, validationResult } = require("express-validator")
const Patient = require("../models/Patient")
const { generateToken } = require("../middleware/auth")

const router = express.Router()

// Register Patient
router.post(
  "/register",
  [
    body("name").trim().isLength({ min: 2, max: 100 }).withMessage("Name must be between 2 and 100 characters"),
    body("email").isEmail().normalizeEmail().withMessage("Please enter a valid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("phone")
      .matches(/^\d{10}$/)
      .withMessage("Phone number must be 10 digits"),
    body("dateOfBirth").isISO8601().withMessage("Please enter a valid date of birth"),
    body("gender").isIn(["male", "female", "other", "prefer-not-to-say"]).withMessage("Please select a valid gender"),
    body("address").trim().isLength({ min: 10, max: 500 }).withMessage("Address must be between 10 and 500 characters"),
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

      const { name, email, password, phone, dateOfBirth, gender, address, emergencyContact, medicalHistory } = req.body

      // Check if patient already exists
      const existingPatient = await Patient.findOne({ email })
      if (existingPatient) {
        return res.status(400).json({
          success: false,
          message: "Patient with this email already exists",
        })
      }

      // Create new patient
      const patient = new Patient({
        name,
        email,
        password,
        phone,
        dateOfBirth,
        gender,
        address,
        emergencyContact,
        medicalHistory,
      })

      await patient.save()

      // Generate JWT token
      const token = generateToken(patient._id)

      res.status(201).json({
        success: true,
        message: "Patient registered successfully",
        data: {
          patient,
          token,
        },
      })
    } catch (error) {
      console.error("Registration error:", error)

      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "Email or phone number already exists",
        })
      }

      res.status(500).json({
        success: false,
        message: "Registration failed",
        error: error.message,
      })
    }
  },
)

// Login Patient
router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail().withMessage("Please enter a valid email address"),
    body("password").notEmpty().withMessage("Password is required"),
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

      const { email, password } = req.body

      // Find patient by email
      const patient = await Patient.findOne({ email, isActive: true })
      if (!patient) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        })
      }

      // Check password
      const isPasswordValid = await patient.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        })
      }

      // Generate JWT token
      const token = generateToken(patient._id)

      res.json({
        success: true,
        message: "Login successful",
        data: {
          patient,
          token,
        },
      })
    } catch (error) {
      console.error("Login error:", error)
      res.status(500).json({
        success: false,
        message: "Login failed",
        error: error.message,
      })
    }
  },
)

module.exports = router

const jwt = require("jsonwebtoken")
const Patient = require("../models/Patient")

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1] // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token required",
      })
    }

    const decoded = jwt.verify(token, JWT_SECRET)
    const patient = await Patient.findById(decoded.patientId)

    if (!patient || !patient.isActive) {
      return res.status(401).json({
        success: false,
        message: "Invalid token or patient not found",
      })
    }

    req.patient = patient
    next()
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      })
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      })
    }
    return res.status(500).json({
      success: false,
      message: "Authentication error",
    })
  }
}

const generateToken = (patientId) => {
  return jwt.sign({ patientId }, JWT_SECRET, { expiresIn: "7d" })
}

module.exports = { authenticateToken, generateToken }

const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["male", "female", "other", "prefer-not-to-say"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      maxlength: [500, "Address cannot exceed 500 characters"],
    },
    emergencyContact: {
      type: String,
      trim: true,
      maxlength: [200, "Emergency contact cannot exceed 200 characters"],
    },
    medicalHistory: {
      type: String,
      trim: true,
      maxlength: [1000, "Medical history cannot exceed 1000 characters"],
    },
    patientId: {
      type: String,
      unique: true,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

// Hash password before saving
patientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Generate patient ID before saving
patientSchema.pre("save", function (next) {
  if (!this.patientId) {
    this.patientId = "PAT" + Date.now() + Math.floor(Math.random() * 1000)
  }
  next()
})

// Compare password method
patientSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Remove password from JSON output
patientSchema.methods.toJSON = function () {
  const patient = this.toObject()
  delete patient.password
  return patient
}

module.exports = mongoose.model("Patient", patientSchema)

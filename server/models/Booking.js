const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient is required"],
    },
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: [true, "Test is required"],
    },
    scheduledDate: {
      type: Date,
      required: [true, "Scheduled date is required"],
    },
    scheduledTime: {
      type: String,
      required: [true, "Scheduled time is required"],
    },
    status: {
      type: String,
      enum: ["Scheduled", "In Progress", "Completed", "Cancelled"],
      default: "Scheduled",
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    reportAvailable: {
      type: Boolean,
      default: false,
    },
    reportData: {
      type: String,
      default: "",
    },
    bookingId: {
      type: String,
      unique: true,
      required: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },
  },
  {
    timestamps: true,
  },
)

// Generate booking ID before saving
bookingSchema.pre("save", function (next) {
  if (!this.bookingId) {
    this.bookingId = "BK" + Date.now() + Math.floor(Math.random() * 1000)
  }
  next()
})

module.exports = mongoose.model("Booking", bookingSchema)

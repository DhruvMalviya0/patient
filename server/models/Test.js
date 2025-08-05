const mongoose = require("mongoose")

const testSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Test name is required"],
      trim: true,
      maxlength: [200, "Test name cannot exceed 200 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Blood Tests", "Hormone Tests", "Vitamin Tests", "Urine Tests", "Other"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    preparation: {
      type: String,
      required: [true, "Preparation instructions are required"],
      trim: true,
      maxlength: [500, "Preparation instructions cannot exceed 500 characters"],
    },
    popular: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model("Test", testSchema)

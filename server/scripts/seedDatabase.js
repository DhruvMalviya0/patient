const mongoose = require("mongoose")
const Test = require("../models/Test")
require("dotenv").config()

const labTests = [
  {
    name: "Complete Blood Count (CBC)",
    category: "Blood Tests",
    price: 299,
    duration: "2-4 hours",
    description: "Comprehensive blood analysis including RBC, WBC, platelets, and hemoglobin levels.",
    preparation: "No fasting required",
    popular: true,
  },
  {
    name: "Lipid Profile",
    category: "Blood Tests",
    price: 450,
    duration: "4-6 hours",
    description: "Cholesterol and triglyceride levels to assess cardiovascular health.",
    preparation: "12-hour fasting required",
    popular: true,
  },
  {
    name: "Thyroid Function Test (TFT)",
    category: "Hormone Tests",
    price: 650,
    duration: "6-8 hours",
    description: "TSH, T3, and T4 levels to evaluate thyroid function.",
    preparation: "No special preparation needed",
    popular: false,
  },
  {
    name: "Diabetes Panel (HbA1c)",
    category: "Blood Tests",
    price: 380,
    duration: "4-6 hours",
    description: "Blood sugar levels and HbA1c for diabetes monitoring.",
    preparation: "No fasting required for HbA1c",
    popular: true,
  },
  {
    name: "Liver Function Test (LFT)",
    category: "Blood Tests",
    price: 520,
    duration: "4-6 hours",
    description: "Comprehensive liver enzyme and protein analysis.",
    preparation: "8-hour fasting recommended",
    popular: false,
  },
  {
    name: "Kidney Function Test (KFT)",
    category: "Blood Tests",
    price: 480,
    duration: "4-6 hours",
    description: "Creatinine, BUN, and other markers for kidney health.",
    preparation: "No special preparation needed",
    popular: false,
  },
  {
    name: "Vitamin D Test",
    category: "Vitamin Tests",
    price: 750,
    duration: "24-48 hours",
    description: "Vitamin D3 levels to assess bone health and immunity.",
    preparation: "No special preparation needed",
    popular: true,
  },
  {
    name: "Urine Analysis",
    category: "Urine Tests",
    price: 180,
    duration: "2-4 hours",
    description: "Complete urine examination for infections and kidney function.",
    preparation: "Clean catch midstream sample",
    popular: false,
  },
]

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/healthlab")
    console.log("Connected to MongoDB")

    // Clear existing tests
    await Test.deleteMany({})
    console.log("Cleared existing tests")

    // Insert new tests
    await Test.insertMany(labTests)
    console.log("Seeded lab tests successfully")

    console.log("Database seeding completed!")
    process.exit(0)
  } catch (error) {
    console.error("Seeding error:", error)
    process.exit(1)
  }
}

seedDatabase()

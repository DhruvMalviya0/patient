const express = require("express")
const Test = require("../models/Test")

const router = express.Router()

// Get all tests catalog
router.get("/", async (req, res) => {
  try {
    const { category, search, popular } = req.query
    const query = { isActive: true }

    // Filter by category
    if (category && category !== "All") {
      query.category = category
    }

    // Filter by popular tests
    if (popular === "true") {
      query.popular = true
    }

    let tests = await Test.find(query).sort({ popular: -1, name: 1 })

    // Search functionality
    if (search) {
      const searchRegex = new RegExp(search, "i")
      tests = tests.filter((test) => searchRegex.test(test.name) || searchRegex.test(test.description))
    }

    res.json({
      success: true,
      data: tests,
      count: tests.length,
    })
  } catch (error) {
    console.error("Get tests error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to get tests",
      error: error.message,
    })
  }
})

// Get test by ID
router.get("/:id", async (req, res) => {
  try {
    const test = await Test.findById(req.params.id)

    if (!test || !test.isActive) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      })
    }

    res.json({
      success: true,
      data: test,
    })
  } catch (error) {
    console.error("Get test error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to get test",
      error: error.message,
    })
  }
})

// Get test categories
router.get("/categories/list", async (req, res) => {
  try {
    const categories = await Test.distinct("category", { isActive: true })

    res.json({
      success: true,
      data: categories,
    })
  } catch (error) {
    console.error("Get categories error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to get categories",
      error: error.message,
    })
  }
})

module.exports = router

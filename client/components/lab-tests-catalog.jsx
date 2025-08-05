"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, TestTube, Clock, Calendar } from "lucide-react"

const labTests = [
  {
    id: 1,
    name: "Complete Blood Count (CBC)",
    category: "Blood Tests",
    price: 299,
    duration: "2-4 hours",
    description: "Comprehensive blood analysis including RBC, WBC, platelets, and hemoglobin levels.",
    preparation: "No fasting required",
    popular: true,
  },
  {
    id: 2,
    name: "Lipid Profile",
    category: "Blood Tests",
    price: 450,
    duration: "4-6 hours",
    description: "Cholesterol and triglyceride levels to assess cardiovascular health.",
    preparation: "12-hour fasting required",
    popular: true,
  },
  {
    id: 3,
    name: "Thyroid Function Test (TFT)",
    category: "Hormone Tests",
    price: 650,
    duration: "6-8 hours",
    description: "TSH, T3, and T4 levels to evaluate thyroid function.",
    preparation: "No special preparation needed",
    popular: false,
  },
  {
    id: 4,
    name: "Diabetes Panel (HbA1c)",
    category: "Blood Tests",
    price: 380,
    duration: "4-6 hours",
    description: "Blood sugar levels and HbA1c for diabetes monitoring.",
    preparation: "No fasting required for HbA1c",
    popular: true,
  },
  {
    id: 5,
    name: "Liver Function Test (LFT)",
    category: "Blood Tests",
    price: 520,
    duration: "4-6 hours",
    description: "Comprehensive liver enzyme and protein analysis.",
    preparation: "8-hour fasting recommended",
    popular: false,
  },
  {
    id: 6,
    name: "Vitamin D Test",
    category: "Vitamin Tests",
    price: 750,
    duration: "24-48 hours",
    description: "Vitamin D3 levels to assess bone health and immunity.",
    preparation: "No special preparation needed",
    popular: true,
  },
]

export default function LabTestsCatalog({ patient, onTestBooked, onBack }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [bookingTest, setBookingTest] = useState(null)

  const categories = ["All", ...new Set(labTests.map((test) => test.category))]

  const filteredTests = labTests.filter((test) => {
    const matchesSearch =
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || test.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleBookTest = (test) => {
    setBookingTest(test)
    setTimeout(() => {
      onTestBooked({
        testId: test.id,
        testName: test.name,
        price: test.price,
        category: test.category,
        scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        scheduledTime: "10:00 AM",
      })
      setBookingTest(null)
      alert(`Test "${test.name}" has been successfully booked!`)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4 text-slate-300 hover:text-white hover:bg-slate-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <TestTube className="h-12 w-12 text-blue-400 mr-3" />
            <h1 className="text-3xl font-bold text-white">Lab Tests Catalog</h1>
          </div>
          <p className="text-slate-300">Choose from our comprehensive range of diagnostic tests</p>
          {patient && <p className="text-sm text-blue-400 mt-2">Booking for: {patient.name}</p>}
        </div>

        <Card className="mb-6 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search tests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-blue-600 hover:bg-blue-700" : "border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <Card key={test.id} className="hover:shadow-xl transition-all duration-300 bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 hover:border-slate-600">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg text-white">{test.name}</CardTitle>
                  {test.popular && (
                    <Badge variant="secondary" className="bg-orange-900/50 text-orange-300 border-orange-700">
                      Popular
                    </Badge>
                  )}
                </div>
                <Badge variant="outline" className="w-fit border-slate-600 text-slate-300">
                  {test.category}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-sm mb-4">{test.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <span className="font-semibold text-white">₹{test.price}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 text-blue-400 mr-2" />
                    <span className="text-slate-300">Results in {test.duration}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 text-purple-400 mr-2" />
                    <span className="text-xs text-slate-400">{test.preparation}</span>
                  </div>
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => handleBookTest(test)} disabled={bookingTest?.id === test.id}>
                  {bookingTest?.id === test.id ? "Booking..." : "Book Test"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

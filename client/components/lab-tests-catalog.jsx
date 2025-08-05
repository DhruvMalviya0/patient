"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, TestTube, Clock, DollarSign, Calendar } from "lucide-react"
import { testsAPI, bookingsAPI } from "@/lib/api"

export default function LabTestsCatalog({ patient, onTestBooked, onBack }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [bookingTest, setBookingTest] = useState(null)
  const [tests, setTests] = useState([])
  const [categories, setCategories] = useState(["All"])
  const [loading, setLoading] = useState(true)

  // Load tests and categories on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [testsResponse, categoriesResponse] = await Promise.all([
          testsAPI.getAll(),
          testsAPI.getCategories()
        ])
        
        setTests(testsResponse.data)
        setCategories(["All", ...categoriesResponse.data])
      } catch (error) {
        console.error('Failed to load tests:', error)
        alert('Failed to load tests. Please try again.')
      }
      setLoading(false)
    }

    loadData()
  }, [])

  const filteredTests = tests.filter((test) => {
    const matchesSearch =
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || test.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleBookTest = async (test) => {
    setBookingTest(test)
    
    try {
      const bookingData = {
        testId: test._id,
        scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        scheduledTime: "10:00 AM",
        notes: ""
      }
      
      const response = await bookingsAPI.create(bookingData)
      onTestBooked(response.data)
      alert(`Test "${test.name}" has been successfully booked!`)
    } catch (error) {
      console.error('Booking failed:', error)
      alert(`Booking failed: ${error.message}`)
    }
    
    setBookingTest(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <TestTube className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading tests...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <TestTube className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Lab Tests Catalog</h1>
          </div>
          <p className="text-gray-600">Choose from our comprehensive range of diagnostic tests</p>
          {patient && <p className="text-sm text-blue-600 mt-2">Booking for: {patient.name}</p>}
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
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
            <Card key={test._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{test.name}</CardTitle>
                  {test.popular && (
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      Popular
                    </Badge>
                  )}
                </div>
                <Badge variant="outline" className="w-fit">
                  {test.category}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{test.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <DollarSign className="h-4 w-4 text-green-600 mr-2" />
                    <span className="font-semibold">₹{test.price}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Results in {test.duration}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 text-purple-600 mr-2" />
                    <span className="text-xs">{test.preparation}</span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  onClick={() => handleBookTest(test)} 
                  disabled={bookingTest?._id === test._id}
                >
                  {bookingTest?._id === test._id ? "Booking..." : "Book Test"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
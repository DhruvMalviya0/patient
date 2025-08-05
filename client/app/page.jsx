"use client"

import { useState } from "react"
import PatientRegistration from "../components/patient-registration"
import LabTestsCatalog from "../components/lab-tests-catalog"
import BookingHistory from "../components/booking-history"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, TestTube, History, Heart } from "lucide-react"

export default function PatientPortal() {
  const [currentView, setCurrentView] = useState("home")
  const [patient, setPatient] = useState(null)
  const [bookings, setBookings] = useState([])

  const handlePatientRegistration = (patientData) => {
    setPatient(patientData)
    setCurrentView("tests")
  }

  const handleTestBooking = (testData) => {
    const newBooking = {
      id: Date.now(),
      ...testData,
      patientName: patient?.name || "Patient",
      bookingDate: new Date().toLocaleDateString(),
      status: "Scheduled",
      reportAvailable: Math.random() > 0.5,
    }
    setBookings([...bookings, newBooking])
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "register":
        return (
          <PatientRegistration
            onRegistrationComplete={handlePatientRegistration}
            onBack={() => setCurrentView("home")}
          />
        )
      case "tests":
        return (
          <LabTestsCatalog patient={patient} onTestBooked={handleTestBooking} onBack={() => setCurrentView("home")} />
        )
      case "history":
        return <BookingHistory bookings={bookings} patient={patient} onBack={() => setCurrentView("home")} />
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  <Heart className="h-12 w-12 text-blue-600 mr-3" />
                  <h1 className="text-4xl font-bold text-gray-800">HealthLab Portal</h1>
                </div>
                <p className="text-xl text-gray-600">Your trusted partner for lab testing and health monitoring</p>
              </div>

              {patient && (
                <Card className="mb-8 bg-green-50 border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <User className="h-8 w-8 text-green-600 mr-3" />
                      <div>
                        <h3 className="text-lg font-semibold text-green-800">Welcome back, {patient.name}!</h3>
                        <p className="text-green-600">Patient ID: {patient.id}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setCurrentView("register")}
                >
                  <CardHeader className="text-center">
                    <User className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-xl">Patient Registration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center mb-4">
                      {patient ? "Update your information" : "Register as a new patient to get started"}
                    </p>
                    <Button className="w-full">{patient ? "Update Profile" : "Register Now"}</Button>
                  </CardContent>
                </Card>

                <Card
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setCurrentView("tests")}
                >
                  <CardHeader className="text-center">
                    <TestTube className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <CardTitle className="text-xl">Lab Tests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center mb-4">
                      Browse and book from our comprehensive catalog of lab tests
                    </p>
                    <Button className="w-full" disabled={!patient}>
                      {patient ? "Browse Tests" : "Register First"}
                    </Button>
                  </CardContent>
                </Card>

                <Card
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setCurrentView("history")}
                >
                  <CardHeader className="text-center">
                    <History className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                    <CardTitle className="text-xl">Booking History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center mb-4">View your test history and download reports</p>
                    <Button className="w-full" disabled={!patient || bookings.length === 0}>
                      {bookings.length > 0 ? "View History" : "No Bookings Yet"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )
    }
  }

  return renderCurrentView()
}

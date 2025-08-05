"use client"

import { useState, useEffect } from "react"
import PatientRegistration from "../components/patient-registration"
import LoginForm from "../components/login-form"
import LabTestsCatalog from "../components/lab-tests-catalog"
import BookingHistory from "../components/booking-history"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
<<<<<<< HEAD
import { User, TestTube, History, Heart, LogOut } from "lucide-react"
=======
import { User, TestTube, History, Heart } from "lucide-react"
import { authHelpers, patientsAPI, bookingsAPI } from "@/lib/api"
>>>>>>> 55e2b7feb9d242154308376969111cc7d19395d2

export default function PatientPortal() {
  const [currentView, setCurrentView] = useState("home")
  const [patient, setPatient] = useState(null)
  const [bookings, setBookings] = useState([])
<<<<<<< HEAD
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // Fetch patient profile
      const fetchProfile = async () => {
        try {
          const { patients } = await import('@/lib/api')
          const response = await patients.getProfile()
          setPatient(response.data.patient)
          setIsAuthenticated(true)
        } catch (error) {
          console.error('Error fetching profile:', error)
          localStorage.removeItem('token')
        }
      }
      
      fetchProfile()
    }
  }, [])
=======
  const [loading, setLoading] = useState(true)
>>>>>>> 55e2b7feb9d242154308376969111cc7d19395d2

  // Check for existing authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      if (authHelpers.isAuthenticated()) {
        try {
          const response = await patientsAPI.getProfile()
          setPatient(response.data)
          
          // Load bookings
          const bookingsResponse = await bookingsAPI.getAll()
          setBookings(bookingsResponse.data)
        } catch (error) {
          console.error('Failed to load patient data:', error)
          authHelpers.removeToken()
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [])
  const handlePatientRegistration = (patientData) => {
    setPatient(patientData)
    setIsAuthenticated(true)
    setCurrentView("tests")
  }

<<<<<<< HEAD
  const handleLogin = (patientData) => {
    setPatient(patientData)
    setIsAuthenticated(true)
    setCurrentView("home")
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setPatient(null)
    setIsAuthenticated(false)
    setCurrentView("home")
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
=======
  const handleTestBooking = (newBooking) => {
>>>>>>> 55e2b7feb9d242154308376969111cc7d19395d2
    setBookings([...bookings, newBooking])
  }

  const handleLogout = () => {
    authHelpers.removeToken()
    setPatient(null)
    setBookings([])
    setCurrentView("home")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }
  const renderCurrentView = () => {
    switch (currentView) {
      case "login":
        return (
          <LoginForm
            onLoginSuccess={handleLogin}
            onRegisterClick={() => setCurrentView("register")}
          />
        )
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
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  <Heart className="h-12 w-12 text-blue-400 mr-3" />
                  <h1 className="text-4xl font-bold text-white">HealthLab Portal</h1>
                </div>
                <p className="text-xl text-slate-300">Your trusted partner for lab testing and health monitoring</p>
              </div>

              {patient && (
                <Card className="mb-8 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
<<<<<<< HEAD
                        <User className="h-8 w-8 text-emerald-400 mr-3" />
                        <div>
                          <h3 className="text-lg font-semibold text-white">Welcome back, {patient.name}!</h3>
                          <p className="text-slate-300">Patient ID: {patient.patientId || patient.id}</p>
                        </div>
                      </div>
                      <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
                        <LogOut className="h-4 w-4" /> Logout
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {!isAuthenticated && (
                <Card className="mb-8 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                      <p className="text-slate-300 mb-4 sm:mb-0">Please login or register to access all features</p>
                      <div className="flex gap-4">
                        <Button onClick={() => setCurrentView("login")} className="bg-blue-600 hover:bg-blue-700">Login</Button>
                        <Button variant="outline" onClick={() => setCurrentView("register")} className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">Register</Button>
=======
                        <User className="h-8 w-8 text-green-600 mr-3" />
                        <div>
                          <h3 className="text-lg font-semibold text-green-800">Welcome back, {patient.name}!</h3>
                          <p className="text-green-600">Patient ID: {patient.patientId}</p>
                        </div>
>>>>>>> 55e2b7feb9d242154308376969111cc7d19395d2
                      </div>
                      <Button variant="outline" size="sm" onClick={handleLogout}>
                        Logout
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card
                  className="hover:shadow-xl transition-all duration-300 cursor-pointer bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 hover:border-slate-600"
                  onClick={() => isAuthenticated ? setCurrentView("profile") : setCurrentView("register")}
                >
                  <CardHeader className="text-center">
                    <User className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                    <CardTitle className="text-xl text-white">Patient Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 text-center mb-4">
                      {isAuthenticated ? "View and update your information" : "Register as a new patient to get started"}
                    </p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">{isAuthenticated ? "View Profile" : "Register Now"}</Button>
                  </CardContent>
                </Card>

                <Card
                  className="hover:shadow-xl transition-all duration-300 cursor-pointer bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 hover:border-slate-600"
                  onClick={() => isAuthenticated ? setCurrentView("tests") : setCurrentView("login")}
                >
                  <CardHeader className="text-center">
                    <TestTube className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
                    <CardTitle className="text-xl text-white">Lab Tests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 text-center mb-4">
                      Browse and book from our comprehensive catalog of lab tests
                    </p>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={!isAuthenticated}>
                      {isAuthenticated ? "Browse Tests" : "Login First"}
                    </Button>
                  </CardContent>
                </Card>

                <Card
                  className="hover:shadow-xl transition-all duration-300 cursor-pointer bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 hover:border-slate-600"
                  onClick={() => isAuthenticated ? setCurrentView("history") : setCurrentView("login")}
                >
                  <CardHeader className="text-center">
                    <History className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                    <CardTitle className="text-xl text-white">Booking History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 text-center mb-4">View your test history and download reports</p>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700" disabled={!isAuthenticated || bookings.length === 0}>
                      {!isAuthenticated ? "Login First" : bookings.length > 0 ? "View History" : "No Bookings Yet"}
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

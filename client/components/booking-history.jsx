"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Calendar, TestTube, Clock, FileText, Eye } from "lucide-react"
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> fd8d5830b8a39491e9681aa9fb1442092f545ce0
import { generateMedicalReportPDF } from "@/lib/pdfUtils"

// Legacy text report generator kept for reference
// const generateDummyReport = (booking) => {
//   const reportData = `
// Patient Report
// ==============
// 
// Patient Name: ${booking.patientName}
// Test: ${booking.testName}
// Booking Date: ${booking.bookingDate}
// Report Date: ${new Date().toLocaleDateString()}
// 
// Test Results:
// - All parameters within normal range
// - No abnormalities detected
// - Recommended follow-up: 6 months
// 
// This is a dummy report for demonstration purposes.
//   `.trim()
// 
//   const blob = new Blob([reportData], { type: "text/plain" })
//   return URL.createObjectURL(blob)
// }
<<<<<<< HEAD
=======
=======
import { bookingsAPI } from "@/lib/api"

>>>>>>> 55e2b7feb9d242154308376969111cc7d19395d2
>>>>>>> fd8d5830b8a39491e9681aa9fb1442092f545ce0

export default function BookingHistory({ bookings, patient, onBack }) {
  const [viewingReport, setViewingReport] = useState(null)

<<<<<<< HEAD
  const handleDownloadReport = (booking) => {
    // Create report data object with all necessary information
    const reportData = {
      patientName: booking.patientName,
      patientId: patient?.id || 'Unknown',
      testName: booking.testName,
      category: booking.category,
      bookingDate: booking.bookingDate,
      scheduledDate: booking.scheduledDate,
      scheduledTime: booking.scheduledTime
    }
    
    // Generate PDF using the utility function
    generateMedicalReportPDF(reportData)
<<<<<<< HEAD
=======
=======
  const handleDownloadReport = async (booking) => {
    try {
      const response = await bookingsAPI.downloadReport(booking._id)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${booking.test.name.replace(/\s+/g, "_")}_Report_${booking.bookingId}.txt`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
      alert(`Download failed: ${error.message}`)
    }
>>>>>>> 55e2b7feb9d242154308376969111cc7d19395d2
>>>>>>> fd8d5830b8a39491e9681aa9fb1442092f545ce0
  }

  const handleViewReport = (booking) => {
    setViewingReport(booking)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-900/50 text-emerald-300 border-emerald-700"
      case "Scheduled":
        return "bg-blue-900/50 text-blue-300 border-blue-700"
      case "In Progress":
        return "bg-yellow-900/50 text-yellow-300 border-yellow-700"
      case "Cancelled":
        return "bg-red-900/50 text-red-300 border-red-700"
      default:
        return "bg-slate-900/50 text-slate-300 border-slate-700"
    }
  }

  if (viewingReport) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => setViewingReport(null)} className="mb-4 text-slate-300 hover:text-white hover:bg-slate-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to History
            </Button>
          </div>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <FileText className="h-6 w-6 mr-2" />
                Test Report - {viewingReport.test.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-700/50 p-6 rounded-lg border border-slate-600">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
<<<<<<< HEAD
                    <h3 className="font-semibold mb-2 text-white">Patient Information</h3>
                    <p className="text-slate-300">
                      <strong>Name:</strong> {viewingReport.patientName}
                    </p>
                    <p className="text-slate-300">
                      <strong>Patient ID:</strong> {patient?.id}
                    </p>
                    <p className="text-slate-300">
                      <strong>Test Date:</strong> {viewingReport.scheduledDate}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-white">Test Information</h3>
                    <p className="text-slate-300">
                      <strong>Test:</strong> {viewingReport.testName}
                    </p>
                    <p className="text-slate-300">
                      <strong>Category:</strong> {viewingReport.category}
=======
                    <h3 className="font-semibold mb-2">Patient Information</h3>
                    <p>
                      <strong>Name:</strong> {viewingReport.patient.name}
                    </p>
                    <p>
                      <strong>Patient ID:</strong> {patient?.patientId}
                    </p>
                    <p>
                      <strong>Test Date:</strong> {new Date(viewingReport.scheduledDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Test Information</h3>
                    <p>
                      <strong>Test:</strong> {viewingReport.test.name}
                    </p>
                    <p>
                      <strong>Category:</strong> {viewingReport.test.category}
>>>>>>> 55e2b7feb9d242154308376969111cc7d19395d2
                    </p>
                    <p className="text-slate-300">
                      <strong>Report Date:</strong> {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-600 pt-6">
                  <h3 className="font-semibold mb-4 text-white">Test Results</h3>
                  <div className="space-y-4">
                    <div className="bg-slate-600/50 p-4 rounded border border-slate-500">
                      <h4 className="font-medium text-emerald-400 mb-2">✓ Normal Results</h4>
                      <p className="text-sm text-slate-300">All parameters are within the normal reference range.</p>
                    </div>
                    <div className="bg-slate-600/50 p-4 rounded border border-slate-500">
                      <h4 className="font-medium mb-2 text-white">Key Findings</h4>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• No abnormalities detected</li>
                        <li>• All values within expected limits</li>
                        <li>• No immediate concerns identified</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <Button onClick={() => handleDownloadReport(viewingReport)} className="bg-blue-600 hover:bg-blue-700">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
                <Button variant="outline" onClick={() => setViewingReport(null)} className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
                  Close Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
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
            <Clock className="h-12 w-12 text-blue-400 mr-3" />
            <h1 className="text-3xl font-bold text-white">Booking History</h1>
          </div>
          <p className="text-slate-300">View your test bookings and download reports</p>
          {patient && (
<<<<<<< HEAD
            <p className="text-sm text-blue-400 mt-2">
              Patient: {patient.name} (ID: {patient.id})
=======
            <p className="text-sm text-blue-600 mt-2">
              Patient: {patient.name} (ID: {patient.patientId})
>>>>>>> 55e2b7feb9d242154308376969111cc7d19395d2
            </p>
          )}
        </div>

        {bookings.length === 0 ? (
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <TestTube className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-300 mb-2">No bookings found</h3>
              <p className="text-slate-400 mb-4">You haven't booked any tests yet.</p>
              <Button onClick={onBack} className="bg-blue-600 hover:bg-blue-700">Browse Lab Tests</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
<<<<<<< HEAD
              <Card key={booking.id} className="hover:shadow-xl transition-all duration-300 bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 hover:border-slate-600">
=======
              <Card key={booking._id} className="hover:shadow-md transition-shadow">
>>>>>>> 55e2b7feb9d242154308376969111cc7d19395d2
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
<<<<<<< HEAD
                        <TestTube className="h-5 w-5 text-blue-400 mr-2" />
                        <h3 className="text-lg font-semibold text-white">{booking.testName}</h3>
=======
                        <TestTube className="h-5 w-5 text-blue-600 mr-2" />
                        <h3 className="text-lg font-semibold">{booking.test.name}</h3>
>>>>>>> 55e2b7feb9d242154308376969111cc7d19395d2
                        <Badge className={`ml-3 ${getStatusColor(booking.status)}`}>{booking.status}</Badge>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-300">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Booked: {new Date(booking.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>
                            Scheduled: {new Date(booking.scheduledDate).toLocaleDateString()} at {booking.scheduledTime}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium text-white">₹{booking.price}</span>
                        </div>
                      </div>

<<<<<<< HEAD
                      <p className="text-sm text-slate-400 mt-2">Category: {booking.category}</p>
=======
                      <p className="text-sm text-gray-500 mt-2">Category: {booking.test.category}</p>
>>>>>>> 55e2b7feb9d242154308376969111cc7d19395d2
                    </div>

                    <div className="flex gap-2 mt-4 md:mt-0">
                      {booking.reportAvailable && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => handleViewReport(booking)} className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
                            <Eye className="h-4 w-4 mr-2" />
                            View Report
                          </Button>
                          <Button size="sm" onClick={() => handleDownloadReport(booking)} className="bg-blue-600 hover:bg-blue-700">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </>
                      )}
                      {!booking.reportAvailable && (
                        <Badge variant="outline" className="text-yellow-400 border-yellow-600">
                          Report Pending
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

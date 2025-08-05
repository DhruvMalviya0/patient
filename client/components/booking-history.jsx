"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Calendar, TestTube, Clock, FileText, Eye } from "lucide-react"

const generateDummyReport = (booking) => {
  const reportData = `
Patient Report
==============

Patient Name: ${booking.patientName}
Test: ${booking.testName}
Booking Date: ${booking.bookingDate}
Report Date: ${new Date().toLocaleDateString()}

Test Results:
- All parameters within normal range
- No abnormalities detected
- Recommended follow-up: 6 months

This is a dummy report for demonstration purposes.
  `.trim()

  const blob = new Blob([reportData], { type: "text/plain" })
  return URL.createObjectURL(blob)
}

export default function BookingHistory({ bookings, patient, onBack }) {
  const [viewingReport, setViewingReport] = useState(null)

  const handleDownloadReport = (booking) => {
    const reportUrl = generateDummyReport(booking)
    const link = document.createElement("a")
    link.href = reportUrl
    link.download = `${booking.testName.replace(/\s+/g, "_")}_Report_${booking.id}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(reportUrl)
  }

  const handleViewReport = (booking) => {
    setViewingReport(booking)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Scheduled":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (viewingReport) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => setViewingReport(null)} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to History
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-6 w-6 mr-2" />
                Test Report - {viewingReport.testName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold mb-2">Patient Information</h3>
                    <p>
                      <strong>Name:</strong> {viewingReport.patientName}
                    </p>
                    <p>
                      <strong>Patient ID:</strong> {patient?.id}
                    </p>
                    <p>
                      <strong>Test Date:</strong> {viewingReport.scheduledDate}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Test Information</h3>
                    <p>
                      <strong>Test:</strong> {viewingReport.testName}
                    </p>
                    <p>
                      <strong>Category:</strong> {viewingReport.category}
                    </p>
                    <p>
                      <strong>Report Date:</strong> {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Test Results</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-medium text-green-700 mb-2">✓ Normal Results</h4>
                      <p className="text-sm text-gray-600">All parameters are within the normal reference range.</p>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-medium mb-2">Key Findings</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• No abnormalities detected</li>
                        <li>• All values within expected limits</li>
                        <li>• No immediate concerns identified</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <Button onClick={() => handleDownloadReport(viewingReport)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
                <Button variant="outline" onClick={() => setViewingReport(null)}>
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
            <Clock className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Booking History</h1>
          </div>
          <p className="text-gray-600">View your test bookings and download reports</p>
          {patient && (
            <p className="text-sm text-blue-600 mt-2">
              Patient: {patient.name} (ID: {patient.id})
            </p>
          )}
        </div>

        {bookings.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <TestTube className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No bookings found</h3>
              <p className="text-gray-500 mb-4">You haven't booked any tests yet.</p>
              <Button onClick={onBack}>Browse Lab Tests</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <TestTube className="h-5 w-5 text-blue-600 mr-2" />
                        <h3 className="text-lg font-semibold">{booking.testName}</h3>
                        <Badge className={`ml-3 ${getStatusColor(booking.status)}`}>{booking.status}</Badge>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Booked: {booking.bookingDate}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>
                            Scheduled: {booking.scheduledDate} at {booking.scheduledTime}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium">₹{booking.price}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-500 mt-2">Category: {booking.category}</p>
                    </div>

                    <div className="flex gap-2 mt-4 md:mt-0">
                      {booking.reportAvailable && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => handleViewReport(booking)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Report
                          </Button>
                          <Button size="sm" onClick={() => handleDownloadReport(booking)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </>
                      )}
                      {!booking.reportAvailable && (
                        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
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

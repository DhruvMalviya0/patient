"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, User } from "lucide-react"
import { authAPI, authHelpers } from "@/lib/api"

export default function PatientRegistration({ onRegistrationComplete, onBack }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    emergencyContact: "",
    medicalHistory: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number must be 10 digits"
    }
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
    if (!formData.gender) newErrors.gender = "Gender is required"
    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    } else if (formData.address.trim().length < 3) {
      newErrors.address = "Address must be at least 3 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> fd8d5830b8a39491e9681aa9fb1442092f545ce0
    try {
      // Import the auth API
      const { authAPI } = await import('@/lib/api')
      
      // Register the patient
      const response = await authAPI.register(formData)
      
      // Complete registration
      onRegistrationComplete(response.data.patient)
    } catch (error) {
      console.error('Registration error:', error)
      alert(error.message || 'Registration failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
<<<<<<< HEAD
=======
=======
    const registerPatient = async () => {
      try {
        const response = await authAPI.register(formData)
        
        // Store the token
        authHelpers.setToken(response.data.token)
        
        // Pass patient data to parent
        onRegistrationComplete(response.data.patient)
      } catch (error) {
        console.error('Registration failed:', error)
        alert(`Registration failed: ${error.message}`)
      }
      setIsSubmitting(false)
    }

    registerPatient()
>>>>>>> 55e2b7feb9d242154308376969111cc7d19395d2
>>>>>>> fd8d5830b8a39491e9681aa9fb1442092f545ce0
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4 text-slate-300 hover:text-white hover:bg-slate-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <User className="h-12 w-12 text-blue-400 mr-3" />
              <CardTitle className="text-2xl text-white">Patient Registration</CardTitle>
            </div>
            <p className="text-slate-300">Please fill in your details to create your patient profile</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-slate-600 pb-2">Personal Information</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-slate-200">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={`bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 ${errors.name ? "border-red-500" : ""}`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-slate-200">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 ${errors.email ? "border-red-500" : ""}`}
                      placeholder="Enter your email"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-slate-200">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className={`bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 ${errors.password ? "border-red-500" : ""}`}
                      placeholder="Enter your password"
                    />
                    {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className={errors.password ? "border-red-500" : ""}
                      placeholder="Enter your password"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-slate-200">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={`bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 ${errors.phone ? "border-red-500" : ""}`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <Label htmlFor="dateOfBirth" className="text-slate-200">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className={`bg-slate-700 border-slate-600 text-white ${errors.dateOfBirth ? "border-red-500" : ""}`}
                    />
                    {errors.dateOfBirth && <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="gender" className="text-slate-200">Gender *</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger className={`bg-slate-700 border-slate-600 text-white ${errors.gender ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="male" className="text-white hover:bg-slate-600">Male</SelectItem>
                      <SelectItem value="female" className="text-white hover:bg-slate-600">Female</SelectItem>
                      <SelectItem value="other" className="text-white hover:bg-slate-600">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say" className="text-white hover:bg-slate-600">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && <p className="text-red-400 text-sm mt-1">{errors.gender}</p>}
                </div>

                <div>
                  <Label htmlFor="address" className="text-slate-200">Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className={`bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 ${errors.address ? "border-red-500" : ""}`}
                    placeholder="Enter your complete address"
                    rows={3}
                  />
                  {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-slate-600 pb-2">Emergency Contact</h3>
                <div>
                  <Label htmlFor="emergencyContact" className="text-slate-200">Emergency Contact (Name & Phone)</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    placeholder="e.g., John Doe - 9876543210"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-slate-600 pb-2">Medical Information</h3>
                <div>
                  <Label htmlFor="medicalHistory" className="text-slate-200">Medical History (Optional)</Label>
                  <Textarea
                    id="medicalHistory"
                    value={formData.medicalHistory}
                    onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    placeholder="Any relevant medical history, allergies, or current medications"
                    rows={4}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Complete Registration"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

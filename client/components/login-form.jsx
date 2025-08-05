"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Mail } from "lucide-react"

export default function LoginForm({ onLoginSuccess, onRegisterClick }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Import the auth API
      const { authAPI } = await import('@/lib/api')
      
      // Login the patient
      const response = await authAPI.login(formData)
      
      // Complete login
      onLoginSuccess(response.data.patient)
    } catch (error) {
      console.error('Login error:', error)
      alert(error.message || 'Login failed. Please check your credentials.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Login to Your Account</CardTitle>
          <p className="text-gray-600 mt-2">Enter your credentials to access your patient dashboard</p>
=======
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">Login to Your Account</CardTitle>
          <p className="text-slate-300 mt-2">Enter your credentials to access your patient dashboard</p>
>>>>>>> fd8d5830b8a39491e9681aa9fb1442092f545ce0
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
<<<<<<< HEAD
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
=======
              <Label htmlFor="email" className="text-slate-200">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
>>>>>>> fd8d5830b8a39491e9681aa9fb1442092f545ce0
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
<<<<<<< HEAD
                  className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
=======
                  className={`pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 ${errors.email ? "border-red-500" : ""}`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="password" className="text-slate-200">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
>>>>>>> fd8d5830b8a39491e9681aa9fb1442092f545ce0
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
<<<<<<< HEAD
                  className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
=======
                  className={`pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 ${errors.password ? "border-red-500" : ""}`}
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
>>>>>>> fd8d5830b8a39491e9681aa9fb1442092f545ce0
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>

            <div className="text-center mt-4">
<<<<<<< HEAD
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Button variant="link" className="p-0" onClick={onRegisterClick}>
=======
              <p className="text-sm text-slate-300">
                Don't have an account?{" "}
                <Button variant="link" className="p-0 text-blue-400 hover:text-blue-300" onClick={onRegisterClick}>
>>>>>>> fd8d5830b8a39491e9681aa9fb1442092f545ce0
                  Register here
                </Button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
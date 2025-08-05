# HealthLab Backend API

A comprehensive backend API for the HealthLab Patient Portal built with Node.js, Express.js, and MongoDB.

## Features

- **Patient Registration & Authentication** with JWT
- **Lab Tests Catalog** with search and filtering
- **Test Booking System** with validation
- **Report Generation & Download** with dummy data
- **Secure API** with authentication middleware
- **Data Validation** with express-validator
- **MongoDB Integration** with Mongoose ODM

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new patient
- `POST /api/auth/login` - Patient login

### Patients
- `GET /api/patients/profile` - Get patient profile (Protected)
- `PUT /api/patients/profile` - Update patient profile (Protected)

### Tests
- `GET /api/tests` - Get all lab tests (with search & filter)
- `GET /api/tests/:id` - Get specific test details
- `GET /api/tests/categories/list` - Get test categories

### Bookings
- `POST /api/bookings` - Book a test (Protected)
- `GET /api/bookings` - Get patient's bookings (Protected)
- `GET /api/bookings/:id` - Get specific booking (Protected)
- `PATCH /api/bookings/:id/cancel` - Cancel booking (Protected)
- `GET /api/bookings/:id/report` - Download test report (Protected)

## Setup Instructions

1. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Update MongoDB URI and JWT secret

3. **Database Setup**
   \`\`\`bash
   # Seed the database with lab tests
   npm run seed
   \`\`\`

4. **Start Server**
   \`\`\`bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   \`\`\`

## Authentication

All protected routes require a JWT token in the Authorization header:
\`\`\`
Authorization: Bearer <your-jwt-token>
\`\`\`

## Data Models

### Patient
- Personal information (name, email, phone, etc.)
- Medical history and emergency contacts
- Encrypted password storage
- Unique patient ID generation

### Test
- Test details (name, category, price, duration)
- Preparation instructions
- Popular test flagging

### Booking
- Links patient to test
- Scheduling information
- Status tracking
- Report availability

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- Error handling middleware
- CORS configuration

## Sample API Usage

### Register Patient
\`\`\`javascript
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210",
  "dateOfBirth": "1990-01-01",
  "gender": "male",
  "address": "123 Main St, City, State"
}
\`\`\`

### Book Test
\`\`\`javascript
POST /api/bookings
Authorization: Bearer <token>
{
  "testId": "test_id_here",
  "scheduledDate": "2024-01-15",
  "scheduledTime": "10:00 AM",
  "notes": "Optional notes"
}
\`\`\`

## Error Handling

The API returns consistent error responses:
\`\`\`javascript
{
  "success": false,
  "message": "Error description",
  "errors": [] // Validation errors if any
}
\`\`\`

## Development

- Uses nodemon for auto-restart during development
- Includes database seeding script
- Environment-based configuration
- Comprehensive error logging

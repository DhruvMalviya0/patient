# HealthLab Patient Portal - Frontend Only

A modern, responsive patient portal for lab test booking and management built with Next.js and Tailwind CSS. This application works entirely in the frontend without requiring a backend server.

## Features

- **Patient Registration & Login**: Secure authentication using localStorage
- **Lab Test Catalog**: Browse and book from a comprehensive list of diagnostic tests
- **Booking Management**: View booking history and download test reports
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful dark theme with smooth animations and transitions

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd patient-portal
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

### Frontend-Only Architecture

This application uses a mock API layer that simulates backend functionality:

- **Authentication**: Uses localStorage to store user tokens and patient data
- **Data Persistence**: All data is stored in the browser's localStorage
- **Mock API**: Simulates real API calls with delays for realistic user experience

### Key Components

- **Login/Registration**: Secure patient authentication
- **Lab Tests Catalog**: Browse and filter available tests
- **Booking System**: Schedule tests with automatic booking ID generation
- **Report Generation**: Download test reports as text files
- **Booking History**: View all past bookings and their status

### Data Storage

The application stores data locally in the browser:

- `authToken`: Authentication token
- `currentPatient`: Currently logged-in patient data
- `patients`: List of registered patients
- `bookings`: Patient's test bookings

## Usage

### For Patients

1. **Register**: Create a new patient account with your details
2. **Login**: Access your patient dashboard
3. **Browse Tests**: View available lab tests with prices and descriptions
4. **Book Tests**: Schedule tests for convenient dates and times
5. **View History**: Check your booking history and download reports

### Features

- **Search & Filter**: Find tests by name, category, or description
- **Popular Tests**: Highlighted tests that are commonly booked
- **Status Tracking**: Monitor booking status (Scheduled, Completed, Cancelled)
- **Report Downloads**: Generate and download test reports
- **Responsive Design**: Optimized for all device sizes

## Technology Stack

- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with custom dark theme
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React
- **PDF Generation**: jsPDF for report generation
- **State Management**: React hooks and localStorage

## Development

### Project Structure

```
client/
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── login-form.jsx    # Authentication form
│   ├── patient-registration.jsx
│   ├── lab-tests-catalog.jsx
│   └── booking-history.jsx
├── lib/                  # Utility functions
│   ├── api.js           # Mock API implementation
│   └── pdfUtils.js      # PDF generation utilities
└── public/              # Static assets
```

### Customization

- **Add New Tests**: Modify the `mockTests` array in `lib/api.js`
- **Update Styling**: Modify Tailwind classes or add custom CSS
- **Extend Features**: Add new components or modify existing ones

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Notes

- This is a demonstration application with mock data
- All data is stored locally in the browser
- No real backend or database is required
- Perfect for prototyping and demonstration purposes

## License

This project is for demonstration purposes only. 
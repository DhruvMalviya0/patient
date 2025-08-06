# Netlify Deployment Guide

This frontend application is now configured to work as a standalone application on Netlify without requiring a backend server. All data is stored in the browser's localStorage and uses mock data for demonstration purposes.

## Features

- **Patient Registration & Login**: Fully functional with localStorage persistence
- **Lab Tests Catalog**: Browse and search through mock lab tests
- **Test Booking**: Book tests with scheduling functionality
- **Booking History**: View past bookings and download mock reports
- **Responsive Design**: Works on all device sizes

## Deployment Steps

### Option 1: Deploy via Netlify UI

1. **Prepare your repository**:
   - Ensure all changes are committed to your Git repository
   - Push to GitHub, GitLab, or Bitbucket

2. **Deploy on Netlify**:
   - Go to [netlify.com](https://netlify.com) and sign up/login
   - Click "New site from Git"
   - Connect your Git provider and select this repository
   - Netlify will automatically detect the build settings from `netlify.toml`
   - Click "Deploy site"

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**:
   ```bash
   npm install --legacy-peer-deps
   npm run build
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod --dir=out
   ```

### Option 3: Manual Deployment

1. **Build the project locally**:
   ```bash
   npm install --legacy-peer-deps
   npm run build
   ```

2. **Upload the `out` folder**:
   - Go to Netlify dashboard
   - Drag and drop the `out` folder to deploy

## Configuration Files

- **`netlify.toml`**: Main configuration file for Netlify
- **`public/_redirects`**: Handles SPA routing redirects
- **`next.config.mjs`**: Updated for static export

## Key Changes Made

1. **Static Export Configuration**:
   - Added `output: 'export'` to Next.js config
   - Set `distDir: 'out'` for Netlify compatibility  
   - Enabled `trailingSlash: true` for better static hosting
   - Fixed React component issues for production build

2. **API Layer**:
   - Already using localStorage instead of backend APIs
   - Mock data for lab tests and patient information
   - Simulated API delays for realistic user experience

3. **Netlify Optimizations**:
   - Created `_redirects` file for SPA routing
   - Configured build command and publish directory in `netlify.toml`
   - Added environment variables for Node.js version

4. **Component Fixes**:
   - Recreated login form component with proper validation
   - Recreated patient registration component with comprehensive form fields
   - Ensured all components work with localStorage-based authentication

## Testing Your Deployment

Once deployed, test the following features:

1. **Registration**: Create a new patient account
2. **Login**: Log in with the created account
3. **Browse Tests**: View the lab tests catalog
4. **Book a Test**: Schedule a lab test
5. **View History**: Check booking history and download reports
6. **Responsive Design**: Test on mobile and desktop

## Data Persistence

- All data is stored in the browser's localStorage
- Data persists between browser sessions
- Clearing browser data will reset the application
- Each user's data is isolated to their browser

## Environment Variables

No environment variables are needed as this is a frontend-only application.

## Troubleshooting

### Build Issues
- Ensure Node.js version 18 or higher is used
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Routing Issues
- The `_redirects` file ensures all routes redirect to `index.html`
- This allows Next.js client-side routing to work properly

### Local Testing
- Run `npm run dev` for development
- Run `npm run build` to test production build locally
- Serve the `dist` folder with any static file server

## Support

For issues with deployment or functionality, check:
1. Netlify build logs in the dashboard
2. Browser console for any JavaScript errors
3. Network tab to verify no failed API calls

The application is designed to work completely offline after the initial load, making it perfect for static hosting on Netlify.
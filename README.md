markdown
Copy code
# YouTube Share Application Frontend

## Introduction
This project is the frontend application for a YouTube share platform, built using React.js and Vite. The application allows users to register, login, share YouTube videos, view a list of shared videos, and react to videos.

### Key Features
- User authentication (login and registration)
- Video sharing and retrieval
- Video reactions (like/unlike)
- Responsive design for better user experience
- Fast development and build using Vite

## Prerequisites
To run this project locally, ensure you have the following software installed:
- [Node.js](https://nodejs.org/) (version 14.x or later)

## Installation & Configuration
Follow these steps to set up the project:

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/youtube-share-frontend.git
   cd youtube-share-frontend
2. **Install dependencies**
    ```sh
    npm install
    Configure environment variables

3. **Create a .env file in the project root:**
    ```sh
    VITE_BACKEND_ENDPOINT=http://localhost:3000
Modify the .env file with your backend API endpoint or other configuration settings.
4. **Running the Application**
To start the development server, run:

    npm run dev
Access the application in your web browser at http://localhost:3000.

To build the application for production, use:

    npm run build

To preview the production build, use:

    npm run preview

Usage
The application consists of several key pages. Here’s a brief guide to using the application:

Home Page

Displays a list of shared videos.
Button to add a new video (only for logged-in users).
Registration Page

Form to register a new user.
Login Page

Form to log in an existing user.
Profile Page

Displays user profile information.
Video Interaction

View individual video details, like and unlike videos.
Troubleshooting
Here are some common issues that may arise during setup and their potential solutions:

Problem: Development server not starting

Solution: Ensure you have installed all dependencies and are using the correct version of Node.js.
Problem: Environment variables not loading

Solution: Verify that your .env file is correctly configured and the variables are correctly referenced in your code.
Problem: API requests failing

Solution: Ensure that your backend server is running and the VITE_BACKEND_ENDPOINT in your .env file is correctly set.
For further issues, refer to the project documentation or raise an issue on GitHub.


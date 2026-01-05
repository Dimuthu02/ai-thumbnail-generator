# AI Thumbnail Generator

An AI-powered thumbnail generator built using the MERN stack that allows users to generate high-quality thumbnails from text prompts. The application integrates AI image generation, user authentication, and a responsive user interface.

## Features

- 🎨 **AI-Powered Generation**: Create unique thumbnails using OpenAI's DALL-E 3 model
- 🔐 **User Authentication**: Secure signup and login with JWT tokens
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 💾 **Cloud Storage**: Save and manage all your generated thumbnails
- ⚡ **Fast & Easy**: Generate professional thumbnails in seconds
- 🗑️ **Management**: View, download, and delete your thumbnails

## Tech Stack

### Frontend
- React 19
- React Router DOM for navigation
- Axios for API calls
- Vite for fast development and building

### Backend
- Node.js & Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- OpenAI API (DALL-E 3) for image generation
- bcryptjs for password hashing

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- OpenAI API Key

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/thumbnail-generator
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. **Register**: Create a new account with your name, email, and password
2. **Login**: Sign in with your credentials
3. **Generate Thumbnails**: 
   - Navigate to the "Generate" page
   - Enter a detailed prompt describing your desired thumbnail
   - Click "Generate Thumbnail" and wait for the AI to create your image
4. **View & Manage**: 
   - View all your generated thumbnails in the Dashboard
   - Download thumbnails by clicking "View Full Size"
   - Delete thumbnails you no longer need

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Thumbnails
- `POST /api/thumbnails/generate` - Generate a new thumbnail (protected)
- `GET /api/thumbnails` - Get all user's thumbnails (protected)
- `GET /api/thumbnails/:id` - Get a specific thumbnail (protected)
- `DELETE /api/thumbnails/:id` - Delete a thumbnail (protected)

## Project Structure

```
ai-thumbnail-generator/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── thumbnailController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Thumbnail.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── thumbnailRoutes.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── PrivateRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── Generate.jsx
    │   ├── services/
    │   │   ├── authService.js
    │   │   └── thumbnailService.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## Tips for Better Prompts

To generate high-quality thumbnails, follow these tips:

- Be specific about colors, style, and mood
- Mention any text that should appear and its style
- Describe the emotions or feelings you want to convey
- Include specific elements or subjects you want in the thumbnail
- Example: "A vibrant YouTube thumbnail with bold text 'AMAZING' in red and yellow, featuring a shocked face expression on a colorful gradient background"

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue in the GitHub repository.

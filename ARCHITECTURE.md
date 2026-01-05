# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client (Browser)                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            React Frontend (Port 3000)                 │   │
│  │  • Home Page                                          │   │
│  │  • Login/Register Pages                               │   │
│  │  • Dashboard (View Thumbnails)                        │   │
│  │  • Generate Page (Create Thumbnails)                  │   │
│  │  • Navigation & Protected Routes                      │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTP/REST API
                            │ (axios requests)
┌───────────────────────────▼─────────────────────────────────┐
│              Express.js Backend (Port 5000)                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    Middleware                         │   │
│  │  • CORS                                               │   │
│  │  • Rate Limiting (100 req/15min)                      │   │
│  │  • JSON Body Parser                                   │   │
│  │  • Authentication (JWT Verify)                        │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                      Routes                           │   │
│  │  /api/auth                                            │   │
│  │    • POST /register                                   │   │
│  │    • POST /login                                      │   │
│  │    • GET /me (protected)                              │   │
│  │                                                        │   │
│  │  /api/thumbnails                                      │   │
│  │    • POST /generate (protected)                       │   │
│  │    • GET / (protected)                                │   │
│  │    • GET /:id (protected)                             │   │
│  │    • DELETE /:id (protected)                          │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   Controllers                         │   │
│  │  • authController (register, login, getMe)            │   │
│  │  • thumbnailController (generate, get, delete)        │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                     Models                            │   │
│  │  • User (name, email, password, createdAt)            │   │
│  │  • Thumbnail (user, prompt, imageUrl, createdAt)      │   │
│  └──────────────────────────────────────────────────────┘   │
└────────┬──────────────────────────────────┬────────────────┘
         │                                  │
         │                                  │
┌────────▼────────────┐          ┌──────────▼────────────────┐
│  MongoDB Database   │          │   OpenAI API (DALL-E 3)   │
│                     │          │                           │
│  Collections:       │          │  Text-to-Image            │
│  • users            │          │  Generation               │
│  • thumbnails       │          │  (1024x1024 images)       │
└─────────────────────┘          └───────────────────────────┘
```

## Data Flow

### User Registration/Login Flow
```
1. User enters credentials in Frontend
   ↓
2. Frontend sends POST to /api/auth/register or /api/auth/login
   ↓
3. Backend validates input
   ↓
4. Backend hashes password (bcryptjs)
   ↓
5. Backend saves user to MongoDB
   ↓
6. Backend generates JWT token
   ↓
7. Backend returns user data + token
   ↓
8. Frontend stores token in localStorage
   ↓
9. Frontend redirects to Dashboard
```

### Thumbnail Generation Flow
```
1. User enters prompt in Generate page
   ↓
2. Frontend sends POST to /api/thumbnails/generate with JWT
   ↓
3. Backend verifies JWT token
   ↓
4. Backend validates prompt
   ↓
5. Backend calls OpenAI DALL-E 3 API
   ↓
6. OpenAI generates image and returns URL
   ↓
7. Backend saves thumbnail to MongoDB
   ↓
8. Backend returns thumbnail data to Frontend
   ↓
9. Frontend displays success and redirects to Dashboard
```

### View Thumbnails Flow
```
1. User navigates to Dashboard
   ↓
2. Frontend sends GET to /api/thumbnails with JWT
   ↓
3. Backend verifies JWT token
   ↓
4. Backend queries MongoDB for user's thumbnails
   ↓
5. Backend returns array of thumbnails
   ↓
6. Frontend displays thumbnails in grid
```

## Component Architecture

### Frontend Components

```
App.jsx (Root)
├── AuthProvider (Context)
│   └── Router
│       ├── Navbar
│       └── Routes
│           ├── Home (Public)
│           ├── Login (Public)
│           ├── Register (Public)
│           ├── Dashboard (Protected)
│           │   └── ThumbnailGrid
│           └── Generate (Protected)
│               └── PromptForm
```

### Backend Structure

```
server.js (Entry Point)
├── Middleware
│   ├── cors()
│   ├── rateLimit()
│   ├── express.json()
│   └── Routes
│       ├── /api/auth
│       │   └── authRoutes
│       │       ├── POST /register → authController.registerUser
│       │       ├── POST /login → authController.loginUser
│       │       └── GET /me → protect → authController.getMe
│       └── /api/thumbnails
│           └── thumbnailRoutes
│               ├── POST /generate → protect → thumbnailController.generateThumbnail
│               ├── GET / → protect → thumbnailController.getThumbnails
│               ├── GET /:id → protect → thumbnailController.getThumbnail
│               └── DELETE /:id → protect → thumbnailController.deleteThumbnail
```

## Security Layers

```
1. CORS Protection
   ↓
2. Rate Limiting (100 req/15min)
   ↓
3. JWT Token Verification
   ↓
4. User Authentication
   ↓
5. Resource Authorization (user owns resource)
   ↓
6. Input Validation
   ↓
7. Password Hashing (bcryptjs)
```

## Technology Stack Details

### Frontend Technologies
- **React 19**: UI library
- **React Router DOM**: Client-side routing
- **Context API**: Global state management
- **Axios**: HTTP client
- **Vite**: Build tool and dev server

### Backend Technologies
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **JWT**: Token-based authentication
- **bcryptjs**: Password hashing
- **express-rate-limit**: Rate limiting middleware
- **dotenv**: Environment variables
- **cors**: CORS middleware

### External Services
- **OpenAI API**: DALL-E 3 for image generation
- **MongoDB Atlas**: Cloud database (optional)

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, lowercase),
  password: String (hashed),
  createdAt: Date
}
```

### Thumbnail Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User'),
  prompt: String,
  imageUrl: String,
  createdAt: Date
}
```

## API Authentication

### JWT Token Structure
```javascript
{
  header: {
    alg: "HS256",
    typ: "JWT"
  },
  payload: {
    id: "user_id_here",
    iat: 1234567890,
    exp: 1237159890
  },
  signature: "hash"
}
```

### Protected Endpoint Request
```
GET /api/thumbnails
Headers:
  Authorization: Bearer <JWT_TOKEN>
  Content-Type: application/json
```

## Development Workflow

1. **Install Dependencies**
   ```bash
   npm run install:all
   ```

2. **Configure Environment**
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env with your settings
   ```

3. **Start Development Servers**
   ```bash
   # Terminal 1
   npm run dev:backend
   
   # Terminal 2
   npm run dev:frontend
   ```

4. **Access Application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## Production Deployment

### Environment Variables (Production)
- Use strong, random JWT_SECRET
- Use MongoDB Atlas connection string
- Use production OpenAI API key
- Set NODE_ENV=production
- Enable HTTPS
- Configure CORS for production domain

### Deployment Checklist
- [ ] Set up MongoDB Atlas cluster
- [ ] Configure environment variables
- [ ] Build frontend (npm run build:frontend)
- [ ] Deploy backend to server/platform
- [ ] Deploy frontend to CDN/static host
- [ ] Configure domain and SSL certificate
- [ ] Set up monitoring and logging
- [ ] Configure backups

## Scaling Considerations

### Horizontal Scaling
- Load balancer for multiple backend instances
- Redis for session management
- CDN for frontend assets
- Caching layer for API responses

### Vertical Scaling
- Upgrade server resources
- Database optimization
- Connection pooling
- Compression middleware

### Performance Optimization
- Image CDN for generated thumbnails
- Database indexing
- API response caching
- Frontend code splitting
- Lazy loading components

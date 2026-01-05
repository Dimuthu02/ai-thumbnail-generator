# Deployment Guide

This guide provides instructions for deploying the AI Thumbnail Generator to production.

## Prerequisites

- Node.js installed on the server
- MongoDB database (local or MongoDB Atlas)
- OpenAI API key
- Domain name (optional)

## Backend Deployment

### Option 1: Traditional Server (VPS, EC2, etc.)

1. **Clone the repository:**
```bash
git clone https://github.com/Dimuthu02/ai-thumbnail-generator.git
cd ai-thumbnail-generator/backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create production .env file:**
```bash
cp .env.example .env
```

Edit `.env` with production values:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/thumbnail-generator
JWT_SECRET=your_strong_random_secret_key
PORT=5000
OPENAI_API_KEY=your_openai_api_key
NODE_ENV=production
```

4. **Install PM2 for process management:**
```bash
npm install -g pm2
```

5. **Start the server:**
```bash
pm2 start server.js --name "thumbnail-backend"
pm2 save
pm2 startup
```

### Option 2: Heroku

1. **Install Heroku CLI and login:**
```bash
heroku login
```

2. **Create a new Heroku app:**
```bash
cd backend
heroku create your-app-name
```

3. **Set environment variables:**
```bash
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set OPENAI_API_KEY=your_openai_key
heroku config:set NODE_ENV=production
```

4. **Deploy:**
```bash
git subtree push --prefix backend heroku main
```

### Option 3: Railway/Render

1. Create a new project on Railway or Render
2. Connect your GitHub repository
3. Set the root directory to `backend`
4. Add environment variables in the dashboard
5. Deploy

## Frontend Deployment

### Option 1: Netlify

1. **Build the frontend:**
```bash
cd frontend
npm run build
```

2. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

3. **Deploy:**
```bash
netlify deploy --prod --dir=dist
```

4. **Configure environment variables** in Netlify dashboard:
   - Create a `_redirects` file in the `public` folder:
   ```
   /* /index.html 200
   ```

### Option 2: Vercel

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
cd frontend
vercel --prod
```

3. **Configure environment variables** in Vercel dashboard

### Option 3: Traditional Server with Nginx

1. **Build the frontend:**
```bash
cd frontend
npm run build
```

2. **Copy build files to server:**
```bash
scp -r dist/* user@server:/var/www/thumbnail-generator
```

3. **Configure Nginx:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    root /var/www/thumbnail-generator;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

4. **Restart Nginx:**
```bash
sudo systemctl restart nginx
```

## MongoDB Setup

### Option 1: MongoDB Atlas (Recommended for production)

1. Create an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add database user
4. Whitelist IP addresses (0.0.0.0/0 for all, or specific IPs)
5. Get connection string and add to `.env`

### Option 2: Local MongoDB

1. **Install MongoDB:**
```bash
# Ubuntu
sudo apt-get install mongodb

# macOS
brew install mongodb-community
```

2. **Start MongoDB:**
```bash
# Ubuntu
sudo systemctl start mongodb

# macOS
brew services start mongodb-community
```

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_random_secret
PORT=5000
OPENAI_API_KEY=your_openai_api_key
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com
```

## Security Considerations

1. **Use HTTPS** in production
2. **Set strong JWT secret** (use a random generator)
3. **Whitelist specific IPs** in MongoDB Atlas
4. **Keep dependencies updated:** `npm audit` and `npm update`
5. **Use environment variables** for all sensitive data
6. **Enable CORS only for your frontend domain** in production
7. **Monitor API usage** to prevent abuse
8. **Backup your database** regularly

## SSL/TLS Certificate

### Using Certbot (Let's Encrypt)

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## Monitoring

### PM2 Monitoring
```bash
pm2 monit
pm2 logs thumbnail-backend
```

### Health Checks
- Backend: `https://your-api.com/`
- Frontend: Check if the app loads properly

## Troubleshooting

### Backend Issues
- Check logs: `pm2 logs thumbnail-backend`
- Verify environment variables
- Check MongoDB connection
- Ensure OpenAI API key is valid

### Frontend Issues
- Check browser console for errors
- Verify API URL is correct
- Check CORS settings

### Database Issues
- Verify MongoDB connection string
- Check network access in MongoDB Atlas
- Ensure database user has proper permissions

## Scaling

### Horizontal Scaling
- Use load balancer (Nginx, HAProxy)
- Run multiple backend instances with PM2 cluster mode
- Use Redis for session management

### Vertical Scaling
- Upgrade server resources
- Optimize database queries
- Implement caching

## Maintenance

- Regular backups of MongoDB
- Monitor server resources
- Keep dependencies updated
- Review logs regularly
- Monitor API costs (OpenAI usage)

# McLuck Deployment Guide

This guide covers deploying McLuck to various production environments.

## Prerequisites

- Docker & Docker Compose installed
- Git repository with code
- Domain name (for production)
- SSL certificate (for HTTPS)
- Payment gateway accounts (Stripe, PayPal)

## Local Development

```bash
# Clone repository
git clone <your-repo-url>
cd mcluck

# Install dependencies
pnpm install

# Start dev server
pnpm dev

# App runs on http://localhost:5173
# API runs on http://localhost:8080
```

## Docker Local Deployment

```bash
# Build Docker image
docker build -t mcluck:local .

# Run with docker-compose
docker-compose up -d

# Access app at http://localhost:3000
# Database at localhost:5432
# Redis at localhost:6379
```

## Production Deployment

### 1. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit with production values
nano .env
```

**Critical Environment Variables:**
```
NODE_ENV=production
JWT_SECRET=<strong-random-secret>
DATABASE_URL=postgresql://user:pass@host:5432/mcluck_db
STRIPE_API_KEY=sk_live_...
```

### 2. Database Migration

```bash
# Connect to your PostgreSQL database
psql -h your-host -U your-user -d mcluck_db

# Run schema migrations (if using Prisma)
# For demo mode, schemas are created automatically
```

### 3. Netlify Deployment

1. **Connect Repository**
   - Go to https://app.netlify.com
   - Click "New site from Git"
   - Connect GitHub repository

2. **Configure Build**
   ```
   Build command: pnpm build
   Publish directory: dist/spa
   Functions directory: netlify/functions
   ```

3. **Set Environment Variables**
   - Go to Site Settings → Build & Deploy → Environment
   - Add all variables from `.env`

4. **Deploy**
   ```bash
   # Netlify automatically deploys on push to main
   git push origin main
   ```

### 4. Vercel Deployment

1. **Import Project**
   - Go to https://vercel.com/new
   - Import GitHub repository

2. **Configure**
   - Framework: Vite
   - Build command: `pnpm build`
   - Output directory: `dist/spa`

3. **Environment Variables**
   - Add all variables from `.env`

4. **Deploy**
   - Click "Deploy"
   - App available at `<project>.vercel.app`

### 5. Docker/Self-Hosted Deployment

#### Using Docker Compose (Recommended)

```bash
# 1. Create .env file
cp .env.example .env
# Edit with your production values
nano .env

# 2. Start services
docker-compose up -d

# 3. Check status
docker-compose ps

# 4. View logs
docker-compose logs -f app
```

#### Using Nginx Reverse Proxy

```nginx
# /etc/nginx/sites-available/mcluck

upstream mcluck {
    server localhost:3000;
}

server {
    listen 80;
    server_name mcluck.com www.mcluck.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name mcluck.com www.mcluck.com;

    # SSL certificates (use Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/mcluck.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mcluck.com/privkey.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    gzip_min_length 1000;

    # Proxy to app
    location / {
        proxy_pass http://mcluck;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # API
    location /api/ {
        proxy_pass http://mcluck;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Static files
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### SSL Certificate Setup

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --standalone -d mcluck.com -d www.mcluck.com

# Auto-renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### 6. AWS Deployment

#### Using ECS + RDS + ALB

1. **Create RDS PostgreSQL Instance**
   ```
   Engine: PostgreSQL 14
   DB instance class: db.t3.micro (for small deployments)
   Storage: 20 GB
   Enable backup retention: 7 days
   ```

2. **Create ECS Cluster**
   ```bash
   aws ecs create-cluster --cluster-name mcluck-prod
   ```

3. **Push Docker Image to ECR**
   ```bash
   aws ecr create-repository --repository-name mcluck
   docker tag mcluck:latest <account>.dkr.ecr.us-east-1.amazonaws.com/mcluck:latest
   docker push <account>.dkr.ecr.us-east-1.amazonaws.com/mcluck:latest
   ```

4. **Create ECS Task Definition**
   ```json
   {
     "family": "mcluck",
     "networkMode": "awsvpc",
     "requiresCompatibilities": ["FARGATE"],
     "cpu": "512",
     "memory": "1024",
     "containerDefinitions": [
       {
         "name": "mcluck",
         "image": "<account>.dkr.ecr.us-east-1.amazonaws.com/mcluck:latest",
         "portMappings": [
           {
             "containerPort": 3000,
             "protocol": "tcp"
           }
         ],
         "environment": [
           {
             "name": "NODE_ENV",
             "value": "production"
           }
         ]
       }
     ]
   }
   ```

5. **Create Application Load Balancer**
   - Target group: port 3000
   - Health check: /api/ping
   - Listener: 443 (HTTPS)

6. **Create ECS Service**
   ```bash
   aws ecs create-service \
     --cluster mcluck-prod \
     --service-name mcluck \
     --task-definition mcluck \
     --load-balancers targetGroupArn=arn:aws:...,containerName=mcluck,containerPort=3000 \
     --desired-count 2
   ```

### 7. GCP Cloud Run Deployment

```bash
# Build and push to Artifact Registry
gcloud builds submit --tag gcr.io/PROJECT_ID/mcluck

# Deploy to Cloud Run
gcloud run deploy mcluck \
  --image gcr.io/PROJECT_ID/mcluck \
  --platform managed \
  --region us-central1 \
  --memory 1Gi \
  --cpu 1 \
  --set-env-vars NODE_ENV=production,DATABASE_URL=postgresql://...
```

## Monitoring & Logging

### Application Monitoring

```bash
# View Docker logs
docker-compose logs -f app

# Check application health
curl http://localhost:3000/api/ping

# Monitor database
docker-compose logs -f db
```

### Error Tracking (Sentry)

1. **Setup Sentry**
   ```bash
   npm install @sentry/node
   ```

2. **Configure in server/index.ts**
   ```typescript
   import * as Sentry from "@sentry/node";
   
   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     environment: process.env.NODE_ENV,
   });
   ```

### Logging

```bash
# View logs
docker-compose logs

# Follow logs
docker-compose logs -f

# Specific service
docker-compose logs app
```

## Scaling & Performance

### Database Optimization

```sql
-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_games_user_id ON games(user_id);
```

### Redis Caching

```typescript
// Cache user sessions
await redis.set(`user:${userId}`, JSON.stringify(user), 'EX', 3600);

// Cache leaderboard
await redis.set('leaderboard:daily', JSON.stringify(leaderboard), 'EX', 86400);
```

### Load Balancing

```yaml
# docker-compose.yml
services:
  app:
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
```

## Backup & Recovery

### Database Backup

```bash
# Automated daily backup
docker-compose exec db pg_dump -U mcluck_user mcluck_db > backup-$(date +%Y%m%d).sql

# Restore from backup
psql -U mcluck_user -d mcluck_db < backup-20240115.sql
```

### Volume Backup

```bash
# Backup Docker volumes
docker run --rm -v mcluck_postgres_data:/data -v $(pwd):/backup \
  alpine tar czf /backup/db-backup.tar.gz /data
```

## Troubleshooting

### App won't start
```bash
# Check logs
docker-compose logs app

# Verify environment variables
docker-compose exec app env | grep DATABASE_URL

# Test database connection
docker-compose exec db psql -U mcluck_user -d mcluck_db -c "SELECT 1"
```

### Database connection failed
```bash
# Check database is running
docker-compose ps db

# Verify credentials in .env
grep DATABASE_URL .env

# Test connection
psql postgresql://user:password@localhost:5432/mcluck_db
```

### Payment processing issues
```bash
# Verify Stripe key
docker-compose exec app env | grep STRIPE

# Test API endpoint
curl -H "Authorization: Bearer sk_test_..." https://api.stripe.com/v1/charges
```

## Security Checklist

- [ ] All environment variables set
- [ ] Database credentials changed from defaults
- [ ] JWT secret is strong (32+ characters)
- [ ] HTTPS enabled with valid certificate
- [ ] Firewall rules configured
- [ ] Database backups enabled
- [ ] Monitoring and alerting setup
- [ ] Error tracking configured
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] CORS properly configured
- [ ] Security headers set
- [ ] API authentication implemented
- [ ] Webhook signatures verified
- [ ] Audit logging enabled

## Support

For deployment issues:
1. Check logs: `docker-compose logs`
2. Verify environment: `grep -E "^[A-Z_]+" .env`
3. Test connectivity: `curl /api/ping`
4. Contact: support@mcluck.com

---

Last updated: January 2024

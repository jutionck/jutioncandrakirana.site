# JCK Portfolio - Microservices Backend

Arsitektur microservices lengkap untuk portfolio Jution Candra Kirana dengan deployment gratis dan self-hosted.

## 🏗️ Arsitektur Sistem

```
Internet → Nginx (API Gateway + SSL)
           ↓
    Docker Network
    ├─ Blog Service (Golang) → PostgreSQL
    ├─ Contact Service (Node.js) → MongoDB
    ├─ Analytics Service (Golang) → PostgreSQL
    ├─ Auth Service (Spring Boot) → PostgreSQL
    ├─ Media Service (Node.js) → MongoDB
    ├─ Notification Service (Node.js) → RabbitMQ
    ├─ Redis (Cache)
    ├─ RabbitMQ (Message Queue)
    └─ Monitoring (Grafana + Prometheus)
```

## 🚀 Tech Stack

### Services
- **Blog Service**: Golang (Gin) - Manage blog posts dan artikel
- **Contact Service**: Node.js (Express) - Handle contact form
- **Analytics Service**: Golang - Track page views dan events
- **Auth Service**: Java Spring Boot - Authentication & authorization
- **Media Service**: Node.js - Upload dan manage media files
- **Notification Service**: Node.js - Email notifications via RabbitMQ

### Infrastructure (Semua Gratis & Self-Hosted)
- **API Gateway**: Nginx (reverse proxy, load balancer, SSL)
- **Databases**: PostgreSQL 16, MongoDB 7, Redis 7
- **Message Queue**: RabbitMQ 3 with Management UI
- **Monitoring**: Prometheus + Grafana
- **Container**: Docker & Docker Compose
- **SSL**: Let's Encrypt (free certificates)

## 📋 Prerequisites

- Server dengan minimal 4GB RAM, 2 CPU cores
- Docker dan Docker Compose installed
- Domain pointing ke server IP (untuk SSL)
- Port 80, 443 terbuka untuk HTTPS traffic

## 🛠️ Setup Instructions

### 1. Clone Repository

```bash
cd /home/your-username
git clone <your-repo-url>
cd jutioncandrakirana.site/backend
```

### 2. Environment Configuration

```bash
# Copy example environment file
cp .env.example .env

# Edit dengan credentials yang aman
nano .env
```

**Penting**: Ganti semua password dengan strong passwords!

```env
# PostgreSQL
POSTGRES_USER=jck_admin
POSTGRES_PASSWORD=YourSecurePasswordHere123!

# MongoDB
MONGO_USER=mongo_admin
MONGO_PASSWORD=AnotherSecurePassword456!

# Redis
REDIS_PASSWORD=RedisSecurePassword789!

# RabbitMQ
RABBITMQ_USER=rabbitmq_admin
RABBITMQ_PASSWORD=RabbitSecurePassword012!

# JWT Secret (min 64 characters)
JWT_SECRET=your_very_long_and_secure_jwt_secret_key_minimum_64_characters_recommended

# SMTP (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=jutionck@gmail.com
SMTP_PASSWORD=your-gmail-app-password

# Grafana
GRAFANA_USER=admin
GRAFANA_PASSWORD=GrafanaSecure345!

# Domain
DOMAIN=jutioncandrakirana.site
API_DOMAIN=api.jutioncandrakirana.site
```

### 3. Setup SSL Certificates (Let's Encrypt)

```bash
# Install certbot
sudo apt update
sudo apt install certbot

# Generate SSL certificate
sudo certbot certonly --standalone -d api.jutioncandrakirana.site

# Copy certificates ke nginx directory
sudo mkdir -p nginx/ssl
sudo cp /etc/letsencrypt/live/api.jutioncandrakirana.site/fullchain.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/api.jutioncandrakirana.site/privkey.pem nginx/ssl/

# Set permissions
sudo chmod -R 755 nginx/ssl
```

### 4. Build Service Images

Sebelum menjalankan, kamu perlu membuat Dockerfile untuk setiap service. Contoh struktur:

```
backend/
├── services/
│   ├── blog/
│   │   ├── Dockerfile
│   │   ├── main.go
│   │   └── ...
│   ├── contact/
│   │   ├── Dockerfile
│   │   ├── index.js
│   │   └── package.json
│   ├── analytics/
│   │   └── ...
│   ├── auth/
│   │   ├── Dockerfile
│   │   ├── pom.xml
│   │   └── src/
│   ├── media/
│   │   └── ...
│   └── notification/
│       └── ...
```

### 5. Start All Services

```bash
# Make init script executable
chmod +x scripts/init-postgres.sh

# Start all containers
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

### 6. Verify Services

```bash
# Check health endpoints
curl https://api.jutioncandrakirana.site/health
curl https://api.jutioncandrakirana.site/api/v1/blog/health
curl https://api.jutioncandrakirana.site/api/v1/auth/actuator/health

# Access monitoring
# Grafana: http://your-server-ip:3001
# Prometheus: http://your-server-ip:9090
# RabbitMQ Management: http://your-server-ip:15672
```

## 🗂️ Service Endpoints

### Blog Service (Port 8001)
```
GET    /api/v1/blog/posts          - List all published posts
GET    /api/v1/blog/posts/:slug    - Get post by slug
POST   /api/v1/blog/posts          - Create new post (auth)
PUT    /api/v1/blog/posts/:id      - Update post (auth)
DELETE /api/v1/blog/posts/:id      - Delete post (auth)
GET    /api/v1/blog/health          - Health check
```

### Contact Service (Port 8002)
```
POST   /api/v1/contact/submit       - Submit contact form
GET    /api/v1/contact/messages     - Get all messages (auth)
GET    /api/v1/contact/messages/:id - Get message by ID (auth)
DELETE /api/v1/contact/messages/:id - Delete message (auth)
GET    /api/v1/contact/health       - Health check
```

### Analytics Service (Port 8003)
```
POST   /api/v1/analytics/pageview   - Track page view
POST   /api/v1/analytics/event      - Track custom event
GET    /api/v1/analytics/stats      - Get analytics stats
GET    /api/v1/analytics/popular    - Get popular pages
GET    /api/v1/analytics/health     - Health check
```

### Auth Service (Port 8004)
```
POST   /api/v1/auth/register        - Register new user
POST   /api/v1/auth/login           - Login user
POST   /api/v1/auth/refresh         - Refresh access token
POST   /api/v1/auth/logout          - Logout user
GET    /api/v1/auth/me              - Get current user (auth)
GET    /actuator/health             - Health check
```

### Media Service (Port 8005)
```
POST   /api/v1/media/upload         - Upload file (auth)
GET    /api/v1/media/files          - List all files (auth)
GET    /api/v1/media/files/:id      - Get file by ID
DELETE /api/v1/media/files/:id      - Delete file (auth)
GET    /api/v1/media/health         - Health check
```

### Notification Service (Port 8006)
```
POST   /api/v1/notifications/email  - Send email notification
GET    /api/v1/notifications/status/:id - Get notification status
GET    /api/v1/notifications/health - Health check
```

## 📊 Monitoring & Logging

### Grafana Dashboard
- URL: `http://your-server-ip:3001`
- Username: Dari `.env` (default: admin)
- Password: Dari `.env`

**Metrics yang di-monitor:**
- Request rate per service
- Response time (p50, p95, p99)
- Error rate
- CPU & Memory usage
- Database connections
- Queue length (RabbitMQ)

### Prometheus
- URL: `http://your-server-ip:9090`
- Query metrics dari semua services

### RabbitMQ Management
- URL: `http://your-server-ip:15672`
- Username/Password: Dari `.env`

### Application Logs
```bash
# Semua services
docker-compose logs -f

# Specific service
docker-compose logs -f blog-service
docker-compose logs -f auth-service

# Last 100 lines
docker-compose logs --tail=100 -f analytics-service
```

## 🔒 Security Features

1. **HTTPS/SSL**: Let's Encrypt certificates
2. **Rate Limiting**: Nginx rate limiting per endpoint
3. **CORS**: Restricted to portfolio domain only
4. **JWT Authentication**: Secure token-based auth
5. **Security Headers**: X-Frame-Options, CSP, etc.
6. **Password Hashing**: Bcrypt for user passwords
7. **SQL Injection Protection**: Parameterized queries
8. **XSS Protection**: Input sanitization

## 🔄 Database Backups

### PostgreSQL Backup
```bash
# Backup all databases
docker-compose exec postgres pg_dumpall -U jck_admin > backup_$(date +%Y%m%d).sql

# Restore
docker-compose exec -T postgres psql -U jck_admin < backup_20250115.sql
```

### MongoDB Backup
```bash
# Backup
docker-compose exec mongo mongodump --out=/data/backup

# Restore
docker-compose exec mongo mongorestore /data/backup
```

## 📈 Scaling Strategy

### Horizontal Scaling (Add More Instances)
```yaml
# In docker-compose.yml
blog-service:
  deploy:
    replicas: 3  # Run 3 instances
```

### Vertical Scaling (More Resources)
```yaml
blog-service:
  deploy:
    resources:
      limits:
        cpus: '2'
        memory: 2G
      reservations:
        cpus: '1'
        memory: 1G
```

## 🛠️ Maintenance Commands

### Update Services
```bash
# Pull latest images
docker-compose pull

# Restart specific service
docker-compose restart blog-service

# Rebuild and restart
docker-compose up -d --build blog-service
```

### Clean Up
```bash
# Remove stopped containers
docker-compose down

# Remove volumes (WARNING: deletes data!)
docker-compose down -v

# Remove everything including images
docker-compose down --rmi all -v
```

### Check Resource Usage
```bash
# Container stats
docker stats

# Disk usage
docker system df

# Clean unused data
docker system prune -a
```

## 🐛 Troubleshooting

### Service won't start
```bash
# Check logs
docker-compose logs service-name

# Check if port is already in use
sudo netstat -tulpn | grep :8001

# Restart service
docker-compose restart service-name
```

### Database connection issues
```bash
# Check if database is running
docker-compose ps postgres

# Test connection
docker-compose exec blog-service ping postgres

# Check database logs
docker-compose logs postgres
```

### SSL Certificate Issues
```bash
# Renew certificate
sudo certbot renew

# Copy updated certificate
sudo cp /etc/letsencrypt/live/api.jutioncandrakirana.site/*.pem nginx/ssl/

# Reload nginx
docker-compose exec nginx nginx -s reload
```

## 💰 Cost Analysis

### Monthly Cost: **GRATIS / FREE** ✅

**Infrastructure:**
- Server: Gunakan server existing anda
- Domain: Already owned (api.jutioncandrakirana.site)
- SSL: Let's Encrypt (Free)
- All software: Open source & free

**Estimasi Resource Usage:**
- CPU: 1-2 cores (normal load)
- RAM: 2-4GB (6 services + databases)
- Storage: 10-20GB (databases + logs)
- Bandwidth: Depends on traffic

## 🎯 Next Steps

1. **Implement Service Code**
   - Blog Service (Golang + Gin)
   - Contact Service (Node.js + Express)
   - Analytics Service (Golang)
   - Auth Service (Spring Boot)
   - Media Service (Node.js)
   - Notification Service (Node.js)

2. **Setup CI/CD**
   - GitHub Actions for auto-deployment
   - Automated testing
   - Docker image builds

3. **Add Features**
   - Blog comments system
   - Newsletter subscription
   - Portfolio CMS
   - Real-time analytics dashboard

4. **Optimize Performance**
   - Redis caching strategy
   - Database query optimization
   - Image optimization (WebP, lazy loading)
   - CDN for static assets

## 📚 Documentation Links

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [RabbitMQ Documentation](https://www.rabbitmq.com/documentation.html)
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)

## 🤝 Support

Untuk pertanyaan atau issues:
- Email: jutionck@gmail.com
- GitHub: [@jutionck](https://github.com/jutionck)
- LinkedIn: [Jution Candra Kirana](https://linkedin.com/in/jutionck)

---

**Built with ❤️ by Jution Candra Kirana**

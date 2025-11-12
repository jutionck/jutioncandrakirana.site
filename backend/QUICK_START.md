# Quick Start Guide - 15 Menit Setup

Panduan cepat untuk menjalankan semua microservices dalam 15 menit.

## 🎯 Prerequisites Checklist

- [ ] Server Linux dengan Docker installed
- [ ] Docker Compose installed
- [ ] Domain sudah pointing ke server IP
- [ ] Port 80, 443, 3001, 9090, 15672 terbuka
- [ ] Minimal 4GB RAM available

## 🚀 Setup Langkah demi Langkah

### Step 1: Clone & Navigate (1 menit)

```bash
cd /home/$(whoami)
git clone <your-repo-url> portfolio-backend
cd portfolio-backend/backend
```

### Step 2: Environment Setup (3 menit)

```bash
# Copy environment file
cp .env.example .env

# Edit dengan credentials anda
nano .env
```

**Generate secure passwords:**
```bash
# Generate random password (32 characters)
openssl rand -base64 32

# Generate JWT secret (64 characters)
openssl rand -base64 64
```

**Minimal configuration yang harus diisi:**
- `POSTGRES_PASSWORD`
- `MONGO_PASSWORD`
- `REDIS_PASSWORD`
- `RABBITMQ_PASSWORD`
- `JWT_SECRET`
- `SMTP_USER` dan `SMTP_PASSWORD` (Gmail)

### Step 3: SSL Certificate (5 menit)

**Option A: Let's Encrypt (Production)**
```bash
# Install certbot
sudo apt update && sudo apt install -y certbot

# Stop any service on port 80
sudo systemctl stop nginx 2>/dev/null || true

# Generate certificate
sudo certbot certonly --standalone \
  -d api.jutioncandrakirana.site \
  --non-interactive \
  --agree-tos \
  -m jutionck@gmail.com

# Copy to project
sudo mkdir -p nginx/ssl
sudo cp /etc/letsencrypt/live/api.jutioncandrakirana.site/fullchain.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/api.jutioncandrakirana.site/privkey.pem nginx/ssl/
sudo chmod -R 755 nginx/ssl
```

**Option B: Self-Signed (Development/Testing)**
```bash
mkdir -p nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/privkey.pem \
  -out nginx/ssl/fullchain.pem \
  -subj "/C=ID/ST=Jakarta/L=Jakarta/O=JCK/CN=api.jutioncandrakirana.site"
```

### Step 4: DNS Configuration (2 menit)

Tambahkan A record di domain provider:
```
Type: A
Name: api
Value: <your-server-ip>
TTL: 300
```

Verify DNS:
```bash
nslookup api.jutioncandrakirana.site
# Should return your server IP
```

### Step 5: Start Services (3 menit)

```bash
# Make init script executable
chmod +x scripts/init-postgres.sh

# Pull images (optional, untuk download dulu)
docker-compose pull

# Start all services
docker-compose up -d

# Wait for services to start (30 seconds)
echo "Waiting for services to start..."
sleep 30

# Check status
docker-compose ps
```

### Step 6: Verify Everything Works (1 menit)

```bash
# Test API Gateway health
curl https://api.jutioncandrakirana.site/health

# Test each service
curl https://api.jutioncandrakirana.site/api/v1/blog/health
curl https://api.jutioncandrakirana.site/api/v1/contact/health
curl https://api.jutioncandrakirana.site/api/v1/analytics/health
curl https://api.jutioncandrakirana.site/api/v1/auth/actuator/health
curl https://api.jutioncandrakirana.site/api/v1/media/health
curl https://api.jutioncandrakirana.site/api/v1/notifications/health

# Check monitoring UIs
echo "Access these in your browser:"
echo "- Grafana: http://$(hostname -I | awk '{print $1}'):3001"
echo "- Prometheus: http://$(hostname -I | awk '{print $1}'):9090"
echo "- RabbitMQ: http://$(hostname -I | awk '{print $1}'):15672"
```

## ✅ Success Indicators

Jika semua berjalan lancar, anda akan melihat:

```bash
$ docker-compose ps

NAME                STATUS              PORTS
api-gateway         Up 2 minutes        0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp
blog-service        Up 2 minutes (healthy)
contact-service     Up 2 minutes (healthy)
analytics-service   Up 2 minutes (healthy)
auth-service        Up 2 minutes (healthy)
media-service       Up 2 minutes (healthy)
notification-service Up 2 minutes (healthy)
postgres-db         Up 2 minutes (healthy)
mongodb             Up 2 minutes (healthy)
redis-cache         Up 2 minutes (healthy)
rabbitmq            Up 2 minutes (healthy)
prometheus          Up 2 minutes
grafana             Up 2 minutes
```

## 🎨 Access Your Services

### APIs
- **Blog API**: https://api.jutioncandrakirana.site/api/v1/blog
- **Contact API**: https://api.jutioncandrakirana.site/api/v1/contact
- **Analytics API**: https://api.jutioncandrakirana.site/api/v1/analytics
- **Auth API**: https://api.jutioncandrakirana.site/api/v1/auth
- **Media API**: https://api.jutioncandrakirana.site/api/v1/media
- **Notifications API**: https://api.jutioncandrakirana.site/api/v1/notifications

### Monitoring Dashboards
- **Grafana**: http://your-server-ip:3001
  - Username: `admin` (dari .env)
  - Password: (dari .env)

- **Prometheus**: http://your-server-ip:9090

- **RabbitMQ Management**: http://your-server-ip:15672
  - Username: `rabbitmq_admin` (dari .env)
  - Password: (dari .env)

## 🔧 Common Issues & Solutions

### Issue: Container won't start
```bash
# Check logs
docker-compose logs service-name

# Common fix: restart
docker-compose restart service-name
```

### Issue: SSL certificate error
```bash
# Check if certificate exists
ls -la nginx/ssl/

# Regenerate if needed (see Step 3)
```

### Issue: Database connection error
```bash
# Check if database is running
docker-compose ps postgres

# Check database logs
docker-compose logs postgres

# Restart database
docker-compose restart postgres
```

### Issue: Port already in use
```bash
# Check what's using the port
sudo netstat -tulpn | grep :80

# Kill the process or change port in docker-compose.yml
```

### Issue: Out of memory
```bash
# Check memory usage
docker stats

# Increase swap or add more RAM
# Or reduce number of services
```

## 📊 View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f blog-service

# Last 50 lines
docker-compose logs --tail=50 -f auth-service

# Search in logs
docker-compose logs | grep ERROR
```

## 🔄 Update & Restart

```bash
# Pull latest code
git pull

# Rebuild specific service
docker-compose up -d --build blog-service

# Restart all services
docker-compose restart

# Full rebuild
docker-compose down
docker-compose up -d --build
```

## 🛑 Stop Everything

```bash
# Stop services (keep data)
docker-compose down

# Stop and remove all data (WARNING!)
docker-compose down -v

# Stop, remove data, and images
docker-compose down -v --rmi all
```

## 📝 Next Steps

1. **Implement Service Code**
   - Each service needs actual implementation code
   - Follow the structure in `services/*/` directories
   - Use the Dockerfiles provided

2. **Test Each Endpoint**
   - Use Postman or curl
   - Test authentication flow
   - Verify database operations

3. **Setup Grafana Dashboards**
   - Import pre-built dashboards
   - Configure alerts
   - Monitor resource usage

4. **Connect Frontend**
   - Update Next.js API endpoints
   - Point to `https://api.jutioncandrakirana.site`
   - Test end-to-end flow

5. **Setup Auto-renewal for SSL**
```bash
# Add cron job for certificate renewal
sudo crontab -e

# Add this line (renew every month)
0 0 1 * * certbot renew --quiet && cp /etc/letsencrypt/live/api.jutioncandrakirana.site/*.pem /home/$(whoami)/portfolio-backend/backend/nginx/ssl/ && docker-compose -f /home/$(whoami)/portfolio-backend/backend/docker-compose.yml exec nginx nginx -s reload
```

## 💡 Pro Tips

1. **Resource Monitoring**: Always keep Grafana open to monitor resource usage
2. **Backup Strategy**: Setup daily database backups (see main README)
3. **Logging**: Use centralized logging (ELK stack optional)
4. **Security**: Change default passwords immediately
5. **Updates**: Keep Docker images updated monthly

## 🎯 Performance Optimization

```bash
# Enable Docker BuildKit for faster builds
export DOCKER_BUILDKIT=1

# Prune unused resources weekly
docker system prune -a --volumes -f

# Monitor disk usage
df -h
du -sh /var/lib/docker
```

## 📞 Need Help?

Jika mengalami masalah:
1. Check logs: `docker-compose logs -f`
2. Verify environment: `docker-compose config`
3. Test connectivity: `docker-compose exec service-name ping other-service`
4. Restart services: `docker-compose restart`

---

**Total Setup Time: ~15 minutes**
**Cost: FREE (using your own server)**
**Maintenance: ~1 hour/month**

Happy coding! 🚀

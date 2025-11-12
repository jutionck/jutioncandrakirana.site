#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create databases for each service
    CREATE DATABASE blog_db;
    CREATE DATABASE analytics_db;
    CREATE DATABASE auth_db;

    -- Grant privileges
    GRANT ALL PRIVILEGES ON DATABASE blog_db TO $POSTGRES_USER;
    GRANT ALL PRIVILEGES ON DATABASE analytics_db TO $POSTGRES_USER;
    GRANT ALL PRIVILEGES ON DATABASE auth_db TO $POSTGRES_USER;

    -- Connect to blog_db and create initial schema
    \c blog_db
    CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(500) NOT NULL,
        excerpt TEXT,
        content TEXT NOT NULL,
        thumbnail VARCHAR(500),
        tags TEXT[],
        read_time VARCHAR(50),
        published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        view_count INTEGER DEFAULT 0,
        is_published BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX idx_posts_slug ON posts(slug);
    CREATE INDEX idx_posts_published ON posts(is_published);
    CREATE INDEX idx_posts_published_at ON posts(published_at DESC);

    -- Connect to analytics_db and create initial schema
    \c analytics_db
    CREATE TABLE IF NOT EXISTS page_views (
        id SERIAL PRIMARY KEY,
        page_path VARCHAR(500) NOT NULL,
        user_agent TEXT,
        ip_address VARCHAR(45),
        referrer VARCHAR(500),
        country VARCHAR(100),
        city VARCHAR(100),
        device_type VARCHAR(50),
        browser VARCHAR(100),
        os VARCHAR(100),
        session_id VARCHAR(255),
        viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        duration_seconds INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        event_type VARCHAR(100) NOT NULL,
        event_name VARCHAR(255) NOT NULL,
        event_data JSONB,
        page_path VARCHAR(500),
        user_id VARCHAR(255),
        session_id VARCHAR(255),
        ip_address VARCHAR(45),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX idx_page_views_path ON page_views(page_path);
    CREATE INDEX idx_page_views_viewed_at ON page_views(viewed_at DESC);
    CREATE INDEX idx_events_type ON events(event_type);
    CREATE INDEX idx_events_created_at ON events(created_at DESC);

    -- Connect to auth_db and create initial schema
    \c auth_db
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        role VARCHAR(50) DEFAULT 'user',
        is_active BOOLEAN DEFAULT true,
        is_verified BOOLEAN DEFAULT false,
        last_login_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS refresh_tokens (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        token VARCHAR(500) UNIQUE NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX idx_users_email ON users(email);
    CREATE INDEX idx_users_username ON users(username);
    CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);
    CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);

    -- Insert default admin user (password: Admin123!)
    INSERT INTO users (username, email, password_hash, first_name, last_name, role, is_verified)
    VALUES (
        'admin',
        'jutionck@gmail.com',
        '\$2a\$10\$rJ8aBxZEZYQZ7qJ8aBxZEZYQZ7qJ8aBxZEZYQZ7qJ8aBxZEZYQZ7q',
        'Jution',
        'Candra Kirana',
        'admin',
        true
    ) ON CONFLICT (email) DO NOTHING;
EOSQL

echo "PostgreSQL databases initialized successfully!"

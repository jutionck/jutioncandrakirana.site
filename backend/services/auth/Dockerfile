# Auth Service - Spring Boot
FROM maven:3.9-eclipse-temurin-21-alpine AS builder

WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Final stage
FROM eclipse-temurin:21-jre-alpine

RUN apk --no-cache add curl

WORKDIR /app

# Copy jar from builder
COPY --from=builder /app/target/*.jar app.jar

# Create non-root user
RUN addgroup -g 1001 spring && \
    adduser -S spring -u 1001 -G spring

USER spring

EXPOSE 8004

ENTRYPOINT ["java", "-jar", "app.jar"]

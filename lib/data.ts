export const posts = [
  {
    slug: 'building-scalable-microservices',
    title: 'Building Scalable Microservices with Go',
    excerpt:
      'Learn best practices for architecting microservices using Go and Kubernetes',
    date: '2025-01-15',
    tags: ['Go', 'Architecture', 'Microservices'],
    thumbnail:
      'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=80',
    readTime: '8 min read',
    content: `
# Building Scalable Microservices with Go

Microservices architecture has become the go-to pattern for building scalable applications. In this post, we'll explore how to build microservices using Go.

## Why Go for Microservices?

Go is an excellent choice for microservices because of:

- **Performance**: Go compiles to a single binary with minimal runtime overhead
- **Concurrency**: Goroutines make it easy to handle thousands of concurrent requests
- **Simplicity**: Clean syntax and standard library reduce external dependencies

## Core Principles

When building microservices with Go, follow these key principles:

1. **Single Responsibility**: Each service should have a clear, single purpose
2. **API-First Design**: Define clear APIs between services
3. **Independent Deployment**: Each service should be deployable independently
4. **Resilience**: Handle failures gracefully with timeouts and retries

## Getting Started

Here's a basic example of a simple microservice:

\`\`\`go
package main

import (
    "net/http"
    "log"
)

func main() {
    http.HandleFunc("/api/status", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(http.StatusOK)
        w.Write([]byte(\`{"status": "healthy"}\`))
    })
    
    log.Fatal(http.ListenAndServe(":8080", nil))
}
\`\`\`

## Deployment with Kubernetes

Deploy your Go microservices using Kubernetes for automatic scaling and management.

## Conclusion

Go provides an excellent foundation for building modern microservices architectures. Its performance, simplicity, and built-in concurrency features make it ideal for this use case.
    `,
  },
  {
    slug: 'react-performance-optimization',
    title: 'React Performance Optimization Techniques',
    excerpt:
      'Deep dive into memoization, code splitting, and bundle optimization',
    date: '2025-01-10',
    tags: ['React', 'Performance', 'JavaScript'],
    thumbnail:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    readTime: '6 min read',
    content: `
# React Performance Optimization Techniques

Performance is critical for modern web applications. Let's explore key techniques to optimize your React applications.

## Memoization

Use React.memo to prevent unnecessary re-renders:

\`\`\`jsx
const MyComponent = React.memo(({ data }) => {
    return <div>{data.name}</div>;
});
\`\`\`

## Code Splitting

Use dynamic imports to reduce bundle size:

\`\`\`jsx
const HeavyComponent = lazy(() => import('./HeavyComponent'));
\`\`\`

## Virtualization

For long lists, use virtualization libraries to render only visible items.

## Measuring Performance

Use React DevTools Profiler to identify performance bottlenecks.

## Best Practices

- Profile before optimizing
- Avoid inline objects in render
- Use useMemo and useCallback wisely
- Minimize bundle size

## Conclusion

Performance optimization is an ongoing process. Always measure, identify bottlenecks, and apply targeted optimizations.
    `,
  },
  {
    slug: 'kubernetes-deployment-guide',
    title: 'Kubernetes Deployment: A Practical Guide',
    excerpt:
      'Step-by-step guide to deploying containerized applications on Kubernetes',
    date: '2025-01-05',
    tags: ['Kubernetes', 'DevOps', 'Docker'],
    thumbnail:
      'https://images.unsplash.com/photo-1667372393086-9d4001d51cf1?w=800&auto=format&fit=crop&q=80',
    readTime: '10 min read',
    content: `
# Kubernetes Deployment: A Practical Guide

Kubernetes is a powerful platform for container orchestration. Learn how to deploy applications effectively.

## Prerequisites

- Docker installed
- Basic understanding of containers
- kubectl installed

## Creating a Deployment

Define your deployment in a YAML file:

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: my-app:latest
        ports:
        - containerPort: 8080
\`\`\`

## Deploying to Kubernetes

Apply your deployment:

\`\`\`bash
kubectl apply -f deployment.yaml
\`\`\`

## Scaling

Scale your deployment:

\`\`\`bash
kubectl scale deployment my-app --replicas=5
\`\`\`

## Monitoring

Use kubectl commands to monitor your deployment:

\`\`\`bash
kubectl get pods
kubectl logs deployment/my-app
\`\`\`

## Conclusion

Kubernetes provides powerful capabilities for deploying and managing containerized applications. Start simple and gradually adopt more advanced features.
    `,
  },
];

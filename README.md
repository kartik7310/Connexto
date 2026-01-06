# Connectly Backend

<div align="center">

**Enterprise-grade Real-time Communication Backend**

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-v5.1-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-v4.8-010101?style=flat&logo=socket.io&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker&logoColor=white)

</div>

---

## 📋 Overview

Connectly Backend is a scalable, production-ready RESTful API and WebSocket server powering the Connectly real-time communication platform. Built with modern Node.js technologies, it provides secure authentication, real-time messaging, social networking features, content management, and payment processing.

### Key Capabilities

✅ **Secure Authentication** - JWT-based sessions with Google OAuth integration  
✅ **Real-time Messaging** - WebSocket-powered instant chat with Socket.io  
✅ **Social Networking** - Connection requests and user discovery  
✅ **Content Management** - Blog creation and management system  
✅ **Payment Integration** - Razorpay subscription and payment processing  
✅ **Media Optimization** - ImageKit integration for efficient media delivery  
✅ **Production Ready** - Comprehensive logging, error handling, and validation  

---

## 🏗️ System Architecture

### High-Level Design (HLD)

The backend follows a layered architecture with clear separation of concerns, enabling scalability and maintainability.

```mermaid
graph TB
    Client[Client Applications]
    
    subgraph "API Gateway Layer"
        LB[Load Balancer/Nginx]
        CORS[CORS Middleware]
    end
    
    subgraph "Application Layer"
        Router[Express Router]
        Auth[Auth Middleware]
        ErrorHandler[Error Handler]
    end
    
    subgraph "Business Logic Layer"
        Controllers[Controllers]
        Services[Services]
        Validators[Validators]
    end
    
    subgraph "Data Access Layer"
        Models[Mongoose Models]
    end
    
    subgraph "External Services"
        DB[(MongoDB Atlas)]
        Socket[Socket.io Server]
        OAuth[Google OAuth]
        Payment[Razorpay]
        Media[ImageKit]
    end
    
    Client -->|HTTP/HTTPS| LB
    Client -->|WebSocket| Socket
    LB --> CORS
    CORS --> Router
    Router --> Auth
    Auth --> Controllers
    Controllers --> Validators
    Validators --> Services
    Services --> Models
    Models --> DB
    Services --> OAuth
    Services --> Payment
    Services --> Media
    Router --> ErrorHandler
```

### Low-Level Design (LLD)

The backend is organized into **7 core modules**, each following the MVC pattern:

#### 1. Authentication Module (`/api/v1/auth`)

**Purpose**: Manages user authentication and authorization.

**Components**:
- **Routes**: `auth.routes.js` - Defines authentication endpoints
- **Controller**: `auth.js` - Handles HTTP requests/responses
- **Service**: `auth.js` - Business logic for signup, login, OAuth
- **Model**: `user.js` - User schema and validation

**Flow**:
```
POST /signup → Validator → Controller → Service → Hash Password → Save to DB → Generate JWT → Response
POST /login → Controller → Service → Verify Password → Generate JWT → Set Cookie → Response
POST /google-login → Controller → Verify Google Token → Find/Create User → Generate JWT → Response
POST /logout → Auth Middleware → Controller → Clear Cookie → Response
```

**Key Features**:
- Password hashing with bcrypt
- JWT token generation and verification
- Google OAuth 2.0 integration
- Session management via HTTP-only cookies

---

#### 2. User Management Module (`/api/v1/user`)

**Purpose**: Handles user profile operations and user discovery.

**Components**:
- **Routes**: `user.route.js`
- **Controller**: `user.js`
- **Service**: `user.js`
- **Model**: `user.js`

**Operations**:
- Fetch user profile
- Update user information
- Search and discover users
- Manage user preferences

---

#### 3. Profile Module (`/api/v1/profile`)

**Purpose**: Manages user profile customization and visibility.

**Components**:
- **Routes**: `profile.routes.js`
- **Controller**: `profile.js`
- **Service**: `profile.js`

**Features**:
- Profile photo management (ImageKit integration)
- Bio and skills management
- Profile visibility settings

---

#### 4. Connection Module (`/api/v1/connections`)

**Purpose**: Social networking features for user connections.

**Components**:
- **Routes**: `connection.routes.js`
- **Controller**: `connectionRequest.js`
- **Service**: `connection.js`
- **Model**: `connectionRequest.js`

**Features**:
- Send connection requests
- Accept/Reject requests
- View pending requests
- Manage connections list

**States**: `pending` → `accepted` | `rejected` | `ignored`

---

#### 5. Chat Module (`/api/v1/chat`)

**Purpose**: Real-time messaging system.

**Components**:
- **Routes**: `chat.routes.js`
- **Controller**: `chat.js`
- **Service**: `chat.js`
- **Model**: `chat.js`
- **WebSocket**: `socket.js`

**Communication Flow**:
```
Client → Socket.io → Authenticate → Join Room → Send Message → Persist to DB → Broadcast to Room
```

**Events**:
- `connection` - User connects to WebSocket
- `join_room` - Join chat room
- `send_message` - Send message to room
- `receive_message` - Receive broadcast message
- `disconnect` - User disconnects

---

#### 6. Blog Module (`/api/v1/blogs`)

**Purpose**: Content management system for user blogs.

**Components**:
- **Routes**: `blog.route.js`
- **Controller**: `blog.js`
- **Service**: `blog.js`
- **Model**: `blog.js`
- **Validator**: `blog.js`

**Features**:
- Create, Read, Update, Delete (CRUD) operations
- Rich text content support (Jodit editor integration)
- Blog categorization
- User-specific blogs

---

#### 7. Subscription/Payment Module (`/api/v1/payment`)

**Purpose**: Manages premium subscriptions and payments.

**Components**:
- **Routes**: `subscription.routes.js`
- **Controller**: `subscription.js`
- **Service**: `subscription.js`
- **Model**: `subscription.js`

**Integration**: Razorpay API

**Features**:
- Create payment orders
- Verify payment signatures
- Activate premium membership
- Manage subscription tiers

---

## 📂 Project Structure

```
Backend/
├── src/
│   ├── config/              # Configuration files
│   │   ├── db.js            # MongoDB connection
│   │   ├── googleOauth.js   # Google OAuth client
│   │   ├── imagekit.js      # ImageKit configuration
│   │   ├── logger.js        # Winston logger setup
│   │   └── razorpay.js      # Razorpay configuration
│   │
│   ├── controllers/         # Request handlers
│   │   ├── auth.js          # Authentication controller
│   │   ├── blog.js          # Blog controller
│   │   ├── chat.js          # Chat controller
│   │   ├── connectionRequest.js
│   │   ├── profile.js
│   │   ├── subscription.js
│   │   └── user.js
│   │
│   ├── models/              # Mongoose schemas
│   │   ├── blog.js
│   │   ├── chat.js
│   │   ├── connectionRequest.js
│   │   ├── otp.js
│   │   ├── subscription.js
│   │   └── user.js
│   │
│   ├── routes/              # API routes
│   │   ├── auth.routes.js
│   │   ├── blog.route.js
│   │   ├── chat.routes.js
│   │   ├── connection.routes.js
│   │   ├── profile.routes.js
│   │   ├── subscription.routes.js
│   │   └── user.route.js
│   │
│   ├── services/            # Business logic
│   │   ├── auth.js
│   │   ├── blog.js
│   │   ├── chat.js
│   │   ├── connection.js
│   │   ├── profile.js
│   │   ├── subscription.js
│   │   └── user.js
│   │
│   ├── middleware/          # Express middleware
│   │   ├── auth.middleware.js    # JWT verification
│   │   └── errorMiddleware.js    # Global error handler
│   │
│   ├── validators/          # Request validation (Zod)
│   │   ├── blog.js
│   │   ├── otp.js
│   │   └── user.js
│   │
│   ├── utils/               # Utility functions
│   │   ├── AppError.js      # Custom error class
│   │   ├── generateOtp.js
│   │   ├── generateToken.js
│   │   ├── logger.js
│   │   ├── planType.js
│   │   └── roomSecret.js
│   │
│   ├── webSocket/           # Socket.io configuration
│   │   └── socket.js
│   │
│   └── app.js               # Express application entry point
│
├── logs/                    # Application logs
├── .env                     # Environment variables
├── .dockerignore
├── Dockerfile
├── docker-compose.yml
└── package.json
```

---

## 🔌 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/v1/auth/signup` | Register new user | ❌ |
| `POST` | `/api/v1/auth/login` | User login | ❌ |
| `POST` | `/api/v1/auth/logout` | User logout | ✅ |
| `POST` | `/api/v1/auth/google-login` | Google OAuth login | ❌ |

**Example: User Signup**
```bash
POST /api/v1/auth/signup
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "age": 25,
  "gender": "male"
}
```

**Response**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": "...", "email": "john@example.com" }
}
```

---

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/v1/user/me` | Get current user profile | ✅ |
| `PUT` | `/api/v1/user/update` | Update user details | ✅ |
| `GET` | `/api/v1/user/search` | Search users | ✅ |
| `GET` | `/api/v1/user/:id` | Get user by ID | ✅ |

---

### Connection Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/v1/connections/request` | Send connection request | ✅ |
| `PUT` | `/api/v1/connections/accept/:id` | Accept connection | ✅ |
| `PUT` | `/api/v1/connections/reject/:id` | Reject connection | ✅ |
| `GET` | `/api/v1/connections/pending` | Get pending requests | ✅ |
| `GET` | `/api/v1/connections/list` | Get all connections | ✅ |

---

### Chat Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/v1/chat/conversations` | Get all conversations | ✅ |
| `GET` | `/api/v1/chat/:conversationId` | Get messages | ✅ |
| `POST` | `/api/v1/chat/send` | Send message | ✅ |

**WebSocket Events**:
- **Emit**: `send_message` - Send a message
- **Listen**: `receive_message` - Receive messages in real-time

---

### Blog Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/v1/blogs/create` | Create new blog | ✅ |
| `GET` | `/api/v1/blogs` | Get all blogs | ❌ |
| `GET` | `/api/v1/blogs/:id` | Get blog by ID | ❌ |
| `PUT` | `/api/v1/blogs/:id` | Update blog | ✅ |
| `DELETE` | `/api/v1/blogs/:id` | Delete blog | ✅ |

---

### Payment Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/v1/payment/create-order` | Create payment order | ✅ |
| `POST` | `/api/v1/payment/verify` | Verify payment | ✅ |
| `GET` | `/api/v1/payment/subscription-status` | Check subscription | ✅ |

---

## 🗄️ Database Schema

```mermaid
erDiagram
    User ||--o{ Blog : creates
    User ||--o{ ConnectionRequest : sends
    User ||--o{ ConnectionRequest : receives
    User ||--o{ Chat : participates
    User ||--o{ Subscription : has
    User ||--o{ OTP : receives

    User {
        ObjectId _id PK
        string firstName
        string lastName
        string email UK
        string password
        number age
        string gender
        array skills
        string about
        string photoUrl
        string authProvider
        boolean isVerified
        boolean isPremium
        string membershipType
        date lastLogin
        date createdAt
        date updatedAt
    }

    Blog {
        ObjectId _id PK
        ObjectId userId FK
        string title
        string content
        string category
        array tags
        date createdAt
        date updatedAt
    }

    ConnectionRequest {
        ObjectId _id PK
        ObjectId fromUserId FK
        ObjectId toUserId FK
        string status
        date createdAt
        date updatedAt
    }

    Chat {
        ObjectId _id PK
        ObjectId senderId FK
        ObjectId receiverId FK
        string message
        boolean isRead
        date createdAt
    }

    Subscription {
        ObjectId _id PK
        ObjectId userId FK
        string planType
        number amount
        string orderId
        string paymentId
        string status
        date startDate
        date endDate
    }

    OTP {
        ObjectId _id PK
        string email
        string otp
        date expiresAt
        date createdAt
    }
```

---

## ☁️ Deployment Architecture

### Production Deployment

The backend is deployed on **AWS EC2** with a fully automated **CI/CD pipeline** using **GitHub Actions** and **Docker Hub**.

```mermaid
graph TB
    Dev[Developer] -->|Push Code| GH[GitHub Repository]
    GH -->|Webhook Trigger| GA[GitHub Actions CI/CD]
    
    subgraph "CI/CD Pipeline"
        GA -->|1. Build| DockerBuild[Docker Build]
        DockerBuild -->|2. Test| Tests[Run Tests]
        Tests -->|3. Push| DH[Docker Hub Registry]
    end
    
    subgraph "AWS Infrastructure"
        DH -->|4. Pull Image| EC2[AWS EC2 Instance]
        EC2 -.->|Elastic IP| EIP[Static IP Address]
        EC2 -->|5. Run Container| Container[Docker Container:5000]
    end
    
    subgraph "Network Layer"
        Domain[Custom Domain] -->|DNS A Record| EIP
        Client[Client Apps] -->|HTTPS Request| Domain
        Domain -->|SSL/TLS| Nginx[Nginx Reverse Proxy]
        Nginx -->|Proxy Pass| Container
    end
    
    Container -->|Secure Connection| DB[(MongoDB Atlas)]
    Container -->|WebSocket| WS[Socket.io]
```

### Deployment Strategy

Our production deployment follows a **containerized microservices** approach with automated CI/CD:

#### 🔄 CI/CD Pipeline (GitHub Actions)

**Trigger**: Push to `main` branch or Pull Request merge

**Workflow Steps**:
```yaml
1. Checkout Code → 2. Build Docker Image → 3. Run Tests → 
4. Push to Docker Hub → 5. SSH to EC2 → 6. Pull Latest Image → 
7. Stop Old Container → 8. Start New Container → 9. Health Check
```

**GitHub Actions Workflow** (`.github/workflows/deploy.yml`):
- **Build**: Creates optimized Docker image with multi-stage build
- **Push**: Pushes image to Docker Hub with version tags
- **Deploy**: SSH into EC2 and executes deployment script
- **Rollback**: Previous image retained for quick rollback

#### 🖥️ AWS EC2 Configuration

| Configuration | Details |
|--------------|---------|
| **Instance Type** | t2.medium (2 vCPU, 4GB RAM) |
| **Operating System** | Ubuntu 22.04 LTS |
| **Elastic IP** | Static IP address attached for persistent endpoint |
| **Security Group** | Ports: 22 (SSH), 80 (HTTP), 443 (HTTPS), 5000 (App) |
| **Docker** | Docker Engine + Docker Compose |

#### 🌐 Domain & SSL Configuration

**Custom Domain Setup**:
- **Domain Registrar**: Custom domain configured with DNS provider
- **DNS Configuration**: A record pointing to Elastic IP
- **SSL Certificate**: Let's Encrypt via Certbot (Auto-renewal enabled)
- **SSL Termination**: Nginx handles HTTPS and forwards to backend on port 5000

**Nginx Configuration** (`/etc/nginx/sites-available/connectly`):
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 🐳 Docker Deployment

**Docker Hub Repository**: `username/connectly-backend:latest`

**Deployment Commands** (Auto-executed via CI/CD):
```bash
# Pull latest image from Docker Hub
docker pull username/connectly-backend:latest

# Stop and remove old container
docker stop connectly-backend && docker rm connectly-backend

# Run new container with environment variables
docker run -d \
  --name connectly-backend \
  --restart unless-stopped \
  -p 5000:5000 \
  --env-file .env \
  -v /var/logs/connectly:/app/logs \
  username/connectly-backend:latest

# Verify deployment
curl https://yourdomain.com/health
```

### Infrastructure Components

| Component | Service | Description |
|-----------|---------|-------------|
| **Compute** | AWS EC2 (t2.medium) | Application server with Docker runtime |
| **Network** | Elastic IP | Static IP address for domain configuration |
| **Database** | MongoDB Atlas | Managed MongoDB cluster with auto-scaling |
| **Container Registry** | Docker Hub | Stores versioned Docker images |
| **Reverse Proxy** | Nginx | SSL termination and load balancing |
| **SSL/TLS** | Let's Encrypt | Free SSL certificates with auto-renewal |
| **CI/CD** | GitHub Actions | Automated build, test, and deployment |
| **Monitoring** | Winston Logs | Application logs persisted to EC2 volumes |
| **Domain** | Custom Domain | Professional domain with HTTPS |

### Deployment Benefits

✅ **Zero-Downtime Deployment**: New containers start before old ones stop  
✅ **Automatic Rollback**: Previous Docker image retained for instant rollback  
✅ **Scalability**: Easy horizontal scaling by adding EC2 instances  
✅ **Security**: HTTPS enforced, SSL auto-renewed, environment variables encrypted  
✅ **Monitoring**: Centralized logging and health check endpoints  
✅ **Cost-Effective**: Elastic IP ensures no IP changes, reducing DNS propagation issues

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB** (Local or Atlas connection string)
- **Docker** (optional, for containerized deployment)

### Environment Variables

Create a `.env` file in the `Backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/connectly

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# Razorpay
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret

# ImageKit
IMAGEKIT_PUBLIC_KEY=public_xxxxxx
IMAGEKIT_PRIVATE_KEY=private_xxxxxx
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id

# CORS Origins
ALLOWED_ORIGINS=https://yourdomain.com,http://localhost:5173
```

### Local Development

1. **Clone the Repository**
   ```bash
   git clone https://github.com/kartik7310/Connectly.git
   cd Connectly/Backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

   Server starts on `http://localhost:5000`

4. **Test Health Endpoint**
   ```bash
   curl http://localhost:5000/health
   ```

### Docker Deployment

1. **Build Docker Image**
   ```bash
   docker build -t connectly-backend .
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **View Logs**
   ```bash
   docker-compose logs -f
   ```

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Runtime** | Node.js v18+ | JavaScript runtime |
| **Framework** | Express.js v5.1 | Web application framework |
| **Database** | MongoDB + Mongoose | NoSQL database and ODM |
| **Real-time** | Socket.io v4.8 | WebSocket communication |
| **Authentication** | JWT + Google OAuth | Secure authentication |
| **Validation** | Zod v4.1 | Schema validation |
| **Logging** | Winston v3.18 | Application logging |
| **Payments** | Razorpay v2.9 | Payment gateway |
| **Media** | ImageKit v6.0 | Image optimization and delivery |
| **Security** | bcrypt v6.0 | Password hashing |
| **DevOps** | Docker + Docker Compose | Containerization |

---

## 📝 Development Guidelines

### Code Style

- Use **ES6 modules** (`import/export`)
- Follow **MVC pattern** strictly
- Keep controllers thin, services fat
- Use **async/await** for asynchronous operations
- Handle errors with try-catch and global error handler

### Error Handling

All errors are handled through the global error middleware:

```javascript
import AppError from './utils/AppError.js';

// In service or controller
throw new AppError('User not found', 404);
```

### Logging

Use the Winston logger for all logging:

```javascript
import logger from './config/logger.js';

logger.info('User logged in successfully');
logger.error('Database connection failed', { error });
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 📞 Support

For issues or questions, please open an issue on GitHub or contact the development team.

---

<div align="center">

**Built with ❤️ by the Connectly Team**

[Report Bug](https://github.com/kartik7310/Connectly/issues) · [Request Feature](https://github.com/kartik7310/Connectly/issues)

</div>

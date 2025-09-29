# 🔄 SkillSwap Platform

A modern, full-stack skill-sharing platform that connects people to learn and teach skills within their community. Built with ASP.NET Core and React.js.

![SkillSwap Platform](https://img.shields.io/badge/Platform-SkillSwap-blue?style=for-the-badge)
![.NET](https://img.shields.io/badge/.NET-8.0-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

### 🔐 **Authentication & Security**
- JWT-based authentication system
- Secure password hashing with BCrypt
- Role-based authorization (User/Admin)
- Protected routes and API endpoints

### 🎯 **Core Functionality**
- **Skill Discovery**: Advanced filtering and search capabilities
- **User Profiles**: Comprehensive profile management with ratings
- **Real-time Messaging**: Direct communication between users
- **Rating System**: 5-star reviews and feedback system
- **Location-based Discovery**: Find skills in your area
- **Skill Management**: Create, edit, and manage your skills

### 🎨 **User Experience**
- **Responsive Design**: Mobile-first approach with professional UI
- **Modern Interface**: Clean blue-black theme with smooth animations
- **Touch-friendly**: Optimized for mobile and tablet devices
- **Loading States**: Skeleton loading and progress indicators
- **Error Handling**: Comprehensive error boundaries and validation

### 📊 **Data Management**
- **Entity Framework Core**: Robust data layer with SQL Server
- **Sample Data**: Pre-populated with realistic demo content
- **Database Relationships**: Properly structured data models
- **Automatic Seeding**: Development data for immediate testing

## 🚀 Quick Start

### Prerequisites
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- [SQL Server](https://www.microsoft.com/en-us/sql-server) or SQL Server LocalDB

### 1. Clone the Repository
```bash
git clone https://github.com/rafiabdulnadir/SkillNET.git
cd SkillNET
```

### 2. Backend Setup (ASP.NET Core)
```bash
cd backend/SkillSwapAPI

# Restore dependencies
dotnet restore

# Update database connection string in appsettings.json if needed
# Default uses LocalDB: Server=(localdb)\\mssqllocaldb;Database=SkillSwapDB_Dev

# Run database migrations and seed data
dotnet ef database update

# Start the API server
dotnet run
```

The API will be available at `https://localhost:5001` and `http://localhost:5000`

### 3. Frontend Setup (React.js)
```bash
cd frontend

# Install dependencies
npm install

# Create environment file (optional)
cp .env.example .env

# Start the development server
npm start
```

The frontend will be available at `http://localhost:3000`

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **API**: http://localhost:5000
- **Swagger Documentation**: http://localhost:5000/swagger (Development only)

## 🧪 Demo Accounts

The application comes with pre-seeded demo accounts:

| Email | Password | Role | Description |
|-------|----------|------|-------------|
| alice@example.com | password123 | User | React developer with high ratings |
| bob@example.com | password123 | User | Data scientist and Python expert |
| carol@example.com | password123 | User | UX/UI designer with excellent reviews |
| david@example.com | password123 | User | .NET developer and Azure specialist |
| emma@example.com | password123 | User | Digital marketing expert |
| frank@example.com | password123 | User | Professional photographer |

## 📁 Project Structure

```
SkillNET/
├── backend/SkillSwapAPI/           # ASP.NET Core API
│   ├── Controllers/                # API endpoints
│   │   ├── AuthController.cs       # Authentication
│   │   ├── UsersController.cs      # User management
│   │   ├── SkillsController.cs     # Skill operations
│   │   ├── MessagesController.cs   # Messaging system
│   │   └── RatingsController.cs    # Rating system
│   ├── Data/                       # Data layer
│   │   ├── ApplicationDbContext.cs # EF Core context
│   │   └── SeedData.cs            # Sample data
│   ├── Models/                     # Data models
│   │   ├── User.cs                # User entity
│   │   ├── Skill.cs               # Skill entity
│   │   ├── Message.cs             # Message entity
│   │   ├── Rating.cs              # Rating entity
│   │   └── Transaction.cs         # Transaction entity
│   ├── Services/                   # Business logic
│   │   ├── AuthService.cs         # Authentication logic
│   │   └── EmailService.cs        # Email notifications
│   ├── Program.cs                 # Application startup
│   └── appsettings.json           # Configuration
├── frontend/                       # React.js application
│   ├── public/                    # Static assets
│   │   ├── index.html             # HTML template
│   │   └── manifest.json          # PWA manifest
│   ├── src/                       # Source code
│   │   ├── components/            # Reusable components
│   │   │   ├── Navbar.js          # Navigation
│   │   │   ├── SkillCard.js       # Skill display
│   │   │   ├── SkillFilter.js     # Advanced filtering
│   │   │   ├── LoadingSpinner.js  # Loading states
│   │   │   ├── ErrorBoundary.js   # Error handling
│   │   │   └── ProtectedRoute.js  # Route protection
│   │   ├── contexts/              # React contexts
│   │   │   └── AuthContext.js     # Authentication state
│   │   ├── pages/                 # Application pages
│   │   │   ├── Home.js            # Skill browsing
│   │   │   ├── Login.js           # User login
│   │   │   ├── Register.js        # User registration
│   │   │   ├── Profile.js         # User profile
│   │   │   ├── AddSkill.js        # Skill creation
│   │   │   ├── Messages.js        # Messaging interface
│   │   │   └── Ratings.js         # Rating system
│   │   ├── styles/                # Styling
│   │   │   ├── App.css            # Main styles
│   │   │   └── responsive.css     # Mobile optimization
│   │   ├── utils/                 # Utilities
│   │   │   └── api.js             # API client
│   │   ├── App.js                 # Main component
│   │   └── index.js               # React entry point
│   ├── package.json               # Dependencies
│   └── .env.example               # Environment template
└── README.md                      # This file
```

## 🛠️ Technology Stack

### Backend
- **Framework**: ASP.NET Core 8.0
- **Database**: Entity Framework Core with SQL Server
- **Authentication**: JWT Bearer tokens
- **Documentation**: Swagger/OpenAPI
- **Email**: SMTP integration
- **Security**: BCrypt password hashing

### Frontend
- **Framework**: React 18 with Hooks
- **Routing**: React Router v6
- **Styling**: Custom CSS with CSS Variables
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Icons**: Unicode emojis and symbols

### Development Tools
- **API Testing**: Swagger UI
- **Database**: SQL Server LocalDB
- **Version Control**: Git
- **Package Managers**: NuGet (.NET), npm (React)

## 🔧 Configuration

### Backend Configuration
Edit `backend/SkillSwapAPI/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Your SQL Server connection string"
  },
  "JwtSettings": {
    "SecretKey": "Your JWT secret key (32+ characters)",
    "Issuer": "SkillSwapAPI",
    "Audience": "SkillSwapClient",
    "ExpirationInMinutes": 1440
  },
  "EmailSettings": {
    "SmtpServer": "smtp.gmail.com",
    "SmtpPort": 587,
    "SmtpUsername": "your-email@gmail.com",
    "SmtpPassword": "your-app-password"
  }
}
```

### Frontend Configuration
Create `frontend/.env` from `.env.example`:

```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_APP_NAME=SkillSwap
REACT_APP_ENVIRONMENT=development
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token

### User Management
- `GET /api/users` - Get all users (with filtering)
- `GET /api/users/{id}` - Get user by ID
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile

### Skill Management
- `GET /api/skills` - Get all skills (with filtering)
- `GET /api/skills/{id}` - Get skill by ID
- `POST /api/skills` - Create new skill
- `PUT /api/skills/{id}` - Update skill
- `DELETE /api/skills/{id}` - Delete skill
- `GET /api/skills/categories` - Get skill categories

### Messaging System
- `GET /api/messages/conversations` - Get user conversations
- `GET /api/messages/conversation/{userId}` - Get conversation with user
- `POST /api/messages` - Send message
- `PUT /api/messages/{id}/read` - Mark message as read

### Rating System
- `GET /api/ratings/user/{userId}` - Get user ratings
- `POST /api/ratings` - Create rating
- `PUT /api/ratings/{id}` - Update rating
- `DELETE /api/ratings/{id}` - Delete rating

## 🚀 Deployment

### Backend Deployment
1. **Publish the application**:
   ```bash
   dotnet publish -c Release -o ./publish
   ```

2. **Configure production settings** in `appsettings.Production.json`

3. **Deploy to your hosting provider** (Azure, AWS, etc.)

### Frontend Deployment
1. **Build for production**:
   ```bash
   npm run build
   ```

2. **Deploy the `build` folder** to your static hosting service

### Database Setup
1. **Update connection string** for production database
2. **Run migrations**:
   ```bash
   dotnet ef database update --environment Production
   ```

## 🧪 Testing

### Backend Testing
```bash
cd backend/SkillSwapAPI
dotnet test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Create an issue on GitHub for bugs or feature requests
- **Email**: Contact support@skillswap.com for general inquiries

## 🎯 Roadmap

- [ ] Real-time notifications
- [ ] Video calling integration
- [ ] Payment processing
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Social media integration
- [ ] Skill certification system

## 🙏 Acknowledgments

- Built with ❤️ using ASP.NET Core and React
- Icons and emojis from Unicode standard
- Inspiration from modern skill-sharing platforms
- Community feedback and contributions

---

**Happy Skill Sharing! 🚀**


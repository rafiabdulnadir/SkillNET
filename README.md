# 🔄 SkillSwap - Community Skill Exchange Platform

A modern, full-stack web application that enables users to discover, share, and exchange skills within their community. Built with **ASP.NET Core** backend and **React.js** frontend.

![SkillSwap Platform](https://via.placeholder.com/800x400/1e3a8a/ffffff?text=SkillSwap+Platform)

## ✨ Features

### 🎯 **Core Functionality**
- **Skill Discovery**: Browse thousands of skills with advanced filtering
- **User Profiles**: Comprehensive profiles with ratings and reviews
- **Real-time Messaging**: Direct communication between users
- **Rating System**: 5-star rating system with detailed reviews
- **Location-based Search**: Find skills near your location
- **Responsive Design**: Works seamlessly on all devices

### 🔐 **Authentication & Security**
- JWT-based authentication
- Role-based authorization (User/Admin)
- Secure password hashing with BCrypt
- Protected routes and API endpoints

### 📱 **User Experience**
- Professional blue-black theme
- Mobile-first responsive design
- Advanced search and filtering
- Real-time notifications
- Intuitive navigation with hamburger menu

## 🛠️ Technology Stack

### **Backend (ASP.NET Core 6.0)**
- **Framework**: ASP.NET Core Web API
- **Database**: Entity Framework Core with SQL Server
- **Authentication**: JWT Bearer tokens
- **Email**: SMTP email service for notifications
- **Architecture**: Clean Architecture with Repository pattern

### **Frontend (React.js 18)**
- **Framework**: React.js with functional components
- **Routing**: React Router v6
- **State Management**: Context API
- **HTTP Client**: Axios
- **Styling**: Custom CSS with CSS Variables
- **Build Tool**: Create React App

## 🚀 Quick Start

### Prerequisites
- .NET 6.0 SDK
- Node.js 16+ and npm
- SQL Server (LocalDB for development)
- Visual Studio 2022 or VS Code

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/skillswap.git
   cd skillswap/backend/SkillSwapAPI
   ```

2. **Install dependencies**
   ```bash
   dotnet restore
   ```

3. **Update connection string**
   ```json
   // appsettings.json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=SkillSwapDB;Trusted_Connection=true;MultipleActiveResultSets=true"
     }
   }
   ```

4. **Run database migrations**
   ```bash
   dotnet ef database update
   ```

5. **Start the API**
   ```bash
   dotnet run
   ```
   API will be available at `https://localhost:7001`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Start the development server**
   ```bash
   npm start
   ```
   App will be available at `http://localhost:3000`

## 📊 Database Schema

### Core Entities
- **Users**: User profiles with authentication
- **Skills**: Skill listings with categories and levels
- **Messages**: Real-time messaging system
- **Ratings**: 5-star rating and review system
- **Transactions**: Skill exchange tracking

### Sample Data
The application includes comprehensive seed data:
- 6 sample users (including admin)
- 10+ diverse skills across categories
- Sample messages and conversations
- Rating and review examples

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#1e3a8a` - Main brand color
- **Secondary Black**: `#1e293b` - Text and accents
- **Success Green**: `#10b981` - Success states
- **Warning Orange**: `#f59e0b` - Warnings and ratings
- **Error Red**: `#ef4444` - Error states

### Typography
- **Headings**: System font stack with fallbacks
- **Body**: Optimized for readability across devices
- **Responsive**: Scales appropriately on all screen sizes

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Users
- `GET /api/users/profile` - Get current user profile
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user profile

### Skills
- `GET /api/skills` - Get skills with filtering
- `GET /api/skills/{id}` - Get skill by ID
- `POST /api/skills` - Create new skill
- `PUT /api/skills/{id}` - Update skill
- `DELETE /api/skills/{id}` - Delete skill

### Messages
- `POST /api/messages` - Send message
- `GET /api/messages/{userId}` - Get conversation
- `GET /api/messages/conversations` - Get all conversations

### Ratings
- `POST /api/ratings` - Create rating
- `GET /api/ratings/{userId}` - Get user ratings
- `GET /api/ratings/stats/{userId}` - Get rating statistics

## 🧪 Testing

### Demo Account
Use these credentials to explore the platform:
- **Email**: `alice@example.com`
- **Password**: `password123`

### Sample Users
The seed data includes 5 additional users with various skills:
- Bob Smith (Programming)
- Carol Davis (Cooking)
- David Wilson (Music)
- Emma Brown (Fitness)

## 🚀 Deployment

### Backend Deployment
1. Configure production connection string
2. Update JWT settings for production
3. Configure email service credentials
4. Deploy to Azure App Service or similar

### Frontend Deployment
1. Update API URL in environment variables
2. Build production bundle: `npm run build`
3. Deploy to Netlify, Vercel, or similar

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons from various emoji sets
- Inspiration from modern skill-sharing platforms
- Community feedback and suggestions

## 📞 Support

For support, email support@skillswap.com or create an issue in this repository.

---

**Built with ❤️ by the SkillSwap Team**


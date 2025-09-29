# SkillSwap API

This is the backend API for the SkillSwap application, a platform for users to exchange skills and knowledge.

## Technologies Used

- ASP.NET Core 6.0
- Entity Framework Core
- PostgreSQL
- JWT Authentication
- Swagger/OpenAPI

## Getting Started

### Prerequisites

- .NET 6.0 SDK
- PostgreSQL

### Setup

1. Clone the repository
2. Navigate to the `backend/SkillSwapAPI` directory
3. Create your appsettings.json and appsettings.Development.json files based on the template files:
   - Copy `appsettings.template.json` to `appsettings.json`
   - Copy `appsettings.Development.template.json` to `appsettings.Development.json`
   - Update the connection string with your PostgreSQL credentials
   - Set a secure JWT secret key

4. Create the database:
   ```
   dotnet ef database update
   ```
   
   If you haven't installed the EF Core tools:
   ```
   dotnet tool install --global dotnet-ef
   ```

5. Run the application:
   ```
   dotnet run
   ```

6. Access the Swagger documentation at `https://localhost:7001/swagger`

## API Endpoints

The API provides the following endpoints:

- **Auth**: User registration and login
- **Users**: User profile management
- **Skills**: Skill listing and management
- **Messages**: User-to-user messaging
- **Ratings**: User ratings and reviews

## Database Schema

The application uses the following entity model:

- **User**: User profiles and authentication
- **Skill**: Skills offered by users
- **Message**: Communication between users
- **Rating**: User ratings and reviews
- **Transaction**: Skill exchange transactions

## Development

To add migrations:

```
dotnet ef migrations add MigrationName
```

To update the database:

```
dotnet ef database update
```

## Security

- JWT tokens are used for authentication
- Passwords are hashed using BCrypt
- HTTPS is enforced in production

# Workforce Administration Portal

A full-stack Workforce Administration Portal developed using React and Django REST Framework. The application provides a web interface for managing employees, departments, projects, and user details through REST APIs.

## Features

- User signup and login.
- JWT-based authentication using access and refresh tokens.
- Employee management.
- Department management.
- Project management.
- User details management.
- Employee search by name and designation.
- Create, view, update, and delete operations through REST APIs.
- Protected frontend routes.
- Relational database models.
- Postman collections for API testing.
- GitHub Actions workflow for deployment automation.

## Technologies Used

### Frontend

- React
- JavaScript
- React Router
- Axios
- Bootstrap 5
- Vite

### Backend

- Python
- Django
- Django REST Framework
- Simple JWT
- django-cors-headers

### Database

- MySQL

### Development and Deployment

- Git
- GitHub
- Postman
- GitHub Actions
- AWS EC2

## Project Structure

```text
workforce-administration-portal/
├── backend/
│   ├── apibackendapp/
│   ├── emsapiproj/
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   └── ems-frontend/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── postman/
├── screenshots/
│   └── README.md
├── .gitignore
└── README.md
```

## Backend Functionality

The Django REST Framework backend provides API endpoints for:

- User registration and login.
- Employee records.
- Department records.
- Project records.
- User details.
- JWT token refresh.

The application uses Django models, serializers, and viewsets to manage data and expose REST APIs.

## Frontend Functionality

The React frontend provides:

- Login interface.
- Dashboard.
- Employee list and forms.
- Department list.
- Project list and forms.
- User details list.
- Protected routes for authenticated users.

Axios is used for communication with the backend APIs, while React Router handles navigation.

## Getting Started

### Prerequisites

Install:

- Python
- Node.js and npm
- MySQL, if using the configured MySQL database
- Git

### 1. Set up the backend

Open a terminal in the `backend` directory.

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows Command Prompt:

```bat
.venv\Scripts\activate
```

Install the dependencies:

```bash
python -m pip install -r requirements.txt
```

Configure the database connection and Django secret key using local environment variables.

Create the database if you are using MySQL, then apply the migrations:

```bash
python manage.py migrate
```

Create an administrator account if needed:

```bash
python manage.py createsuperuser
```

Start the backend server:

```bash
python manage.py runserver
```

The local development server runs at:

`http://127.0.0.1:8000/`

### 2. Set up the frontend

Open a separate terminal in:

`frontend/ems-frontend/`

Install the frontend dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the local URL displayed by Vite, usually:

`http://localhost:5173/`

### 3. Use the application

1. Open the React application.
2. Sign up or log in using an authorized account.
3. Navigate to the employee, department, or project pages.
4. Create or update records.
5. View the updated data returned by the backend APIs.

Ensure that the backend is running and that the frontend API configuration points to the correct backend URL.

## API Testing

Postman collections are included for testing the authentication and resource endpoints.

Configure the appropriate local API base URL and obtain an access token before testing endpoints that require authentication.

## Deployment

The repository includes a GitHub Actions workflow that connects to an AWS EC2 server using GitHub Actions secrets and executes deployment commands.

Before using this workflow, configure the required GitHub secrets and verify that the deployment paths, environment, and service names match your server.

Never commit private SSH keys or deployment credentials to the repository.

## Security Notes

- Do not commit Django secret keys, database passwords, or private SSH keys.
- Use environment variables for sensitive configuration.
- Configure appropriate allowed hosts and CORS origins.
- Keep production debugging disabled.
- Protect endpoints with appropriate authentication and authorization.
- Use HTTPS for deployed applications.

## Future Improvements

- Add automated backend and frontend tests.
- Improve API error handling and user feedback.
- Add pagination to large employee and project lists.
- Improve accessibility and responsive design.
- Configure environment-based API URLs.
- Add a deployment health check and automated tests to the CI/CD workflow.

## Author

Developed as a full-stack web development project to practise React, Django REST Framework, REST API integration, JWT authentication, relational database management, and deployment automation.

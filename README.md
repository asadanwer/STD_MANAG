<!-- @format -->

Student Management System

Overview
This is a Full-Stack Student Management System built using Django for the backend and React (Vite) for the frontend. The system allows CRUD operations for students, courses, and enrollments, along with a dashboard for visualizing student distribution.

Tech Stack
Backend

- Framework: Django
- Database: PostgreSQL (or SQLite/MySQL based on configuration)
- Architecture: Component-based modular design
- Validation: Implemented using Django Models & DRF serializers
- API: RESTful endpoints using Django REST Framework

Frontend

- Framework: React (Vite)
- State Management: React Context/Redux
- UI Components: Component-based modular structure
- Styling: Bootstrap/Tailwind CSS

Deployment

- Containerization: Docker with `docker-compose.yml`
- Frontend Service: Vite React App
- Backend Service: Django API
- Database Service: PostgreSQL

Features
Backend

- CRUD operations for Students, Courses, and Enrollments
- Data validation using Django Models
- Seed data with:
  - 10 students
  - 5 courses
  - 20 enrollments
- RESTful API using Django REST Framework (DRF)
- Authentication (JWT-based if implemented)

Frontend

- Forms for managing students, courses, and enrollments
- Dynamic data listing with pagination
- Dashboard with visualizations:
  - Number of students enrolled per course
  - Distribution of students across courses
- Responsive UI with modern design

Setup & Installation
Prerequisites

- Docker & Docker Compose
- Node.js & npm/yarn (for local frontend setup)
- Python & pip (for local backend setup)

Running with Docker

1. Clone the repository:
   ```sh
   git clone https://github.com/asadanwer/STD_MANAG.git
   cd student-management
   ```
2. Run the application:
   ```sh
   docker-compose up --build
   ```
3. Access the application:
   - Backend API: `http://localhost:8000/api/`
   - Frontend App: `http://localhost:5173/`

Running Locally (Without Docker)
Backend Setup

```sh
cd backend
python -m venv venv
source venv/bin/activate   On Windows use `venv\Scriptsctivate`
pip install -r requirements.txt
python manage.py migrate
python manage.py loaddata seed_data.json
python manage.py runserver
```

Backend runs at `http://localhost:8000/`

Frontend Setup

```sh
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173/`

API Endpoints
| Endpoint | Method | Description |
| `/api/students/` | GET, POST | Retrieve or create students |
| `/api/students/{id}/` | GET, PUT, DELETE | Manage a specific student |
| `/api/courses/` | GET, POST | Retrieve or create courses |
| `/api/courses/{id}/` | GET, PUT, DELETE | Manage a specific course |
| `/api/enrollments/` | GET, POST | Retrieve or create enrollments |
| `/api/enrollments/{id}/` | GET, PUT, DELETE | Manage a specific enrollment |

Improvements & Future Enhancements

- Implement authentication & role-based access control
- Add search & filtering for students and courses
- Enhance UI with better data visualization
- Improve test coverage with unit and integration tests

Author
Asad Anwer
Email: asadanwer.asad@gmail.com
Email: asad1503b@gmail.com

License
MIT License

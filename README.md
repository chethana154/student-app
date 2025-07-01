# 🎓 Student Management System

A full-stack web application built with Angular and Node.js that enables role-based access for students and administrators.

---

## 🚀 Features

- 🔐 JWT-based authentication
- 🧑‍🎓 Students can view their own profile
- 👨‍💼 Admins can view a list of all registered students
- 🎨 Clean Bootstrap 5 UI
- 🔄 Loading spinner for profile fetching
- 🔧 RESTful API structure with Express & MongoDB

---

## 📁 Project Structure

Student-app/ ├── backend/ │ ├── controllers/ │ ├── models/ │ ├── routes/ │ ├── middleware/ │ └── server.js ├── frontend/ │ └── src/app/ │ ├── dashboard/ │ ├── register/ │ ├── login/ │ └── services/ ├── README.md ├── APPROACH.md └── .gitignore

## 🛠 Setup Instructions

### Backend

```bash
cd backend
npm install
touch .env
# Add JWT_SECRET=yourSecretKey
npm run dev


### Frontend

cd frontend
npm install
ng serve


Endpoint	Method	Description
/register	POST	Register with name, email, role
/login	    POST	Get JWT on valid credentials
/profile	GET	    Get profile: all students (admin) or self (student)
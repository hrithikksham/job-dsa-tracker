# 🚀 TrackDJ

> A minimalist **Job Application Tracker** and **DSA Progress Tracker** built for developers who want to stay organized without unnecessary complexity.

TrackDJ is designed around one principle:

> **Complete any task in under 30 seconds.**

Whether you're applying for jobs or solving coding problems, TrackDJ provides a fast, distraction-free workflow with a clean and responsive interface.

---

# ✨ Features

## 💼 Job Application Tracker

Manage all your job applications in one place.

### Store

* Company Name
* Role Name
* Salary
* Location
* Application Date
* Job Description (JD)
* Application Status

### Status Types

* 🟢 Applied
* 🟡 On Process
* 🔴 Rejected
* 🔵 Accepted

### Actions

* Create application
* Edit application
* Delete application
* Search by company or role
* Responsive table layout
* Automatic serial numbering

---

## 📚 DSA Tracker

Keep track of solved coding problems.

### Store

* Question Name
* Problem URL
* Solved Date
* Personal Notes
* Solution Code

### Actions

* Add question
* Edit question
* Delete question
* Search by title
* Open problem link directly
* Automatic serial numbering

---

# 🎨 Design Philosophy

TrackDJ intentionally avoids feature bloat.

## Core Principles

* Minimal UI
* Clean typography
* Large spacing
* Rounded components
* Mobile responsive
* Fast interactions
* Simple CRUD workflow
* No unnecessary dashboards

The goal is to make recording progress feel effortless.

---

# 🖥️ Tech Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Axios

## Backend

* FastAPI
* SQLAlchemy
* Alembic
* Pydantic

## Database

* PostgreSQL
* Supabase Compatible

---

# 📁 Project Structure

```text
job-dsa-tracker/
│
├── backend/
│   ├── alembic/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── crud/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── hooks/
    │   ├── services/
    │   ├── styles/
    │   ├── types/
    │   └── App.tsx
    │
    ├── public/
    ├── package.json
    └── .env
```

---

# ⚙️ Backend Setup

## 1. Create a virtual environment

```bash
python -m venv .venv
```

## 2. Activate it

### macOS / Linux

```bash
source .venv/bin/activate
```

### Windows

```bash
.venv\Scripts\activate
```

## 3. Install dependencies

```bash
pip install -r requirements.txt
```

## 4. Configure environment variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://username:password@host:5432/database
```

## 5. Run migrations

```bash
alembic upgrade head
```

## 6. Start the server

```bash
uvicorn app.main:app --reload
```

Backend:

```
http://127.0.0.1:8000
```

Swagger Docs:

```
http://127.0.0.1:8000/docs
```

---

# ⚛️ Frontend Setup

Install dependencies:

```bash
npm install
```

Create `.env`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Run:

```bash
npm run dev
```

Frontend:

```
http://localhost:5173
```

---

# 📡 REST API

## Job Applications

| Method | Endpoint                 |
| ------ | ------------------------ |
| GET    | `/job-applications`      |
| POST   | `/job-applications`      |
| GET    | `/job-applications/{id}` |
| PUT    | `/job-applications/{id}` |
| DELETE | `/job-applications/{id}` |

## DSA Entries

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | `/dsa-entries`      |
| POST   | `/dsa-entries`      |
| GET    | `/dsa-entries/{id}` |
| PUT    | `/dsa-entries/{id}` |
| DELETE | `/dsa-entries/{id}` |

---

# 📱 User Experience

* Responsive on desktop and mobile
* Fast search and CRUD operations
* Rounded cards and modern layout
* Clean tables with serial numbers
* Accessible forms and controls
* Focused on speed and simplicity

---

# 🔮 Planned Enhancements

* Pagination
* Sorting and filtering
* CSV export
* Dark mode
* Keyboard shortcuts
* Statistics dashboard
* Authentication
* Cloud sync
* Tags and categories
* Rich notes editor

---

# 📄 License

This project is open for personal learning and customization. Feel free to fork it, adapt it, and extend it for your own productivity workflow.


from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from app.api.router import api_router


# Import models so SQLAlchemy registers them
from app.models.job_application import JobApplication
from app.models.dsa_entry import DSAEntry



@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Application started")
    yield
    print("Application shutting down")


app = FastAPI(
    title="Job Application & DSA Tracker API",
    version="1.0.0",
    description="Minimal backend for tracking Job Applications and DSA problems.",
    lifespan=lifespan,
)

# Register API routes
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["Root"])
def root():
    return {
        "message": "Job & DSA Tracker API is running",
        "docs": "/docs",
        "redoc": "/redoc",
    }


@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "database": "connected",
    }


@app.get("/version", tags=["Health"])
def version():
    return {
        "app": "Job Application & DSA Tracker API",
        "version": "1.0.0",
    }


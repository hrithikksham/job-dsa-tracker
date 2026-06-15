from fastapi import APIRouter

from app.api.v1.dsa import router as dsa_router
from app.api.v1.job_application import (
    router as job_application_router,
)

api_router = APIRouter()

api_router.include_router(job_application_router)
api_router.include_router(dsa_router)
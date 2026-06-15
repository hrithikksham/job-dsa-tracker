from uuid import UUID

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.job_application import (
    JobApplicationCreate,
    JobApplicationResponse,
    JobApplicationUpdate,
)
from app.services.job_application_service import JobApplicationService

router = APIRouter(
    prefix="/job-applications",
    tags=["Job Applications"],
)


@router.post(
    "",
    response_model=JobApplicationResponse,
    status_code=201,
)
def create_job_application(
    payload: JobApplicationCreate,
    db: Session = Depends(get_db),
):
    service = JobApplicationService(db)
    return service.create(payload)


@router.get("")
def list_job_applications(
    page: int = Query(1, ge=1),
    limit: int = Query(15, ge=1, le=100),
    search: str | None = None,
    status: str | None = None,
    location: str | None = None,
    db: Session = Depends(get_db),
):
    service = JobApplicationService(db)

    return service.get_all(
        page=page,
        limit=limit,
        search=search,
        status=status,
        location=location,
    )


@router.get(
    "/{job_id}",
    response_model=JobApplicationResponse,
)
def get_job_application(
    job_id: UUID,
    db: Session = Depends(get_db),
):
    service = JobApplicationService(db)
    return service.get_by_id(job_id)


@router.put(
    "/{job_id}",
    response_model=JobApplicationResponse,
)
def update_job_application(
    job_id: UUID,
    payload: JobApplicationUpdate,
    db: Session = Depends(get_db),
):
    service = JobApplicationService(db)
    return service.update(job_id, payload)


@router.delete("/{job_id}")
def delete_job_application(
    job_id: UUID,
    db: Session = Depends(get_db),
):
    service = JobApplicationService(db)
    return service.delete(job_id)
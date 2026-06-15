from uuid import UUID

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.repositories.job_application_repository import (
    JobApplicationRepository,
)
from app.schemas.job_application import (
    JobApplicationCreate,
    JobApplicationUpdate,
)


class JobApplicationService:
    def __init__(self, db: Session):
        self.repository = JobApplicationRepository(db)

    def create(self, data: JobApplicationCreate):
        return self.repository.create(data)

    def get_by_id(self, job_id: UUID):
        job = self.repository.get_by_id(job_id)

        if not job:
            raise HTTPException(
                status_code=404,
                detail="Job application not found",
            )

        return job

    def get_all(
        self,
        page: int = 1,
        limit: int = 15,
        search: str | None = None,
        status: str | None = None,
        location: str | None = None,
    ):
        return self.repository.get_all(
            page=page,
            limit=limit,
            search=search,
            status=status,
            location=location,
        )

    def update(
        self,
        job_id: UUID,
        data: JobApplicationUpdate,
    ):
        job = self.get_by_id(job_id)
        return self.repository.update(job, data)

    def delete(self, job_id: UUID):
        job = self.get_by_id(job_id)
        self.repository.delete(job)
        return {"message": "Job application deleted successfully"}
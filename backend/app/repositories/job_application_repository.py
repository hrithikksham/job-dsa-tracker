from typing import Optional

from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models.job_application import JobApplication
from app.schemas.job_application import JobApplicationCreate, JobApplicationUpdate


class JobApplicationRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, data: JobApplicationCreate) -> JobApplication:
        job = JobApplication(**data.model_dump())

        self.db.add(job)
        self.db.commit()
        self.db.refresh(job)

        return job

    def get_by_id(self, job_id: str) -> Optional[JobApplication]:
        return (
            self.db.query(JobApplication)
            .filter(JobApplication.id == job_id)
            .first()
        )

    def get_all(
        self,
        page: int = 1,
        limit: int = 15,
        search: Optional[str] = None,
        status: Optional[str] = None,
        location: Optional[str] = None,
    ):
        query = self.db.query(JobApplication)

        if search:
            query = query.filter(
                or_(
                    JobApplication.company_name.ilike(f"%{search}%"),
                    JobApplication.role_name.ilike(f"%{search}%"),
                )
            )

        if status:
            query = query.filter(JobApplication.status == status)

        if location:
            query = query.filter(
                JobApplication.location.ilike(f"%{location}%")
            )

        total = query.count()

        items = (
            query.order_by(JobApplication.date_of_apply.desc())
            .offset((page - 1) * limit)
            .limit(limit)
            .all()
        )

        return {
            "items": items,
            "total": total,
            "page": page,
            "limit": limit,
        }

    def update(
        self,
        job: JobApplication,
        data: JobApplicationUpdate,
    ) -> JobApplication:
        updates = data.model_dump(exclude_unset=True)

        for key, value in updates.items():
            setattr(job, key, value)

        self.db.commit()
        self.db.refresh(job)

        return job

    def delete(self, job: JobApplication) -> None:
        self.db.delete(job)
        self.db.commit()
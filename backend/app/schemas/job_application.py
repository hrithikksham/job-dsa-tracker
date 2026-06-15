import datetime
from enum import Enum
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class JobStatus(str, Enum):
    APPLIED = "Applied"
    ON_PROCESS = "On process"
    REJECTED = "Rejected"
    ACCEPTED = "Accepted"


class JobApplicationBase(BaseModel):
    company_name: str = Field(..., min_length=1, max_length=255)
    role_name: str = Field(..., min_length=1, max_length=255)
    salary: str | None = None
    location: str = Field(..., min_length=1, max_length=255)
    status: JobStatus
    date_of_apply: datetime.date
    jd_text: str | None = None


class JobApplicationCreate(JobApplicationBase):
    pass


class JobApplicationUpdate(BaseModel):
    company_name: str | None = None
    role_name: str | None = None
    salary: str | None = None
    location: str | None = None
    status: JobStatus | None = None
    date_of_apply: datetime.date | None = None
    jd_text: str | None = None


class JobApplicationResponse(JobApplicationBase):
    id: UUID
    created_at: datetime.datetime
    updated_at: datetime.datetime

    model_config = ConfigDict(from_attributes=True)
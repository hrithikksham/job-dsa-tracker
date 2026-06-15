import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, HttpUrl


class DSAEntryBase(BaseModel):
    question_name: str = Field(..., min_length=1, max_length=255)
    url: str | None = None
    date: datetime.date
    notes: str | None = None
    solution_code: str | None = None


class DSAEntryCreate(DSAEntryBase):
    pass


class DSAEntryUpdate(BaseModel):
    question_name: str | None = None
    url: str | None = None
    date: datetime.date | None = None
    notes: str | None = None
    solution_code: str | None = None


class DSAEntryResponse(DSAEntryBase):
    id: UUID
    created_at: datetime.datetime
    updated_at: datetime.datetime

    model_config = ConfigDict(from_attributes=True)
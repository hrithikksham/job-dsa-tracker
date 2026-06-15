from uuid import UUID

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.repositories.dsa_repository import DSARepository
from app.schemas.dsa_entry import (
    DSAEntryCreate,
    DSAEntryUpdate,
)


class DSAService:
    def __init__(self, db: Session):
        self.repository = DSARepository(db)

    def create(self, data: DSAEntryCreate):
        return self.repository.create(data)

    def get_by_id(self, entry_id: UUID):
        entry = self.repository.get_by_id(entry_id)

        if not entry:
            raise HTTPException(
                status_code=404,
                detail="DSA entry not found",
            )

        return entry

    def get_all(
        self,
        page: int = 1,
        limit: int = 15,
        search: str | None = None,
    ):
        return self.repository.get_all(
            page=page,
            limit=limit,
            search=search,
        )

    def update(
        self,
        entry_id: UUID,
        data: DSAEntryUpdate,
    ):
        entry = self.get_by_id(entry_id)
        return self.repository.update(entry, data)

    def delete(self, entry_id: UUID):
        entry = self.get_by_id(entry_id)
        self.repository.delete(entry)
        return {"message": "DSA entry deleted successfully"}
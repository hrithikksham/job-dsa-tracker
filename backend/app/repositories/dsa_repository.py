from typing import Optional

from sqlalchemy.orm import Session

from app.models.dsa_entry import DSAEntry
from app.schemas.dsa_entry import DSAEntryCreate, DSAEntryUpdate


class DSARepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, data: DSAEntryCreate):
        payload = data.model_dump()

        if payload.get("url") is not None:
            payload["url"] = str(payload["url"])

        entry = DSAEntry(**payload)

        self.db.add(entry)
        self.db.commit()
        self.db.refresh(entry)

        return entry

    def get_by_id(self, entry_id: str) -> Optional[DSAEntry]:
        return (
            self.db.query(DSAEntry)
            .filter(DSAEntry.id == entry_id)
            .first()
        )

    def get_all(
        self,
        page: int = 1,
        limit: int = 15,
        search: Optional[str] = None,
    ):
        query = self.db.query(DSAEntry)

        if search:
            query = query.filter(
                DSAEntry.question_name.ilike(f"%{search}%")
            )

        total = query.count()

        items = (
            query.order_by(DSAEntry.date.desc())
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

    def update(self, entry: DSAEntry, data: DSAEntryUpdate):
        updates = data.model_dump(exclude_unset=True)

        if updates.get("url") is not None:
            updates["url"] = str(updates["url"])

        for key, value in updates.items():
            setattr(entry, key, value)

        self.db.commit()
        self.db.refresh(entry)

        return entry

    def delete(self, entry: DSAEntry) -> None:
        self.db.delete(entry)
        self.db.commit()
from uuid import UUID

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.dsa_entry import (
    DSAEntryCreate,
    DSAEntryResponse,
    DSAEntryUpdate,
)
from app.services.dsa_service import DSAService

router = APIRouter(
    prefix="/dsa-entries",
    tags=["DSA Entries"],
)


@router.post(
    "",
    response_model=DSAEntryResponse,
    status_code=201,
)
def create_dsa_entry(
    payload: DSAEntryCreate,
    db: Session = Depends(get_db),
):
    service = DSAService(db)
    return service.create(payload)


@router.get("")
def list_dsa_entries(
    page: int = Query(1, ge=1),
    limit: int = Query(15, ge=1, le=100),
    search: str | None = None,
    db: Session = Depends(get_db),
):
    service = DSAService(db)

    return service.get_all(
        page=page,
        limit=limit,
        search=search,
    )


@router.get(
    "/{entry_id}",
    response_model=DSAEntryResponse,
)
def get_dsa_entry(
    entry_id: UUID,
    db: Session = Depends(get_db),
):
    service = DSAService(db)
    return service.get_by_id(entry_id)


@router.put(
    "/{entry_id}",
    response_model=DSAEntryResponse,
)
def update_dsa_entry(
    entry_id: UUID,
    payload: DSAEntryUpdate,
    db: Session = Depends(get_db),
):
    service = DSAService(db)
    return service.update(entry_id, payload)


@router.delete("/{entry_id}")
def delete_dsa_entry(
    entry_id: UUID,
    db: Session = Depends(get_db),
):
    service = DSAService(db)
    return service.delete(entry_id)
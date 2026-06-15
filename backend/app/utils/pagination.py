from math import ceil


def build_pagination_response(
    items,
    total: int,
    page: int,
    limit: int,
):
    return {
        "items": items,
        "pagination": {
            "page": page,
            "limit": limit,
            "total_items": total,
            "total_pages": ceil(total / limit) if total > 0 else 0,
            "has_next": page * limit < total,
            "has_previous": page > 1,
        },
    }
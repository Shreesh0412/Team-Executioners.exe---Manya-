from typing import Any


def success_response(
    *,
    message: str = "Request completed successfully.",
    data: Any = None,
    meta: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """
    Standard success response for all API endpoints.
    """
    response: dict[str, Any] = {
        "success": True,
        "message": message,
        "data": data,
    }

    if meta is not None:
        response["meta"] = meta

    return response


def error_response(
    *,
    message: str = "Request failed.",
    errors: Any = None,
    status_code: int | None = None,
) -> dict[str, Any]:
    """
    Standard error response for all API endpoints.
    """
    response: dict[str, Any] = {
        "success": False,
        "message": message,
        "errors": errors,
    }

    if status_code is not None:
        response["status_code"] = status_code

    return response

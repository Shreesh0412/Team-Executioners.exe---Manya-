import re


def is_strong_password(password: str) -> bool:
    """
    Password Rules

    Minimum 8 characters

    One uppercase

    One lowercase

    One number

    One special character
    """

    pattern = (
        r"^(?=.*[a-z])"
        r"(?=.*[A-Z])"
        r"(?=.*\d)"
        r"(?=.*[@$!%*?&])"
        r"[A-Za-z\d@$!%*?&]{8,}$"
    )

    return bool(re.match(pattern, password))

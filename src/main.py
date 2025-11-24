#!/usr/bin/env python3
"""
NixLine Demo Application

This is a simple demo application to showcase how NixLine
materializes policies and generates SBOMs across an organization.
"""

import sys
from typing import List


def greet(name: str) -> str:
    """Generate a greeting message."""
    return f"Hello, {name}!"


def main(args: List[str]) -> int:
    """Main entry point."""
    if len(args) > 1:
        name = args[1]
    else:
        name = "NixLine"

    print(greet(name))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))

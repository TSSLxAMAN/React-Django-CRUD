#!/bin/bash
echo "Running makemigrations..."
python backend/manage.py makemigrations

echo "Running migrate..."
python backend/manage.py migrate

echo "Starting Django server..."
python backend/manage.py runserver 0.0.0.0:8000
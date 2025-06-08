FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1

ENV PYTHONUNBUFFERED=1

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

COPY start.sh .

RUN chmod +x start.sh

EXPOSE 8000

CMD ["./start.sh"]
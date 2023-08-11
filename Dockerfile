FROM node:18.16.1

LABEL org.opencontainers.image.source=https://github.com/thearyadev/CrystalQuest
LABEL org.opencontainers.image.description="Docker image for Crystal Quest"
LABEL org.opencontainers.image.licenses=MIT

RUN apt-get update && apt-get install -y python3.11 && rm -rf /var/lib/apt/lists/*
RUN curl -sSL https://install.python-poetry.org | python3 -
WORKDIR /crystalquest
COPY . .

RUN cd /crystalquest/frontend && npm install && npm run build
RUN cd /crystalquest/backend && /root/.local/bin/poetry install
RUN mv /crystalquest/frontend/dist /crystalquest/backend/
RUN mkdir -p /crystalquest/backend/crystal_quest_data/

ENTRYPOINT [ "bash", "-c", "cd /crystalquest/backend && /root/.local/bin/poetry run uvicorn main:app --host 0.0.0.0" ]

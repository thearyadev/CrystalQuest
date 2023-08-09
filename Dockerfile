FROM node:18.16.1

RUN apt-get update && apt-get install -y python3.11 && rm -rf /var/lib/apt/lists/*
RUN pip3 install poetry=1.5.1

WORKDIR /crystalquest
COPY . .

RUN cd /crystalquest/frontend && npm install && npm run build
RUN cd /crystalquest/backend && poetry install

ENTRYPOINT [ "cd", "/crystalquest/backend", "&&", "poetry", "run", "uvicorn", "main:app" ]


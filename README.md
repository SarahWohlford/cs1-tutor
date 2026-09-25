# CS1 Tutor (RPI CSCI 1100)

AI tutor shell retargeted from the FOCS math tutor for **RPI CSCI 1100 Computer Science I (Fall 2026)**.

Course site (Sphinx): https://www.cs.rpi.edu/~mushtu/CS1100/index.html

## Quick Start

### Prerequisites

Install Node.js 18+, Python 3.9+, and Git.

### Installation

```bash
git clone https://github.com/SarahWohlford/cs1-tutor.git
cd cs1-tutor

# Backend setup
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Frontend setup
cd ../frontend
npm install
```

### Configuration

Copy `backend/.env.example` to `backend/.env` and add your API key.

```bash
cd backend
cp .env.example .env
# Edit .env and add: OPENAI_API_KEY=your-key-here
```

Built-in course outline lives at `backend/data/FOCS.json` (legacy filename; currently empty pending CS1 wiring). Do not commit large course PDFs — see `.gitignore`.

### Running the Application

```bash
# Terminal 1 - Backend
cd backend
source .venv/bin/activate
uvicorn main:app --reload   # http://localhost:8000

# Terminal 2 - Frontend
cd frontend
npm run dev                 # http://localhost:5173
```

## Tech Stack

React 18 + TypeScript + Vite frontend; FastAPI + OpenAI backend.

## License

MIT License — see LICENSE.

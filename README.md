# OpenClaw Docker

OpenClaw Gateway running in Docker for stability and isolation.

## Quick Start

### 1. Setup Environment Variables

Copy the example environment file and add your API keys:

```bash
cp .env.example .env
```

Edit `.env` and add your actual API keys:
- `OPENCLAW_GATEWAY_TOKEN` - Generate with: `openssl rand -base64 48`
- `OPENROUTER_API_KEY` - Get from https://openrouter.ai/keys
- `GEMINI_API_KEY` - (Optional) Get from https://ai.google.dev/
- `OPENAI_API_KEY` - (Optional) Get from https://platform.openai.com/api-keys

### 2. Start OpenClaw

```bash
docker compose up -d
```

### 3. Access Dashboard

http://localhost:18789/?token=YOUR_TOKEN_FROM_ENV_FILE

### View Logs
```bash
docker logs openclaw-gateway -f
```

### Check Status
```bash
docker ps --filter "name=openclaw-gateway"
```

### Stop OpenClaw
```bash
docker compose stop
```

## Configuration

- **Port:** 18789
- **Default Model:** openrouter/anthropic/claude-3.7-sonnet
- **OpenRouter API Key:** Configured via environment variable
- **Ollama Support:** http://host.docker.internal:11434/v1

## Data Persistence

All data is stored in the `openclaw-data` Docker volume:
- Configuration: `openclaw.json`
- Workspace files
- Authentication profiles
- Canvas storage

## Documentation

See `OPENCLAW-DOCKER-SETUP-COMPLETE.md` for complete setup details, troubleshooting, and usage instructions.

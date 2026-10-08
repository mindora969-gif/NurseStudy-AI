# NurseStudy AI — Amazon Developer Hackathon Prototype

## What this is
A voice-first nursing study assistant with a web-based Alexa+ simulated experience.

The UI acts as a simple MCP client and calls a self-hosted MCP server over Streamable HTTP. The server exposes three study tools:
- `create_study_plan`
- `generate_quiz`
- `explain_topic`

The current responses are deterministic demo logic so the project can run without an API key. An AI model can be connected later inside the tool handlers.

## Requirements
- Node.js 20+
- npm

## Run
```bash
npm install
npm start
```

Open:
http://localhost:3000

Health check:
http://localhost:3000/health

MCP endpoint:
http://localhost:3000/mcp

## Hackathon fit
The Amazon hackathon's Alexa+ track allows a simulated Alexa+ web experience. The official FAQ says participants do not get the gated Alexa+ add-on tools and can instead demo a self-hosted MCP server through their own web front end. The rules require the submitted repository to contain the simulation source code and the demo to show it working.

This project therefore demonstrates:
1. a web-based conversational/voice study experience;
2. a self-hosted MCP server;
3. MCP `initialize`, `tools/list`/`tools/call` compatible interaction using the 2025-11-25 protocol family;
4. a clear nursing-student use case.

## Important
This is an educational study prototype, not a medical diagnostic or treatment tool.

## Next improvements
- Connect a real LLM/AI provider to the MCP tools.
- Add persistent progress tracking.
- Add quiz scoring and adaptive revision.
- Add a proper voice response/TTS layer.
- Deploy the MCP server and record a <3 minute English demo video.

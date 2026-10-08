## Product feedback

### MCP / Streamable HTTP
We used MCP to expose study actions as reusable tools and connected them from a web-based simulator. The tool-oriented model made the workflow easy to understand: the UI asks for a study goal, then calls a specific tool.

What worked well:
- Clear tool boundaries for study-plan, quiz, and explanation actions.
- Streamable HTTP is a good fit for a web-accessible agentic experience.
- The MCP model makes it easy to imagine the same tools being called by a conversational assistant.

What could be improved:
- Beginner onboarding could provide one minimal end-to-end browser example that includes both a server and a client.
- A simple visual request inspector would help new developers understand initialize, tool discovery, and tool calls.

Would we build with it again?
Yes. MCP gives the project a clean way to expose capabilities to an AI/agent layer without coupling the UI to every backend implementation.

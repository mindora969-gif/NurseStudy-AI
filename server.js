import express from "express";
import cors from "cors";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.static("public"));

function makePlan(topic, days = 7) {
  const t = topic.trim() || "Nursing";
  return [
    `7-Day ${t} Revision Plan`,
    "",
    "Day 1 — Core concepts: Read the basics and write 5 key points.",
    "Day 2 — Key terms: Make 10 flashcards and review definitions.",
    "Day 3 — Understanding: Explain the main processes in your own words.",
    "Day 4 — Practice: Attempt 10 practice questions and mark weak areas.",
    "Day 5 — Weak-topic revision: Revisit difficult concepts and make a one-page summary.",
    "Day 6 — Mock quiz: Take a 20-question self-test and review mistakes.",
    "Day 7 — Final revision: Review your summary and test yourself without notes.",
    "",
    "Study tip: Use short focused sessions and take breaks.",
    "Note: This is an educational study tool, not medical advice."
  ].join("\n");
}

function makeQuiz(topic, count = 5) {
  const t = topic.trim() || "Nursing";
  const bank = [
    `What is the best first step when starting a new ${t} topic?\nA) Memorize everything\nB) Identify the learning objectives\nC) Skip the basics\nD) Avoid practice\nAnswer: B`,
    `Which approach usually improves long-term recall of ${t}?\nA) Spaced revision\nB) One long session only\nC) Never testing yourself\nD) Reading without recall\nAnswer: A`,
    `After getting a practice question wrong in ${t}, what should you do?\nA) Ignore it\nB) Review the concept and retry later\nC) Delete your notes\nD) Stop studying\nAnswer: B`,
    `Which is a useful revision activity for ${t}?\nA) Explaining the concept aloud\nB) Copying the same sentence repeatedly\nC) Skipping difficult areas\nD) Studying only the night before\nAnswer: A`,
    `What should a good ${t} study plan include?\nA) Only difficult topics\nB) Clear goals, practice, and revision\nC) No breaks\nD) No self-testing\nAnswer: B`
  ];
  return bank.slice(0, Math.min(count, bank.length)).join("\n\n");
}

function makeServer() {
  const server = new McpServer(
    { name: "nursestudy-ai", version: "1.0.0" }
  );

  server.registerTool(
    "create_study_plan",
    {
      title: "Create Nursing Study Plan",
      description: "Create a structured revision plan for a nursing student.",
      inputSchema: z.object({
        topic: z.string().min(1).describe("Topic the student wants to study"),
        days: z.number().int().min(1).max(14).optional()
      })
    },
    async ({ topic, days = 7 }) => ({
      content: [{ type: "text", text: makePlan(topic, days) }]
    })
  );

  server.registerTool(
    "generate_quiz",
    {
      title: "Generate Practice Quiz",
      description: "Generate a short educational practice quiz for a nursing topic.",
      inputSchema: z.object({
        topic: z.string().min(1),
        count: z.number().int().min(1).max(5).optional()
      })
    },
    async ({ topic, count = 5 }) => ({
      content: [{ type: "text", text: makeQuiz(topic, count) }]
    })
  );

  server.registerTool(
    "explain_topic",
    {
      title: "Explain a Topic Simply",
      description: "Give a concise beginner-friendly explanation of a study topic.",
      inputSchema: z.object({ topic: z.string().min(1) })
    },
    async ({ topic }) => ({
      content: [{
        type: "text",
        text: `Simple explanation for ${topic}:\n\nStart with the definition, then learn the main purpose, key terms, common examples, and finally test yourself. For exam preparation, connect the concept to your class notes and textbook.`
      }]
    })
  );

  return server;
}

// Stateless Streamable HTTP endpoint. The browser simulator calls this endpoint
// using the MCP initialize -> tools/list -> tools/call flow.
app.post("/mcp", async (req, res) => {
  const server = makeServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined
  });
  res.on("close", () => {
    transport.close().catch(() => {});
    server.close().catch(() => {});
  });
  try {
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error("MCP error:", error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: { code: -32603, message: "Internal server error" },
        id: null
      });
    }
  }
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, project: "NurseStudy AI", mcp: "/mcp" });
});

app.listen(PORT, () => {
  console.log(`NurseStudy AI running at http://localhost:${PORT}`);
  console.log(`MCP endpoint: http://localhost:${PORT}/mcp`);
});

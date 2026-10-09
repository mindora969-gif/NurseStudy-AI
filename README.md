# 🩺 NurseStudy AI

### Voice-first AI study assistant for nursing students

NurseStudy AI is a voice-first web study assistant designed to help nursing students learn, revise, practice, and understand topics through a simple conversational experience.

## 🚀 Live Demo

https://nursestudy-ai-k5gw.onrender.com

## ✨ Features

- 🎤 Voice input for study topics
- 🔊 Voice output for assistant responses
- 📚 7-day personalized study plan generation
- 🧠 Quiz generation for practice
- 💡 Simple topic explanations
- 🛠️ MCP-powered tool interaction
- 🌐 Deployed web application
- 📱 Mobile-friendly interface

## 🛠️ MCP Tools

The application exposes three study tools:

### `create_study_plan`
Creates a structured 7-day study plan for a nursing topic.

### `generate_quiz`
Generates practice questions based on the selected topic.

### `explain_topic`
Explains a nursing topic in simple and easy-to-understand language.

## 🔄 How It Works

```text
Student
   ↓
Voice or Text Input
   ↓
NurseStudy AI Web App
   ↓
MCP Tool Call
   ↓
Study Tool
   ↓
Learning Result
   ↓
Text + Voice Response
🧩 Technology
HTML / CSS / JavaScript
Node.js
Express
Model Context Protocol (MCP)
Streamable HTTP
MCP Client / Server architecture
Browser Speech Recognition
Browser Speech Synthesis
Render deployment
🎯 Problem
Nursing students often need quick explanations, structured revision plans, and practice questions while studying.
NurseStudy AI combines these common study needs into one simple voice-first learning experience.
💡 Hackathon Value
This project demonstrates how MCP can connect a conversational web interface with specialized study tools.
Instead of building one large monolithic assistant, separate MCP tools handle:
Study planning
Quiz generation
Topic explanation
This makes the system modular and easy to extend.
🎤 Voice-first Experience
Students can speak a topic such as:
"Human heart"
The application converts the voice into text, sends the request to the appropriate study tool, and can read the result back using speech synthesis.
🔮 Future Improvements
Connect an advanced LLM/AI provider
Student progress tracking
Adaptive quizzes
Spaced-repetition revision
Personalized learning history
More nursing-specific study tools
⚠️ Disclaimer
NurseStudy AI is an educational study prototype for nursing students.
It is not a medical diagnostic or treatment tool.

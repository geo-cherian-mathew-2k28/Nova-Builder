<div align="center">

🚀 Nova Builder

The Zero-Cost, Production-Grade AI App Generator

<p>
<b>Nova Builder</b> is an open-source AI platform that turns text prompts into production-ready React applications instantly.

Designed for developers who want the power of tools like <i>Lovable.dev</i> or <i>v0.dev</i> entirely offline and free.

</p>

View Demo • Report Bug • Request Feature

</div>

✨ Features

💸 100% Free & Local: Runs entirely on your machine using Ollama (No API keys required).

⚡ Instant Live Preview: Uses Sandpack to render generated code in real-time inside the browser.

🎨 Modern UI/UX: Glassmorphism design with responsive sidebars and dark mode.

🧠 Smart Context: Powered by Qwen 2.5 Coder, a state-of-the-art open source model optimized for React & Tailwind.

🛠️ Production Ready: Generates clean code with Tailwind CSS, lucide-react icons, and responsive layouts.

🏗️ Architecture

<div align="center">
<table border="1" cellspacing="0" cellpadding="10" width="90%">
<thead>
<tr style="background-color: https://www.google.com/search?q=%2324292e; color: white;">
<th align="left">Component</th>
<th align="left">Tech Stack</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><b>Frontend</b></td>
<td>React + Vite</td>
<td>Modern UI with chat interface and live preview window.</td>
</tr>
<tr>
<td><b>Backend</b></td>
<td>Python FastAPI</td>
<td>Middleware that handles prompts and connects to the local LLM.</td>
</tr>
<tr>
<td><b>AI Model</b></td>
<td>Ollama</td>
<td>Runs <b>Qwen 2.5 Coder</b> locally to generate code.</td>
</tr>
<tr>
<td><b>Rendering</b></td>
<td>Sandpack</td>
<td>Securely renders the React code in the browser.</td>
</tr>
</tbody>
</table>
</div>

🚀 Getting Started

Follow these simple steps to set up the project locally.

Prerequisites

Node.js (v18 or higher)

Python (v3.10 or higher)

Ollama (Installed and running)

1. Install the AI Model

          Open your terminal and pull the coding model.
          Use 7b for quality or 1.5b for speed on older laptops.

          ollama run qwen2.5-coder:7b


2. Setup Backend

Open a terminal in the root folder (my-ai-platform/):

    # Install Python dependencies
    pip install fastapi uvicorn ollama

    # Start the Backend Server
    uvicorn backend:app --reload


  Server will run at: http://127.0.0.1:8000

3. Setup Frontend

Open a new terminal in the root folder:

    cd frontend

    # Install Node dependencies
    npm install

    # Start the Frontend
    npm run dev


  App will run at: http://localhost:5173

📸 Usage Guide

Start both servers (Backend terminal & Frontend terminal).

Open your browser to http://localhost:5173.

In the sidebar, type a prompt:

"Create a futuristic crypto dashboard with a glassmorphism sidebar and live price cards."

Click Generate UI.

Watch the AI write the code and render it instantly in the right-hand preview panel.

🔧 Troubleshooting

1. "Timeout" Error or Infinite Loading?

The AI model might be too heavy for your CPU.

Fix: Switch to the 1.5B model. Run ollama run qwen2.5-coder:1.5b and update the model name in backend.py.

2. Backend "Module Not Found"?

Ensure you are running uvicorn backend:app from the root folder, not inside /frontend.

3. "Ollama connection refused"?

Make sure the Ollama app is running in the background (check your system tray).

🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

<div align="center">
<p>Made with ❤️ by <a href="https://github.com/YourUsername">Geo Cherian Mathew</a></p>
</div>

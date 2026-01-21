# Resumetrix 🚀

**Resumetrix** is an advanced AI-powered resume analyzer designed to help job seekers bridge the gap between their experience and Applicant Tracking Systems (ATS). By leveraging LLMs, it provides deep insights, scoring, and actionable feedback tailored to specific job descriptions.

## ✨ Features

* **ATS Scoring:** Get a realistic score of how well your resume performs against automated filters.
* **Job Description Matching:** Upload a job description to receive tailored advice on keywords and skill gaps.
* **Detailed Analytics:** Breakdown of scores across Content, Structure, Tone & Style, and Skills.
* **AI Guardrails:** Built-in detection to ensure only resume files are analyzed.
* **Clean UI:** A modern, responsive dashboard built with React and Tailwind CSS.

## 🛠️ Tech Stack

* **Framework:** [React Router v7](https://reactrouter.com/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **AI Engine:** anthropic/claude-opus-4-5
* **Hosting:** [Vercel](https://vercel.com/)

## 🧠 Powered by Puter.js

Resumetrix leverages **Puter.js**, an open-source cloud operating system, to provide a seamless serverless experience. This integration allows the app to:

* **Free AI Integration:** Access powerful LLMs directly from the frontend without exposing private API keys.
* **Zero-Config Backend:** No need for Node.js/Express servers; Puter handles the heavy lifting in the cloud.
* **User-Pays Model:** Scalability is built-in. Users cover their own AI usage through their Puter account, making the app 100% free to host and scale for the developer.
* **Persistent Storage:** User resumes and analysis history are stored securely in Puter's cloud filesystem (`puter.fs`).

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18.0.0 or higher)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Mystic-SAM/Resumetrix.git
cd Resumetrix

```


2. **Install dependencies:**
```bash
npm install

```


3. **Run the development server:**
```bash
npm run dev

```

---


## 🌐 Deployment

This project is optimized for **Vercel**.

1. Push your changes to GitHub.
2. Connect your repo to Vercel.
3. The `vercel.json` file handles the client-side routing fallback automatically.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

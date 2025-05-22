# ♛ N-Queens Visualizer

A visual representation of the classic **N-Queens problem** built using vanilla JavaScript, HTML, and CSS. This tool lets you visualize how queens are placed on an `N x N` chessboard such that no two queens threaten each other, with interactive controls for board size, speed, and step-by-step tracing.

---

## 🔗 Demo

> [(Deployed on Vercel)](https://n-queen-visualizer-delta.vercel.app/)

---

## 🚀 Features

* 🎯 **Board Size Selector** (4–15)
* 🐢 **Adjustable Speed Slider** for visualization delay
* ⏯️ **Start**, **Pause**, **Resume**, and **Reset** controls
* 📈 **Live step counter** and **solution counter**
* 📦 **Multiple solutions preview**
* 💡 **Backtracking algorithm** implementation

---

## 🧠 Tech Stack

* **HTML/CSS** – UI and layout
* **JavaScript (ES6+)** – Logic and DOM manipulation

---

## 🧩 Controls

| Control        | Description                                |
| -------------- | ------------------------------------------ |
| **Board Size** | Input a number from 4 to 15                |
| **Speed**      | Slide to increase/decrease animation speed |
| **Start**      | Begin solving the N-Queens problem         |
| **Pause**      | Temporarily halt the algorithm             |
| **Resume**     | Continue from where it was paused          |
| **Reset**      | Clear the board and all solutions          |

---

## 🧮 Algorithm

The visualizer uses a **backtracking** algorithm:

* Places one queen per row.
* Checks for safe positions using row, column, and diagonal checks.
* Visual feedback is shown for each validation step.

---

## 📚 Learnings

* DOM manipulation with dynamic elements
* Handling async/await and delays
* State management (pause/resume/reset)
* Visualizing backtracking algorithms

---

## 🧑‍💻 Author

**Akshat Shukla**
[GitHub](https://github.com/akshatshukla03) | [LinkedIn](https://linkedin.com/in/akshatshukla03)

---

## 📄 License

MIT License – feel free to use and modify!

---

Let me know if you'd like this customized further (e.g., to match a GitHub repository URL or add deployment instructions).

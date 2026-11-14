

const items = [
  {
    q: "Which organelle is the main site of ATP production?",
    o: ["Golgi apparatus", "Mitochondrion", "Lysosome", "Ribosome"],
    a: 1,
    e: "Mitochondria generate most ATP during aerobic respiration."
  },
  {
    q: "Which tissue lines body surfaces and cavities?",
    o: ["Epithelial", "Muscle", "Nervous", "Connective"],
    a: 0,
    e: "Epithelial tissue covers surfaces and lines cavities."
  },
  {
    q: "What is the main purpose of hand hygiene?",
    o: [
      "Improve comfort",
      "Reduce microorganism transmission",
      "Replace PPE",
      "Sterilise the room"
    ],
    a: 1,
    e: "Hand hygiene helps prevent infection transmission."
  },
  {
    q: "What does homeostasis mean?",
    o: [
      "Blood formation",
      "Stable internal environment",
      "Digestion",
      "Respiration"
    ],
    a: 1,
    e: "Homeostasis maintains a relatively stable internal environment."
  }
];

const root = document.getElementById("quizbox");

if (root) {
  root.innerHTML = items.map((x, i) => `
    <div class="question">
      <b>${i + 1}. ${x.q}</b>
      ${x.o.map((v, j) => `
        <label>
          <input type="radio" name="lq${i}" value="${j}">
          ${v}
        </label>
      `).join("")}
      <div id="lf${i}" class="feedback"></div>
    </div>
  `).join("") + `
    <button class="btn" id="gradeLibrary">
      Check Answers
    </button>
    <p id="lscore"></p>
  `;

  document.getElementById("gradeLibrary").onclick = () => {
    let score = 0;

    items.forEach((x, i) => {
      const selected = document.querySelector(
        'input[name="lq' + i + '"]:checked'
      );

      const feedback = document.getElementById("lf" + i);

      if (selected && Number(selected.value) === x.a) {
        score++;
        feedback.textContent = "Correct! " + x.e;
        feedback.style.color = "green";
      } else {
        feedback.textContent = "Review: " + x.e;
        feedback.style.color = "red";
      }
    });

    document.getElementById("lscore").textContent =
      "Your Score: " + score + "/" + items.length;
  };
}

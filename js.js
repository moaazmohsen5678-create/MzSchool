// ====================================================
// 1️⃣ Save selected language
// ====================================================
document.querySelectorAll('.language-list a').forEach(link => {
  link.addEventListener('click', function () {
    const href = this.getAttribute('href');
    const lang = href.replace('.html', '');
    localStorage.setItem('selectedLanguage', lang);
  });
});

// ====================================================
// 2️⃣ Dynamic Quiz System
// ====================================================
window.addEventListener('DOMContentLoaded', () => {
  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const levelText = document.getElementById('level-text');
  const levelBar = document.getElementById('level-bar');

  if (!questionEl || !optionsEl) return;

  const langMap = {
    "html": "HTML",
    "css": "CSS",
    "javascript": "JavaScript",
    "python": "Python",
    "c++": "C++",
    "java": "Java",
    "swift": "Swift",
    "php": "PHP",
    "kotlin": "Kotlin",
    "ruby": "Ruby"
  };

  const selectedLang = localStorage.getItem('selectedLanguage');
  const lang = langMap[selectedLang];

  if (!lang) {
    questionEl.textContent = "Please select a language first!";
    return;
  }

  // ====================================================
  // Quiz Data (10 Questions per Language)
  // ====================================================
  const quizData = {
"HTML": [
  { q: "Which tag defines a paragraph?", a: ["&lt;p&gt;", "&lt;div&gt;", "&lt;span&gt;", "&lt;h1&gt;"], c: 0 },
  { q: "Which tag creates a link?", a: ["&lt;a&gt;", "&lt;link&gt;", "&lt;href&gt;", "&lt;nav&gt;"], c: 0 },
  { q: "Which attribute specifies an image source?", a: ["src", "href", "alt", "title"], c: 0 },
  { q: "Which tag defines a list item?", a: ["&lt;li&gt;", "&lt;ul&gt;", "&lt;ol&gt;", "&lt;list&gt;"], c: 0 },
  { q: "Which tag is used for table rows?", a: ["&lt;tr&gt;", "&lt;td&gt;", "&lt;th&gt;", "&lt;row&gt;"], c: 0 },
  { q: "Which element defines metadata?", a: ["&lt;meta&gt;", "&lt;info&gt;", "&lt;data&gt;", "&lt;script&gt;"], c: 0 },
  { q: "Which element plays audio?", a: ["&lt;audio&gt;", "&lt;music&gt;", "&lt;sound&gt;", "&lt;play&gt;"], c: 0 },
  { q: "Which tag defines an unordered list?", a: ["&lt;ul&gt;", "&lt;ol&gt;", "&lt;li&gt;", "&lt;list&gt;"], c: 0 },
  { q: "Which tag defines bold text?", a: ["&lt;b&gt;", "&lt;strong&gt;", "&lt;em&gt;", "&lt;bold&gt;"], c: 0 },
  { q: "Which tag defines the document body?", a: ["&lt;body&gt;", "&lt;main&gt;", "&lt;div&gt;", "&lt;html&gt;"], c: 0 }
],
"CSS": [
  { q: "Which property changes text color?", a: ["color", "font-color", "text-color", "background"], c: 0 },
  { q: "Which property sets the background color?", a: ["background-color", "bgcolor", "color", "background"], c: 0 },
  { q: "Which property changes the text size?", a: ["font-size", "text-size", "size", "font"], c: 0 },
  { q: "Which property makes text bold?", a: ["font-weight", "text-bold", "font-style", "weight"], c: 0 },
  { q: "Which property adds space inside an element?", a: ["padding", "margin", "border", "space"], c: 0 },
  { q: "Which property adds space outside an element?", a: ["margin", "padding", "border", "outline"], c: 0 },
  { q: "Which property sets the width of an element?", a: ["width", "size", "max-width", "length"], c: 0 },
  { q: "Which property sets the height of an element?", a: ["height", "size", "max-height", "length"], c: 0 },
  { q: "Which property changes the font type?", a: ["font-family", "font-type", "font-style", "text-font"], c: 0 },
  { q: "Which property underlines text?", a: ["text-decoration", "font-style", "text-line", "underline"], c: 0 }
],
"JavaScript": [
  { q: "How do you declare a variable?", a: ["let x = 5;", "int x = 5;", "var x;", "x := 5;"], c: 0 },
  { q: "Which keyword defines a constant?", a: ["const", "var", "let", "constant"], c: 0 },
  { q: "Which function prints to console?", a: ["console.log()", "print()", "echo()", "write()"], c: 0 },
  { q: "Which operator checks equality?", a: ["===", "=", "==", "!="], c: 0 },
  { q: "Which symbol starts a comment?", a: ["//", "#", "/*", "<!--"], c: 0 },
  { q: "Which keyword creates a loop?", a: ["for", "repeat", "loop", "iterate"], c: 0 },
  { q: "Which object represents the document?", a: ["document", "window", "page", "screen"], c: 0 },
  { q: "Which function runs after a delay?", a: ["setTimeout()", "delay()", "after()", "wait()"], c: 0 },
  { q: "Which function parses JSON?", a: ["JSON.parse()", "parseJSON()", "toJSON()", "readJSON()"], c: 0 },
  { q: "Which function converts a value to string?", a: ["toString()", "string()", "convert()", "cast()"], c: 0 }
],
"Python": [
  { q: "Which function prints text?", a: ["print()", "echo()", "console.log()", "say()"], c: 0 },
  { q: "Which keyword defines a function?", a: ["def", "function", "fun", "lambda"], c: 0 },
  { q: "Which symbol starts a comment?", a: ["#", "//", "/*", "--"], c: 0 },
  { q: "Which type stores decimals?", a: ["float", "int", "decimal", "double"], c: 0 },
  { q: "Which keyword handles exceptions?", a: ["try", "except", "catch", "error"], c: 1 },
  { q: "Which function reads input?", a: ["input()", "read()", "scanf()", "get()"], c: 0 },
  { q: "Which keyword creates a loop?", a: ["for", "loop", "repeat", "iterate"], c: 0 },
  { q: "Which library handles math?", a: ["math", "numpy", "pandas", "calc"], c: 0 },
  { q: "Which keyword imports modules?", a: ["import", "include", "require", "use"], c: 0 },
  { q: "Which keyword defines a class?", a: ["class", "define", "type", "object"], c: 0 }
],

"C++": [
  { q: "Which symbol ends a statement?", a: [";", ":", ".", ","], c: 0 },
  { q: "Which keyword defines a variable?", a: ["int", "var", "define", "num"], c: 0 },
  { q: "Which function prints to console?", a: ["cout <<", "print()", "echo()", "display()"], c: 0 },
  { q: "Which header is used for input/output?", a: ["#include <iostream>", "#include <stdio>", "#include <output>", "#include <cinout>"], c: 0 },
  { q: "Which keyword creates a loop?", a: ["for", "loop", "repeat", "iterate"], c: 0 },
  { q: "Which operator compares equality?", a: ["==", "=", "===", "!"], c: 0 },
  { q: "Which keyword defines a class?", a: ["class", "define", "type", "object"], c: 0 },
  { q: "Which symbol is used for comments?", a: ["//", "#", "/*", "--"], c: 0 },
  { q: "Which function returns a value?", a: ["return", "output", "yield", "give"], c: 0 },
  { q: "Which keyword includes a library?", a: ["#include", "import", "use", "require"], c: 0 }
],

"Java": [
  { q: "Which keyword defines a class?", a: ["class", "define", "type", "object"], c: 0 },
  { q: "Which method runs first in a program?", a: ["main()", "start()", "init()", "run()"], c: 0 },
  { q: "Which keyword creates an object?", a: ["new", "create", "object", "init"], c: 0 },
  { q: "Which keyword defines a variable?", a: ["int", "num", "define", "var"], c: 0 },
  { q: "Which keyword handles exceptions?", a: ["try", "catch", "error", "throw"], c: 1 },
  { q: "Which keyword prevents inheritance?", a: ["final", "sealed", "private", "static"], c: 0 },
  { q: "Which keyword imports packages?", a: ["import", "include", "use", "load"], c: 0 },
  { q: "Which symbol is used for comments?", a: ["//", "#", "/*", "--"], c: 0 },
  { q: "Which keyword defines constants?", a: ["final", "const", "static", "constant"], c: 0 },
  { q: "Which function prints output?", a: ["System.out.println()", "echo()", "print()", "log()"], c: 0 }
],

"Swift": [
  { q: "Which keyword defines a variable?", a: ["var", "let", "define", "int"], c: 0 },
  { q: "Which keyword defines a constant?", a: ["let", "const", "static", "final"], c: 0 },
  { q: "Which function prints text?", a: ["print()", "echo()", "say()", "display()"], c: 0 },
  { q: "Which symbol starts a comment?", a: ["//", "#", "/*", "--"], c: 0 },
  { q: "Which keyword defines a class?", a: ["class", "type", "object", "define"], c: 0 },
  { q: "Which keyword defines a function?", a: ["func", "def", "function", "method"], c: 0 },
  { q: "Which operator checks equality?", a: ["==", "=", "===", "!="], c: 0 },
  { q: "Which keyword creates a loop?", a: ["for", "loop", "repeat", "iterate"], c: 0 },
  { q: "Which function converts a string to integer?", a: ["Int()", "parseInt()", "toInt()", "convert()"], c: 0 },
  { q: "Which keyword handles errors?", a: ["try", "catch", "throw", "except"], c: 0 }
],

"PHP": [
  { q: "Which symbol starts PHP code?", a: ["<?php", "<php>", "<?", "<!php"], c: 0 },
  { q: "Which function prints output?", a: ["echo", "print", "write", "display"], c: 0 },
  { q: "Which symbol starts a variable?", a: ["$", "@", "#", "%"], c: 0 },
  { q: "Which keyword defines a function?", a: ["function", "def", "fun", "create"], c: 0 },
  { q: "Which keyword handles exceptions?", a: ["try", "catch", "error", "throw"], c: 0 },
  { q: "Which function connects to a database?", a: ["mysqli_connect()", "connect_db()", "db_open()", "sql_connect()"], c: 0 },
  { q: "Which function includes files?", a: ["include()", "require()", "import()", "load()"], c: 0 },
  { q: "Which keyword creates a loop?", a: ["for", "loop", "repeat", "iterate"], c: 0 },
  { q: "Which function returns the length of a string?", a: ["strlen()", "count()", "len()", "length()"], c: 0 },
  { q: "Which symbol ends PHP statements?", a: [";", ":", ".", ","], c: 0 }
],

"Kotlin": [
  { q: "Which keyword defines a variable?", a: ["var", "let", "define", "int"], c: 0 },
  { q: "Which keyword defines a constant?", a: ["val", "let", "const", "final"], c: 0 },
  { q: "Which function prints output?", a: ["println()", "echo()", "print()", "log()"], c: 0 },
  { q: "Which symbol starts a comment?", a: ["//", "#", "/*", "--"], c: 0 },
  { q: "Which keyword defines a class?", a: ["class", "object", "type", "define"], c: 0 },
  { q: "Which keyword creates a loop?", a: ["for", "loop", "repeat", "iterate"], c: 0 },
  { q: "Which function reads input?", a: ["readLine()", "input()", "scan()", "get()"], c: 0 },
  { q: "Which keyword handles exceptions?", a: ["try", "catch", "throw", "error"], c: 0 },
  { q: "Which keyword defines functions?", a: ["fun", "def", "function", "method"], c: 0 },
  { q: "Which keyword defines inheritance?", a: ["extends", "inherits", "open", "super"], c: 2 }
],

"Ruby": [
  { q: "Which keyword defines a function?", a: ["def", "function", "fun", "method"], c: 0 },
  { q: "Which function prints output?", a: ["puts", "print", "echo", "say"], c: 0 },
  { q: "Which symbol starts a comment?", a: ["#", "//", "/*", "--"], c: 0 },
  { q: "Which keyword defines a class?", a: ["class", "define", "object", "type"], c: 0 },
  { q: "Which keyword creates a loop?", a: ["for", "loop", "repeat", "each"], c: 3 },
  { q: "Which function reads input?", a: ["gets", "read", "input", "scan"], c: 0 },
  { q: "Which keyword handles exceptions?", a: ["begin", "try", "catch", "error"], c: 0 },
  { q: "Which keyword defines constants?", a: ["const", "final", "upcase", "none"], c: 0 },
  { q: "Which method converts string to integer?", a: ["to_i", "to_int", "int()", "convert()"], c: 0 },
  { q: "Which function prints without newline?", a: ["print", "puts", "echo", "write"], c: 0 }
]

  };

  let score = parseInt(localStorage.getItem(`score_${lang}`) || "0");

  // ====================================================
  // Update Progress
  // ====================================================
  function updateProgress() {
    let percent = score;
    if (percent >= 10) {
      percent = 10;
      score = 0;
      localStorage.setItem(`score_${lang}`, score);
      setTimeout(() => alert(`${lang} level complete! Restarting...`), 200);
    }
    const displayWidth = percent * 10; // move full bar when 10%
    levelText.textContent = `Your Level: ${percent}%`;
    levelBar.style.width = `${displayWidth}%`;
  }

  updateProgress();

  // ====================================================
  // Show Question
  // ====================================================
  function showQuestion() {
    const questions = quizData[lang];
    const q = questions[Math.floor(Math.random() * questions.length)];

    questionEl.textContent = q.q;
    optionsEl.innerHTML = q.a.map((opt, i) => `
      <button class="option-btn" data-index="${i}">${opt}</button>
    `).join('');

    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.onclick = () => {
        const chosen = parseInt(btn.dataset.index);
        const correct = chosen === q.c;
        btn.style.backgroundColor = correct ? "#27ae60" : "#e74c3c";

        if (correct) {
          score++;
          localStorage.setItem(`score_${lang}`, score);
          updateProgress();
        }

        setTimeout(showQuestion, 800);
      };
    });
  }

  showQuestion();
});

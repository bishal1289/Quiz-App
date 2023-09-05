// let obj = [
//   {
//     question: "What is capital Of Nepal",

//     A: "Kathmandu",
//     B: "Rajbiraj",
//     C: "Saptari",
//     D: "German",

//     answer: "A",
//   },
//   {
//     question: "What is capital Of India",

//     A: "Kathmandu",
//     B: "Doha",
//     C: "Delhi",
//     D: "Thimpu",

//     answer: "C",
//   },
//   {
//     question: "What is capital Of Pakistan",

//     A: "Kathmandu",
//     B: "Delhi",
//     C: "Thimpu",
//     D: "Islamabad",

//     answer: "D",
//   },
// ];

let obj = [];
let quiz = document.querySelector("#quiz");
let question = document.querySelector("#question");
let op1 = document.querySelector("#a_text");
let op2 = document.querySelector("#b_text");
let op3 = document.querySelector("#c_text");
let op4 = document.querySelector("#d_text");
let nextBtn = document.querySelector("#next");
let submitBtn = document.querySelector("#submit");
let ansElements = document.querySelectorAll(".answer");
let startBtn = document.querySelector("#start");
let ansBox = document.querySelector('#ansBox');

let score = 0;
let questionCount = 0;

const deselectAnswers = () => {
  ansElements.forEach((option) => (option.checked = false));
};

function selected() {
  let correctAns;
  ansElements.forEach((ele) => {
    if (ele.checked) {
      correctAns = ele.id;
    }
  });
  return correctAns;
}

function fetchData() {
  fetch("./question.json")
    .then((res) => {
      return res.json();
    })
    .then((Data) => {
      obj = Data;
      loadQuestion();
      console.log(obj);
      
    });
}

fetchData();

function loadQuestion() {
  question.innerHTML = obj[questionCount].question;
  op1.innerHTML = obj[questionCount].A;
  op2.innerHTML = obj[questionCount].B;
  op3.innerHTML = obj[questionCount].C;
  op4.innerHTML = obj[questionCount].D;
}

//loadQuestion();
let flag = true;
submitBtn.addEventListener("click", function () {
  let correctAns = selected();;
  
  if (correctAns === obj[questionCount].answer) {
    if (flag != false) {
      score++;
      flag = false;
    }
    
    ansBox.innerHTML = `
            <h3>Correct</h3>
            `;
    ansBox.style.backgroundColor = 'rgb(173, 242, 120)';
  }
  else {
    ansBox.innerHTML = `
            <h3>Incorrect</h3>
            `;
    ansBox.style.backgroundColor = 'rgb(220, 88, 88)';
  }
  

});

nextBtn.addEventListener('click', function () {
  flag = true;
  questionCount++;
  ansBox.innerHTML = "";
  ansBox.style.backgroundColor = "white";

  if (questionCount < obj.length) {
    loadQuestion();
    deselectAnswers();
  } else {
    quiz.innerHTML = `
            <h2>You answered ${score}/${obj.length} questions correctly</h2>
            <button onclick= "location.reload()">Play Again</button>
            `;
  }
})



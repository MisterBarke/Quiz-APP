
/* async function logQuiz() {
    const response = await fetch("https://opentdb.com/api.php?amount=50&category=31&difficulty=medium&type=multiple");
    const quiz = await response.json();
    console.log(quiz);
}
logQuiz() */



const start = document.querySelector('.start');
const menu = document.querySelector('.reglage');
const param = document.querySelector('.param');
const categoryFilter = document.getElementById('categoryFilter')
const difficultyFilter = document.getElementById('difficultyFilter')
const amountFilter = document.getElementById('amountFilter')

/* fetch('https://opentdb.com/api_token.php?command=request').then(response =>response.json()).then((response)=>{
    console.log(response);
}) */

start.addEventListener('click', ()=>{
    localStorage.setItem('amount', amountFilter.value);
    localStorage.setItem('category', categoryFilter.value);
    localStorage.setItem('difficulty', difficultyFilter.value);
    window.location.href = 'quiz.html';
    console.log(clicked);
   if ( start.setAttribute('style', 'display: none')) {
    start.setAttribute('style', 'display: block');
   }
    })
    menu.addEventListener('click', ()=>{
        param.setAttribute('style', 'display: block');
    })

    let getAmount = localStorage.getItem('amount');
let getDifficulty = localStorage.getItem('difficulty');
let getCategory = localStorage.getItem('category');

// Vérifier si les valeurs sont définies, sinon utiliser des valeurs par défaut
if (!getAmount) {
    getAmount = 10;  // Valeur par défaut, vous pouvez utiliser une autre valeur par défaut si nécessaire
}

if (!getDifficulty) {
    getDifficulty = 'easy';  // Valeur par défaut, vous pouvez utiliser une autre valeur par défaut si nécessaire
}

if (!getCategory) {
    getCategory = 12;  // Valeur par défaut, vous pouvez utiliser une autre valeur par défaut si nécessaire
}


let url = `https://opentdb.com/api.php?amount=${getAmount}&token=34d7851aa9ddcc7b6b5b9d84d7e15660212255a622ad278f3156e55f9fdbfc95&category=${getCategory}&difficulty=${getDifficulty}&type=multiple`;


let result = [];
let index = 0;
let tour = 0;
const question = document.querySelector('.question');
const answerOne = document.getElementById('answerOne');
const answerTwo = document.getElementById('answerTwo');
const answerThree = document.getElementById('answerThree');
const answerFour = document.getElementById('answerFour');
const answerBtn = document.querySelectorAll('.answerBtn');
const startOver = document.querySelector('.reprendre');
const translate = document.querySelector('.translate');
const containQuestions = document.querySelector('.contain-questions');

let score = 0;
const correctAnswerChecker = (state) => {
    state.setAttribute('style', 'background-color: green !important')
}
const incorrectAnswerChecker = (IncorrectState) => {
    IncorrectState.setAttribute('style', 'background-color: red !important');
}

document.addEventListener('DOMContentLoaded', () => {
    fetch(url)
        .then((response) => response.json())
        .then(response => {
            console.log(response);
            result = response.results;
            console.log(result);
            let answersArr = [...result[index].incorrect_answers];
            answersArr.push(result[index].correct_answer);
            console.log(answersArr);
            answersArr = shuffleArray(answersArr)
            console.log(answersArr);

            answersArr.forEach((answer, index) => {
                answerBtn[index].innerHTML = answer;
            });

            question.innerHTML = result[index].question;
            containQuestions.addEventListener('click', (e) => {
                if ((e.target.id === 'answerOne' || e.target.id === 'answerTwo'
                    || e.target.id === 'answerThree' || e.target.id === 'answerFour')
                    && (e.target.textContent) === result[index].correct_answer
                ) {
                    tour++

                    console.log(e.target.textContent);
                    const correctAnswer = document.getElementById(`${e.target.id}`);
                    correctAnswerChecker(correctAnswer)
                    score++;

                    setTimeout(() => {
                        correctAnswer.setAttribute('style', 'background-color: aliceblue !important');
                    }, 3000)

                } else {
                    tour++
                    const incorrectAnswer = document.getElementById(`${e.target.id}`);
                    incorrectAnswerChecker(incorrectAnswer);
                    incorrectAnswer.disabled = true;
                    setTimeout(() => {
                        incorrectAnswer.setAttribute('style', 'background-color: aliceblue !important');
                        incorrectAnswer.disabled = false;
                    }, 3000)
                    answerBtn.forEach(btn => {
                        if (btn.textContent === result[index].correct_answer) {
                            correctAnswerChecker(btn);
                            btn.disabled = true;
                            setTimeout(() => { 
                                btn.setAttribute('style', 'background-color: aliceblue !important');
                                btn.disabled = false;
                            }, 3000)
                        }
                    })
                };

                setTimeout(() => {
                    index++;
                    let answersArr = [...result[index].incorrect_answers];
                    answersArr.push(result[index].correct_answer);
                    answersArr = shuffleArray(answersArr)
                    answersArr.forEach((answer, index) => {
                        answerBtn[index].innerHTML = answer;
                    });

                    question.innerHTML = result[index].question;

                }, 3400)
                if (tour === result.length) {
                    question.innerHTML = `Your score is : ${score}/${result.length}`;
                   
                    
                    answerBtn.forEach(btn => {
                        btn.innerHTML = 'Check on your score boy';
                    });
                    startOver.setAttribute('style', 'display: block')
                    return
                }
               
                console.log(answersArr);
            });
            translate.addEventListener('click', () => {
                let url = `https://api.mymemory.translated.net/get?q=${question.innerHTML}!&langpair=en|fr`;
                fetch(url, {
            
                }).then(response => response.json().then(data => {
                    console.log(data);
                    if (response.ok !== true) {
                     question.textContent = 'Sorry boy! Try again.';
                       setTimeout(()=>{
                        question.innerHTML = result[index].question;
                       },2000)
                    }
                    question.innerHTML = data.responseData.translatedText
                }));

                answerBtn.forEach(btn => {
                    let url2 = `https://api.mymemory.translated.net/get?q=${btn.textContent}!&langpair=en|fr`;
                fetch(url2, {
            
                }).then(response => response.json().then(data => {
                    console.log(data);
                    if (response.ok !== true) {
                     question.textContent = 'Sorry boy! Try again.';
                       setTimeout(()=>{
                        question.innerHTML = result[index].question;
                       },2000)
                    }
                    btn.textContent = data.responseData.translatedText
                }));
                });
                
            
            })
            


        })
        .catch((error) => question.textContent = ('Error fetching data:', error = 'Probleme de connexion, actualisez svp!'));
})

startOver.addEventListener('click', () => {
    location.reload()
})
// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}



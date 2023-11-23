
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
    localStorage.setItem('amountText', amountFilter.textContent);

param.setAttribute('style', 'display: none');
window.location.reload()

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
document.addEventListener('DOMContentLoaded', () => {
    const savedDifficulty = localStorage.getItem('difficulty');
    const savedCategory = localStorage.getItem('category');
    const savedAmount = localStorage.getItem('amount');

    // Si des valeurs sont trouvées, les appliquer aux sélecteurs
    if (savedDifficulty) {
        difficultyFilter.value = savedDifficulty;
    }

    if (savedCategory) {
        categoryFilter.value = savedCategory;
    }

    if (savedAmount) {
        amountFilter.value = savedAmount;
    }
});

let url = `https://opentdb.com/api.php?amount=${getAmount}&category=${getCategory}&difficulty=${getDifficulty}&type=multiple`;


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
const cancel = document.querySelector('.cancel');

let score = 0;

document.addEventListener('DOMContentLoaded', () => {
    fetch(url)
        .then((response) => response.json())
        .then(response => {
            result = response.results;
            console.log(result);
            function updateAnswers() {
                if (result[index]) {
                    let answersArr = [...result[index].incorrect_answers];
                answersArr.push(result[index].correct_answer);
                answersArr = shuffleArray(answersArr);
        
                answersArr.forEach((answer, i) => {
                    answerBtn[i].innerHTML = answer;
                });
                question.innerHTML = result[index].question;
                }else{
                    console.log(score);
                    containQuestions.innerHTML = `Your score is : ${score}/${result.length}`;
                        startOver.style.display = 'block';
                        containQuestions.setAttribute('style', 'font-size: 30px');
                        containQuestions.setAttribute('style', 'text-align: center');
                }
                
            }
            updateAnswers()
            function handleAnswerClick(e) {
                const selectedAnswer = e.target;
        
                if (selectedAnswer.textContent === result[index].correct_answer) {
                    score++;
                    correctAnswerHandler(selectedAnswer);
                    disableAllAnswers();
                } else {
                    incorrectAnswerHandler(selectedAnswer);
                    disableAllAnswers();
                    setTimeout(()=>{
                        answerBtn.forEach(btn=>{
                            if (btn.textContent === result[index].correct_answer) {
                                correctAnswerHandler(btn);
                            }
                        })
                    })
                   // correctAnswerHandler(answerBtn.find(btn => btn.textContent === result[index].correct_answer));
                }
        
                setTimeout(() => {
                    index++;
                    console.log(index);
                    updateAnswers();
                    enableAllAnswers();
        
                    if (index < result.length) {
                        question.innerHTML = result[index].question;
                    } else {
                        containQuestions.innerHTML = `Your score is : ${score}/${result.length}`;
                        startOver.style.display = 'block';
                    }
                }, 3400);
            }
        
            function correctAnswerHandler(answerElement) {
                tour++;
                answerElement.setAttribute('style', 'background-color: green !important');

                setTimeout(() => {
                    answerElement.setAttribute('style', 'background-color: aliceblue !important');
                    
                }, 3000);
            }
        
            function incorrectAnswerHandler(answerElement) {
                tour++;
                answerElement.setAttribute('style', 'background-color: red !important');
        
                setTimeout(() => {
                    answerElement.setAttribute('style', 'background-color: aliceblue !important');
                    
                }, 3000);
            }
        
            function disableAllAnswers() {
                answerBtn.forEach(btn => {
                    btn.disabled = true;
                });
            }
      
        
            function enableAllAnswers() {
                answerBtn.forEach(btn => {
                    btn.disabled = false;
                });
            }
        
            containQuestions.addEventListener('click', (e) => {
                if (e.target.classList.contains('answerBtn')) {
                    handleAnswerClick(e);
                }
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

                /* answerBtn.forEach(btn => {
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
                }); */
                
            
            })
            


        })
        .catch((error) => question.textContent = ('Error fetching data:', error = 'Probleme de connexion, actualisez svp!'));
})

startOver.addEventListener('click', () => {
    location.reload();
})

cancel.addEventListener('click', ()=>{
    param.setAttribute('style', 'display: none');
})
// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}



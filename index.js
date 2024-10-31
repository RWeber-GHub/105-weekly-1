const prompt = require('prompt-sync')();

function RNG(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
// Below is the function that randomizes the mathematical operation
function randomOperation() {
    let opIndex = RNG(0, 3)
    switch (opIndex) {
        case 0:
            return '+'
        case 1:
            return '-'
        case 2:
            return '*'
        case 3:
            return '/'
        default:
            return '+'
    }
}
// Below is my function for the difficulty selector 
function difficultyInput(difficulty) {
    let num1, num2, operation, answer, randomProblem;

    switch (difficulty) {
        case 1: 
            num1 = RNG(0, 9);
            num2 = RNG(0, 9);
            operation = randomOperation();
            
            
            while (operation === '*' || operation === '/' || operation === '%') {
                operation = randomOperation();
            }
            break;
        case 2: 
            num1 = RNG(0, 99);
            num2 = RNG(0, 99);
            operation = randomOperation();
            
            
            if (operation === '*' || operation === '/' || operation === '%') {
                num2 = RNG(1, 9);
            }
            break;
        case 3: 
            num1 = RNG(0, 999);
            num2 = RNG(0, 99);
            operation = randomOperation();
            
            
            if (operation === '*' || operation === '/' || operation === '%') {
                num2 = RNG(1, 9);
            }
            break;
        default:
            console.log("Invalid difficulty level");
    }

    switch (operation) {
        case '+':
            answer = num1 + num2;
            randomProblem = `${num1} + ${num2} = ?`;
            break;
        case '-':
            answer = num1 - num2;
            randomProblem = `${num1} - ${num2} = ?`;
            break;
        case '*':
            answer = num1 * num2;
            randomProblem = `${num1} * ${num2} = ?`;
            break;
        case '/':
            
            num1 = num2 * RNG(1, 99); 
            answer = num1 / num2;
            randomProblem = `${num1} / ${num2} = ?`;
            break;
        case '%':
            
            answer = num1 % num2;
            randomProblem = `${num1} % ${num2} = ?`;
            break;
        default:
            randomProblem = 'Retry';
            answer = NaN;
    }

    return { randomProblem, answer };
}

//Start of the program that actually interacts with the user
let select = Number(prompt("Please select 1 for Max out or select 2 for 3 Out: "))
let score = 0
// Max score 
if (select === 1) {
    console.log("Welcome to Max score")
    let difficulty = Number(prompt("Please select a difficulty: 1 for easy, 2 for medium, 3 for hard: "));
    for (let i = 1; i <= 20; i++) {
        let { randomProblem, answer } = difficultyInput(difficulty)
        let userinput = prompt(`${randomProblem} (or type 'skip' to skip) `)

        if (userinput === "skip") {
            console.log(`You used a skip your score is now: ${score}`)
            continue
        } else {
            userinput = Number(userinput);
            if (isNaN(userinput)) {
                console.log("Invalid input. Please enter a number or 'skip'.");
        } 
            else if (userinput === answer) {
                score = score + 10
                console.log(`Correct your score is now: ${score}`)
        } 
            else {
                score = score - 5
                console.log (`Incorrect your score is now:  ${score}`)
            }
        }
    }
    console.log("Final score: " + score)
} 
// 3 out
    else if (select === 2) {
        console.log("Welcome to 3 out")
    let difficulty = Number(prompt("Please select a difficulty: 1 for easy, 2 for medium, 3 for hard: "))
    let attempts = 0

    while (attempts < 3) {
        let { randomProblem, answer } = difficultyInput(difficulty)
        let userinput = Number(prompt(`${randomProblem}: `))

        if (userinput === answer) {
            console.log("Correct")
            score= score + 10
            attempts = 0
            console.log(score)
    } 
        else {
            console.log("Wrong")
            attempts++
        }
    }
    console.log(`Game over, Your final score was ${score}`);
}       
    else {
    console.log("Please enter a valid input")
}

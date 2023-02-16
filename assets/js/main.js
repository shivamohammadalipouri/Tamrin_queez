const queez  = document.getElementById("queez");
const answer = document.getElementById("answer");
let arr = [];
let i = 0;


async function setqueez(){

    await fetch('https://opentdb.com/api.php?amount=4')
    .then((res) => res.json())
    .then((json) => {

        arr = json.results;

        function start(){

            // console.log(arr);
            queez.innerText = arr[i].question;

            let answers = arr[i].incorrect_answers;
            answers.push(arr[i].correct_answer);
            // console.log(answers);    

            for(let j=0; j<answers.length; j++){

                let optionDiv = document.createElement("div");
                optionDiv.className = "option";
                optionDiv.innerText = arr[i].incorrect_answers[j];
                answer.appendChild(optionDiv);

                optionDiv.addEventListener("click", (event) => {

                    let correct_answer = arr[i].correct_answer;
                    let user_answer    = event.target.innerText;

                    if ( correct_answer == user_answer){

                        let circle_name = "circle_"+(i+1);
                        const circle = document.getElementById(circle_name);
                        circle.style.backgroundColor = 'green';
                    }

                    else{

                        let circle_name = "circle_"+(i+1);
                        const circle = document.getElementById(circle_name);
                        circle.style.backgroundColor = 'red';
                    }
    
                });

            }
        }
        start();
    })
}

setqueez();


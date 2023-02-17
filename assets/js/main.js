const queez  = document.getElementById("queez");
const answer = document.getElementById("answer");
let arr = [];
let i = 0;


async function setqueez(){

    await fetch('https://opentdb.com/api.php?amount=4')
    .then((res) => res.json())
    .then((json) => {

        // get all queez 
        arr = json.results;

        function start(){

            // clear question option before 
            let oldOption = document.getElementsByClassName("option");
            const oldOption_size = oldOption.length;

            for(let x=0; x<oldOption_size; x++){
                
                oldOption[0].remove();
            }

            // show question 
            console.log(arr);
            queez.innerText = arr[i].question;

            // show options 
            for(let j=0; j<arr[i].incorrect_answers.length+1; j++){

                let optionDiv = document.createElement("div");
                optionDiv.className = "option";

                if(j==arr[i].incorrect_answers.length){

                    optionDiv.innerText = arr[i].correct_answer;
                    answer.appendChild(optionDiv);
                }
                else{

                    optionDiv.innerText = arr[i].incorrect_answers[j];
                    answer.appendChild(optionDiv);
                }


                // change the colrs of the circles and change the question 
                optionDiv.addEventListener("click", (event) => {

                    let correct_answer = arr[i].correct_answer;
                    let user_answer    = event.target.innerText;

                    if ( correct_answer == user_answer){

                        let number_circle = i+1;
                        let circle_name = "circle_"+number_circle;
                        const circle = document.getElementById(circle_name);
                        circle.style.backgroundColor = 'green';

                        nextLevel();
                    }
                    else{

                        let number_circle = i+1;
                        let circle_name = "circle_"+number_circle;
                        const circle = document.getElementById(circle_name);
                        circle.style.backgroundColor = 'red';

                        nextLevel();
                    }
    
                });

            }
        }
        start();

        // update to replace the question 
        function nextLevel(){

            if (i==arr.length-1){

                i=0;

                // clear the colors of the circles
                for(let y=1; y<=4; y++){

                    let circle_name = "circle_"+y;
                    const circle = document.getElementById(circle_name);
                    circle.style.backgroundColor = 'white';
                }

            }
            else{
                i=i+1;
            }
            
            start();

        }
    })
}

setqueez();
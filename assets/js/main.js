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


            // random number for options
            let arr_rand_num = [];
            while(arr_rand_num.length != arr[i].incorrect_answers.length+1){

                let rand_num = Math.floor(Math.random()*(arr[i].incorrect_answers.length+1));

                let n = arr_rand_num.filter(function search(num){

                    return num==rand_num
                });

                if(n.length){

                    continue
                }
                else{

                    arr_rand_num.push(rand_num);
                }
            }

            // show options 
            for(item of arr_rand_num){

                let optionDiv = document.createElement("div");
                optionDiv.className = "option";

                if(item == arr[i].incorrect_answers.length){

                    optionDiv.innerText = arr[i].correct_answer;
                    answer.appendChild(optionDiv);

                }

                else{

                    optionDiv.innerText = arr[i].incorrect_answers[item];
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

            const btn = document.getElementById("btn");
            btn.addEventListener("click", () =>{

                setTimeout(() => {
                    window.location.reload(true);
                },2);


                // clear the colors of the circles
                for(let y=1; y<=4; y++){

                    let circle_name = "circle_"+y;
                    const circle = document.getElementById(circle_name);
                    circle.style.backgroundColor = 'white';
                }

            });


            i=i+1;
            start();

        }
    })
}

setqueez();
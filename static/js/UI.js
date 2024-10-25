console.log("UI.js connected")
import Dice from './Dice.js';
import Gamecard from './Gamecard.js';

//-------Dice Setup--------//
let roll_button = document.getElementById('roll_button'); 
roll_button.addEventListener('click', roll_dice_handler);

let dice_elements =[];

for (let i = 0; i<5; i++){
    let die = document.getElementById("die_"+i);
    die.addEventListener('dblclick', reserve_die_handler);
    dice_elements.push(die);
}
let rolls_remaining_element = document.getElementById("rolls_remaining");

let dice = new Dice(dice_elements, rolls_remaining_element);

window.dice = dice; //useful for testing to add a reference to global window object



//-----Gamecard Setup---------//
let category_elements = Array.from(document.getElementsByClassName("category"));
console.log("category_elements", category_elements);
for (let category of category_elements){
    category.addEventListener('keypress', function(event){
        if (event.key === 'Enter') {
            enter_score_handler(event);
        }
    });
}
let score_elements = Array.from(document.getElementsByClassName("score"));
let gamecard = new Gamecard(category_elements, score_elements, dice);
window.gamecard = gamecard; //useful for testing to add a reference to global window object

//button setup 
let save_button = document.getElementById("save_game");
let load_button = document.getElementById("load_game");

save_button.addEventListener("click", save_button_handler);
load_button.addEventListener("click", load_button_handler);



//---------Event Handlers-------//
function save_button_handler(){
    let scorecard_obj = gamecard.to_object(); 
    localStorage.setItem("yahtzee", JSON.stringify(scorecard_obj));
    console.log("save button");

    if (scorecard_obj == null) {
        display_feedback("a saved game does not exist.", "bad");
    } else {
        display_feedback("yay! successfully saved game!", "good");
    }
    
}

function load_button_handler(){
    console.log("load button");
    let got_scorecard_obj = localStorage.getItem("yahtzee"); 
    gamecard.load_scorecard(JSON.parse(got_scorecard_obj));

    if (got_scorecard_obj == null) {
        display_feedback("a loaded game does not exist.", "bad");
    } else {
        display_feedback("yay! successfully loaded game!", "good");
    }
}


function reserve_die_handler(event){
    //console.log(event.target);
    //console.log(event);
    dice.reserve(event.target);
    console.log("Trying to reserve " + event.target.id);
}

function roll_dice_handler(){
    rolls_remaining_element;
    
    if (dice.get_rolls_remaining() <= 0) {
        display_feedback("out of rolls", "bad");
    } else {
        dice.roll();
        display_feedback("", "");
    }


    dice.get_rolls_remaining();
    console.log("Dice values:", dice.get_values());
    console.log("Sum of all dice:", dice.get_sum());
    console.log("Count of all dice faces:", dice.get_counts());

}

function enter_score_handler(event){
    console.log("Score entry attempted for: ", event.target.id);
    console.log("input value: ", document.getElementById(event.target.id).value/*gamecard.is_valid_score()*/);
    let value = document.getElementById(event.target.id).value; 
    if (value.trim() != ""){
        value = parseInt(document.getElementById(event.target.id).value);
    }
    let category = event.target.id.replace("_input", "");
    console.log("gamecard", gamecard.is_valid_score(category, value));
    console.log("updated scorecard", gamecard.update_scores());
    console.log("grand_total", gamecard.get_score());
    console.log("score_info", gamecard.load_scorecard());
    console.log("scorecard_obj", gamecard.to_object());
    gamecard.is_valid_score(category, value);
    gamecard.load_scorecard();
    
    if (gamecard.is_valid_score(category, value) == true) {
        display_feedback("yay! valid score!", "good");
        dice.reset();
        gamecard.update_scores();
        //document.getElementById(event.target.id).disabled = true; 
    } else {
        display_feedback("unvalid score", "bad");
        //document.getElementById(event.target.id).disabled = false; 
    }

    if (gamecard.is_finished() == true) {
        display_feedback("yay! game is finished!", "good");
        dice.reset();
    } 
    
}

//------Feedback ---------//
function display_feedback(message, context){
    console.log(context, "Feedback: ", message);
    let feedback_el = document.getElementById("feedback"); 
    
    if (context == "good") {
        feedback_el.className = '';
        feedback_el.classList.add("good");
        feedback_el.classList.remove("bad");
        feedback_el.textContent = message;
    } 
    if (context == "bad") {
        feedback_el.className = '';
        feedback_el.classList.add("bad");
        feedback_el.classList.remove("good");
        feedback_el.textContent = message;
    } 
    if (context == "") {
        feedback_el.className = '';
        feedback_el.classList.remove("good");
        feedback_el.classList.remove("bad");
        feedback_el.textContent = message;
    }

}

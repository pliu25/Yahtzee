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




//---------Event Handlers-------//
function reserve_die_handler(event){
    //console.log(event.target);
    //console.log(event);
    dice.reserve(event.target);
    console.log("Trying to reserve "+event.target.id);
}

function roll_dice_handler(){
    rolls_remaining_element;
    display_feedback("Rolling the dice...", "good");
    dice.roll();
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
    console.log("upper_sum, lower_sum, bonus", gamecard.update_scores());
    console.log("grand_total", gamecard.get_score());
    console.log("score_info", gamecard.load_scorecard());
    gamecard.is_valid_score(category, value);
    gamecard.load_scorecard();
    //totals
    //document.getElementById("upper_total").innerText = gamecard.update_scores().upper_sum + gamecard.update_scores().bonus; 
}

//------Feedback ---------//
function display_feedback(message, context){
    console.log(context, "Feedback: ", message);

}
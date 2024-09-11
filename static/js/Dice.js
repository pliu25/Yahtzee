console.log("Dice.js connected")
class Dice{
    constructor(dice_elements, rolls_remaining_element, /*roll_button*/){
        this.rolls_remaining_element= rolls_remaining_element;
        this.dice_elements= dice_elements;
        //this.roll_button = roll.button;
        this.photo_names=["blank", "one", "two", "three", "four", "five", "six"]
    }

    /**
     * Returns the number of rolls remaining for a turn
     * @return {Number} an integer representing the number of rolls remaining for a turn
    */
    get_rolls_remaining(){
        var count = 3; 

        this.roll_button.addEventListener('click',function() {
            count--;
        });
        return count; 
    }

    /**
     * Returns an array of integers representing a current view of all five Yahtzee dice_elements
     * <br> A natural mapping is used to pair each integer with a die picture
     * <br> 0 is used to represent a "blank" die picture
     *
     * @return {Array} an array of integers representing dice values of dice pictures
    */
    get_values(){

    }

    /**
     * Calculates the sum of all dice_elements
     * <br> Returns 0 if the dice are blank
     *
     * @return {Number} an integer represenitng the sum of all five dice
    */
    get_sum(){


    }

    /**
     * Calculates a count of each die face in dice_elements
     * <br> Ex - would return [0, 0, 0, 0, 2, 3] for two fives and three sixes
     *
     * @return {Array} an array of six integers representing counts of the six die faces
    */
    get_counts(){

    }

    /**
     * Performs all necessary actions to roll and update display of dice_elements
     * Also updates rolls remaining
     * <br> Uses this.set to update dice
    */
    roll(){
        
        let dice_photos =["one.svg", "two.svg", "three.svg", "four.svg", "five.svg", "six.svg"]

        for (let i = 0; i<5; i++){
            let die = document.getElementById("die_"+i);
            die.src = "/img/" + String(dice_photos[(Math.floor(Math.random() * dice_photos.length))])
            //die.addEventListener('dblclick', reserve_die_handler);
            this.dice_elements.push(die);
        }

    }

    /**
     * Resets all dice_element pictures to blank, and unreserved.
     * Also resets rolls remaining to 3
     * <br> Uses this.#setDice to update dice
    */
    reset(){

    }

    /**
     * Performs all necessary actions to reserve/unreserve a particular die
     * <br> Adds "reserved" as a class label to indicate a die is reserved
     * <br> Removes "reserved" a class label if a die is already reserved
     * <br> Hint: use the classlist.toggle method
     *
     * @param {Object} element the <img> element representing the die to reserve
    */
    reserve(die_element){

    }

    /**
     * A useful testing method to conveniently change dice / rolls remaining
     * <br> A value of 0 indicates that the die should be blank
     * <br> A value of -1 indicates that the die should not be updated
     *
     * @param {Array} new_dice_values an array of five integers, one for each die value
     * @param {Number} new_rolls_remaining an integer representing the new value for rolls remaining
     *
    */
    set(new_dice_values, new_rolls_remaining){

    }
}

export default Dice;
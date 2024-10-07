console.log("Dice.js connected")
class Dice{
    constructor(dice_elements, rolls_remaining_element, roll_button){
        this.rolls_remaining_element= rolls_remaining_element;
        this.dice_elements= dice_elements;
        this.roll_button= roll_button;
        this.dice_photos= ["blank.svg", "one.svg", "two.svg", "three.svg", "four.svg", "five.svg", "six.svg"];
    }

    /**
     * Returns the number of rolls remaining for a turn
     * @return {Number} an integer representing the number of rolls remaining for a turn
    */
    get_rolls_remaining(){
       /*let roll_button = document.getElementById('roll_button');
        roll_button.addEventListener('click', rolls); 

        function rolls() {
            for (let count = 3; count > -1; count--) {
                this.rolls_remaining_element.innerHTML = count; 
                //return count; 
            }
        }*/
       let count = Number(this.rolls_remaining_element.innerText);
       //console.log(count);
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
        //let dice_photos =["blank.svg", "one.svg", "two.svg", "three.svg", "four.svg", "five.svg", "six.svg"];
        let values_array = [];
        //let recent_die_array = [];
        for (let die in this.dice_elements/*.slice(Math.max(this.dice_elements.length - 5, 0))*/) {
            let die_img = this.dice_elements[die].src;
            //console.log(this.dice_elements[die].src);

            die_img = die_img.replace("http://127.0.0.1:8080/img/", "");
            //console.log(die_img);

            values_array.push(this.dice_photos.indexOf(die_img));
            //console.log(values_array);
        }

        //console.log(this.dice_elements);
        //console.log("values_array", values_array);
        return values_array;
    }
    
    /**
     * Calculates the sum of all dice_elements
     * <br> Returns 0 if the dice are blank
     *
     * @return {Number} an integer represenitng the sum of all five dice
    */
    get_sum(){
        let values_array = this.get_values();

        //console.log(values_array.reduce((partialSum, a) => partialSum + a, 0));
        return values_array.reduce((partialSum, a) => partialSum + a, 0);

    }

    /**
     * Calculates a count of each die face in dice_elements
     * <br> Ex - would return [0, 0, 0, 0, 2, 3] for two fives and three sixes
     *
     * @return {Array} an array of six integers representing counts of the six die faces
    */
    get_counts(){
        let values_array = this.get_values(); 
        let counts_array = [0,0,0,0,0,0];

        for (let value of values_array) {
            if (value != 0) {
                counts_array[value - 1] += 1;
            }
        }
        //console.log(counts_array);
        return counts_array;
        
    }

    /**
     * Performs all necessary actions to roll and update display of dice_elements
     * Also updates rolls remaining
     * <br> Uses this.set to update dice
    */
    roll(){
        
        //let roll_dice_photos =["one.svg", "two.svg", "three.svg", "four.svg", "five.svg", "six.svg"]
        let dice_elements = [];
        for (let i = 0; i<5; i++){
            /*let die = document.getElementById("die_"+i);
            die.src = "/img/" + String(roll_dice_photos[(Math.floor(Math.random() * roll_dice_photos.length))])
            //die.addEventListener('dblclick', reserve_die_handler);
            dice_elements.push(die);*/
            let die_element = Math.floor(Math.random() * (6) + 1);
            dice_elements.push(die_element);
        }

        for (let i=0; i<this.dice_elements.length; i++) {
            if (this.dice_elements[i].className.includes("reserved")) {
                dice_elements[i] = -1;
            }
        }

        /*let dice_src_array = [];
        for (let dice of this.dice_elements) {
            dice_src_array.push(dice.src);
        }
        for (let i=0; i<dice_src_array.length; i++) {
            if (dice_src_array[i].includes("blank")) {
                dice_elements[i] = -1;
            }
        }*/
        //this.set()
        //console.log("roll", dice_elements);
        /*this.rolls_remaining_element = Number(this.rolls_remaining_element.innerText) - 1; 
        console.log("rolls_remaining", this.rolls_remaining_element);
        console.log("rollll", this.rolls_remaining_element);*/
        /*for (let dice of this.dice_elements) {
            console.log("this.dice_elements", dice.src);
        }*/

        /*for (let i =0; i<5; i++) {
            console.log("this.dice_elements", this.dice_elements[i]);
        }*/

        //console.log("dice_elements", dice_elements.src);
        this.set(dice_elements, ((Number(this.rolls_remaining_element.innerText)) -1));

    }

    /**
     * Resets all dice_element pictures to blank, and unreserved.
     * Also resets rolls remaining to 3
     * <br> Uses this.#setDice to update dice
    */
    reset(){
        let new_values = [0,0,0,0,0,0];
        this.set(new_values, 3);
        for (let dice of this.dice_elements) {
            dice.classList.remove("reserved");
        }        

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
        //console.log("die_element", die_element);
       if (die_element.src.includes("blank") == false) {
            die_element.classList.toggle("reserved");
        } 
        
        //let die_element_list = die_element.classList; 
        //die_element_list.toggle("reserved");
        //console.log("reserved");
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
        this.rolls_remaining_element.innerText = new_rolls_remaining; 
        
        for (let i=0; i<5; i++) {
            if (new_dice_values[i] > -1) {
                //this.dice_elements[i].src = new_dice_values[i].src;
                this.dice_elements[i].src = "/img/" + this.dice_photos[new_dice_values[i]];
                //console.log(this.dice_elements[i].src);
            }
        }
    }
}

export default Dice;
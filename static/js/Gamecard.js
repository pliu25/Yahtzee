class Gamecard{
    
    constructor(category_elements, score_elements, myDice, category, value){
        this.category_elements = category_elements;
        this.dice=myDice;
        this.score_elements=score_elements;
        this.dice_photos= ["blank.svg", "one.svg", "two.svg", "three.svg", "four.svg", "five.svg", "six.svg"];
        this.category = category; 
        this.value = value;
    }

    /**
     * Determines whether the scorecard is full/finished
     * A full scorecard is a scorecard where all categores are disabled.
     *
     * @return {Boolean} a Boolean value indicating whether the scorecard is full
     */
    is_finished(){

    }

    /**
     * Validates a score for a particular category
     * Upper categories should be validated by a single generalized procedure
     * Hint: Make use of this.dice.get_sum() and this.dice.get_counts()
     *
     * @param {String} category the category that should be validated
     * @param {Number} value the proposed score for the category
     * 
     * @return {Boolean} a Boolean value indicating whether the score is valid for the category
    */
    is_valid_score(category, value){
        let score_valid = Boolean(0); 
        let upper_category_class = document.getElementsByClassName("upper category");
        let upper_categories = [];
        for (let i=0; i < upper_category_class.length; i++) {
            upper_categories.push(upper_category_class[i].id);
        }
        console.log("upper_categories", upper_categories);

        console.log("category", category);
        
        if (upper_categories.includes(category)) {
            if (value == ((this.dice.get_counts()[upper_categories.indexOf(category)]) * (this.dice.get_counts().indexOf(upper_categories.indexOf(category)) + 1))) {
                score_valid = Boolean(1);
            } else {
                score_valid = Boolean(0);
            }
            console.log("get_counts", this.dice.get_counts()[upper_categories.indexOf(category)]);
            console.log("check", ((this.dice.get_counts()[upper_categories.indexOf(category)]) * (this.dice.get_counts().indexOf(upper_categories.indexOf(category)) + 1)));
            console.log("check2", this.dice.get_counts().indexOf(upper_categories.indexOf(category)) + 1)
            /*console.log("upper_categories.indexOf(category)", upper_categories.indexOf(category));
            console.log("this.dice.get_counts()", this.dice.get_counts())*/
        } else {
            if (category == "three_of_a_kind_input") {

            } else if (category == "four_of_a_kind_input") {
                
            }
        }
        //upper_category_inputs = document.getElementsByClassName("upper category");
        //for (entry in upper_category_inputs) {
            //console.log("woohoo!"); 
        //}
        /*if (category == "upper category") {
            console.log("woohoo!");
        } else {
            console.log("nay");
        }*/
        //console.log("category", category);
        //console.log("get_counts", this.dice.get_counts());
        //if category * this.die.get_counts[index -1] == value return true, if not rteurn false 
       
        return score_valid;
    }

    /**
    * Returns the current Grand Total score for a scorecard
    * 
    * @return {Number} an integer value representing the curent game score
    */
    get_score(){

    }

    /**
     * Updates all score elements for a scorecard
    */
    update_scores(){
       
    }

    /**
     * Loads a scorecard from a JS object in the specified format:
     * {
            "rolls_remaining":0,
            "upper":{
                "one":-1,
                "two":-1,
                "three":-1,
                "four":-1,
                "five":-1,
                "six":-1
            },
            "lower":{
                "three_of_a_kind":-1,
                "four_of_a_kind":-1,
                "full_house":-1,
                "small_straight":-1,
                "large_straight":-1,
                "yahtzee":-1,
                "chance":-1
            }
        }
     *
     * @param {Object} gameObject the object version of the scorecard
    */
    load_scorecard(score_info){
       
    }

    /**
     * Creates a JS object from the scorecard in the specified format:
     * {
            "rolls_remaining":0,
            "upper":{
                "one":-1,
                "two":-1,
                "three":-1,
                "four":-1,
                "five":-1,
                "six":-1
            },
            "lower":{
                "three_of_a_kind":-1,
                "four_of_a_kind":-1,
                "full_house":-1,
                "small_straight":-1,
                "large_straight":-1,
                "yahtzee":-1,
                "chance":-1
            }
        }
     *
     * @return {Object} an object version of the scorecard
     *
     */
    to_object(){
      
    }
}

export default Gamecard;






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
        
        if (this.dice.get_sum() == 0) {
            score_valid = Boolean(0);
        }

        if (value.toString() === "0") {
            console.log("zero");
            score_valid = Boolean(1);
        }
        
        //upper categories
        if (upper_categories.includes(category)) {
            if (value == ((this.dice.get_counts()[upper_categories.indexOf(category)]) * ((upper_categories.indexOf(category)) + 1))) {
                score_valid = Boolean(1);
            } else if (value.toString() != "0") {
                score_valid = Boolean(0);
            }
            console.log("get_counts", this.dice.get_counts()[upper_categories.indexOf(category)]);
            console.log("final_check", ((this.dice.get_counts()[upper_categories.indexOf(category)]) * ((upper_categories.indexOf(category)) + 1)));
            console.log("(upper_categories.indexOf(category)) + 1)", ((upper_categories.indexOf(category)) + 1));
            /*console.log("upper_categories.indexOf(category)", upper_categories.indexOf(category));
            console.log("this.dice.get_counts()", this.dice.get_counts())*/
        } else { //lower categories
            if (category == "three_of_a_kind_input") {
                if (this.dice.get_counts().some((num) => num >= 3)) {
                    let rev_get_counts = []
                    for (let num of this.dice.get_counts()) {
                        if (num >= 3) {
                            rev_get_counts = [this.dice.get_counts().indexOf(num), num];
                        }
                    }
                    //console.log("rev_get_counts", rev_get_counts);
                    //console.log("this.dice.get_counts()", this.dice.get_counts());
                    
                    if (value == (((rev_get_counts[0])+1)*3)) {
                        score_valid = Boolean(1);
                        console.log("yay");
                    } else if (value.toString() != "0") {
                        score_valid = Boolean(0);
                        console.log("nay");
                    }
                    console.log("(rev_get_counts[0])+1", (rev_get_counts[0])+1);
                    //console.log("this.dice.get_counts().indexOf(num)", this.dice.get_counts().indexOf(num));
                } else if (value.toString() != "0") {
                    score_valid = Boolean(0);
                }
            } else if (category == "four_of_a_kind_input") {
                if (this.dice.get_counts().some((num) => num >= 4)) {
                    let rev_get_counts = []
                    for (let num of this.dice.get_counts()) {
                        if (num >= 4) {
                            rev_get_counts = [this.dice.get_counts().indexOf(num), num];
                        }
                    }
                    //console.log("rev_get_counts", rev_get_counts);
                    //console.log("this.dice.get_counts()", this.dice.get_counts());
                    
                    if (value == (((rev_get_counts[0])+1)*4)) {
                        score_valid = Boolean(1);
                        console.log("yay");
                    } else if (value.toString() != "0") {
                        score_valid = Boolean(0);
                        console.log("nay");
                    }
                    //console.log("(rev_get_counts[0])+1", (rev_get_counts[0])+1);
                    //console.log("this.dice.get_counts().indexOf(num)", this.dice.get_counts().indexOf(num));
                } else if (value.toString() != "0") {
                    score_valid = Boolean(0);
                }
            } else if (category == "full_house_input") {
                if ((this.dice.get_counts().includes(3)) && (this.dice.get_counts().includes(2))) {
                    if (value == 25) {
                        score_valid = Boolean(1);
                    } else {
                        score_valid = Boolean(0);
                    }
                }
            } else if (category == "small_straight_input") {
                let sorted_counts = this.dice.get_counts().sort(); 
                if (sorted_counts.includes("1, 1, 1, 1")) {
                    let sum = 0;
                    for (num in this.dice.get_counts()) {
                        if (num == 1) {
                            sum += (this.dice.get_counts().indexOf(num) + 1);
                        }
                    }

                    if (value == sum){
                        score_valid = Boolean(1); 
                    } else if (value.toString() != "0") {
                        score_valid = Boolean(0);
                    }
                } else if (value.toString() != "0") {
                    score_valid = Boolean(0);
                }
            } else if (category == "large_straight_input") {
                if (this.dice.get_counts().includes("1, 1, 1, 1, 1")) {
                    if (value == this.dice.get_sum()) {
                        score_valid = Boolean(1); 
                    } else if (value.toString() != "0") {
                        score_valid = Boolean(0);
                    }
                } else if (value.toString() != "0") {
                    score_valid = Boolean(0);
                }
            } else if (category == "yahtzee_input") {
                if (this.dice.get_counts().includes(5)) {
                    if (value == 50) {
                        score_valid = Boolean(1);
                    } else {
                        score_valid = Boolean(0);
                    }
                } else if (value.toString() != "0") {
                    score_valid = Boolean(0);
                }
            } else if (category == "chance_input") {
                /*let sum = this.dice.values().reduce(function(acc, el) {
                    return acc + el; 
                }, 0);
                console.log("sum", sum);*/
                if (value == this.dice.get_sum()) {
                    score_valid = Boolean(1);
                } else if (value.toString() != "0") {
                    score_valid = Boolean(0);
                }
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
       //can use load_scorecard + to_object to test MS3, create partial games that are practically all filled out
       //goes through the objects and then puts in all scores, then disables it
       //only if score in it
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






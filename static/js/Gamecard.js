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
        for (let category of this.category_elements) {
            if (category.disabled == false) {
                return false; 
            }
        }
        return true; 
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
        let disable_attribute = document.getElementById(category + "_input");
        let score_valid = Boolean(0); 
        let upper_category_class = document.getElementsByClassName("upper category");
        let upper_categories = [];
        for (let i=0; i < upper_category_class.length; i++) {
            upper_categories.push(upper_category_class[i].id);
        }
        console.log("upper_categories", upper_categories);

        console.log("category", category + "_input");
        console.log("this.dice.get_counts()", this.dice.get_counts())
        
        if (this.dice.get_sum() == 0) {
            return false;
        } 

        if (typeof value === "string") {
            return false;
        }

        if (value.toString() === "0") {
            //console.log("zero");
            disable_attribute.disabled=true;
            return true;
        }
        
        let rev_category = category + "_input";
        console.log("rev_category", rev_category);
        //upper categories
        if (upper_categories.includes(rev_category)) {
            if (value == ((this.dice.get_counts()[upper_categories.indexOf(rev_category)]) * ((upper_categories.indexOf(rev_category)) + 1))) {
                disable_attribute.disabled=true;
                score_valid = Boolean(1);  
            } else {
                score_valid = Boolean(0);  
            }
            console.log("get_counts", this.dice.get_counts()[upper_categories.indexOf(category)]);
            console.log("final_check", ((this.dice.get_counts()[upper_categories.indexOf(category)]) * ((upper_categories.indexOf(category)) + 1)));
            console.log("(upper_categories.indexOf(category)) + 1)", ((upper_categories.indexOf(category)) + 1));
            /*console.log("upper_categories.indexOf(category)", upper_categories.indexOf(category));
            console.log("this.dice.get_counts()", this.dice.get_counts())*/
        } else { //lower categories
            if (category == "three_of_a_kind") {
                if (this.dice.get_counts().some((num) => num >= 3)) {
                    let rev_get_counts = [];
                    for (let num of this.dice.get_counts()) {
                        if (num >= 3) {
                            rev_get_counts = [this.dice.get_counts().indexOf(num), num];
                        }
                    }
                    //console.log("rev_get_counts", rev_get_counts);
                    //console.log("this.dice.get_counts()", this.dice.get_counts());
                    
                    if (value == this.dice.get_sum()) {
                        score_valid = Boolean(1);
                        disable_attribute.disabled=true;
                        console.log("yay");
                    } else {
                        score_valid = Boolean(0);
                        console.log("nay");
                    }
                    //console.log("(rev_get_counts[0])+1", (rev_get_counts[0])+1);
                    //console.log("this.dice.get_counts().indexOf(num)", this.dice.get_counts().indexOf(num));
                } else if (value.toString() != "0") {
                    score_valid = Boolean(0);
                }
            } else if (category == "four_of_a_kind") {
                if (this.dice.get_counts().some((num) => num >= 4)) {
                    let rev_get_counts = []
                    for (let num of this.dice.get_counts()) {
                        if (num >= 4) {
                            rev_get_counts = [this.dice.get_counts().indexOf(num), num];
                        }
                    }
                    //console.log("rev_get_counts", rev_get_counts);
                    //console.log("this.dice.get_counts()", this.dice.get_counts());
                    
                    if (value == this.dice.get_sum()) {
                        score_valid = Boolean(1);
                        disable_attribute.disabled=true;
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
            } else if (category == "full_house") {
                if ((this.dice.get_counts().includes(3)) && (this.dice.get_counts().includes(2))) {
                    if (value == 25) {
                        score_valid = Boolean(1);
                        disable_attribute.disabled=true;
                    } else {
                        score_valid = Boolean(0);
                    }
                }
            } else if (category == "small_straight") { 
                //let sorted_counts = this.dice.get_counts().sort(); 
                //if ((sorted_counts.includes("1, 1, 1, 1")) || (sorted_counts.includes("1, 1, 1, 2"))) {
            
                    /*modified_get_counts = Array.from(this.dice.get_counts());
                    for (let i = 0; i < modified_get_counts.length; i++) {
                        if (modified_get_counts[i] == 2) {
                            modified_get_counts[i] = 1;
                        }
                    }
                    console.log("modified_get_counts", modified_get_counts);
                    let sum = 0;
                    for (num in modified_get_counts) {
                        if (num == 1) {
                            sum += ((modified_get_counts.indexOf(num)) + 1);
                        } else {
                            sum += 0;
                        }
                    }

                    if (value == sum){
                        score_valid = Boolean(1); 
                        console.log("sum", sum);
                    } else if (value.toString() != "0") {
                        score_valid = Boolean(0);
                        console.log("sum", sum);
                    }*/
                let short_get_counts1 = this.dice.get_counts().slice(0,4);
                let short_get_counts2 = this.dice.get_counts().slice(1,5);
                let short_get_counts3 = this.dice.get_counts().slice(2,6);
                //console.log(short_get_counts1, short_get_counts2, short_get_counts3);
                let shortened_get_counts = [short_get_counts1, short_get_counts2, short_get_counts3];
                let if_valid = new Array();

                for (let short_count of shortened_get_counts) {
                    if (short_count.includes(0)) {
                        if_valid.push("no");
                        //console.log("short_count_no", short_count);
                    } else {
                        if_valid.push("valid");
                        //console.log("short_count_valid", short_count);
                    }
                }

                console.log("if_valid", if_valid);

                if (if_valid.includes("valid")) {
                    if (value == 30) {
                        score_valid = Boolean(1);
                        disable_attribute.disabled=true;
                    } else if (value.toString() != "0") {
                        score_valid = Boolean(0);
                    }
                }
            } else if (category == "large_straight") {
                if (this.dice.get_counts().includes(1, 1, 1, 1, 1)) {
                    if (value == 40) {
                        console.log("yay");
                        score_valid = Boolean(1);
                        //console.log("this.dice.get_counts()", this.dice.get_counts());
                        disable_attribute.disabled=true;
                    } else {
                        console.log("nay");
                        score_valid = Boolean(0); 
                        //console.log("this.dice.get_counts()", this.dice.get_counts());
                    }
                } else {
                    console.log("nay2");
                    score_valid = Boolean(0);
                }
            } else if (category == "yahtzee") {
                if (this.dice.get_counts().includes(5)) {
                    if (value == 50) {
                        score_valid = Boolean(1);
                        disable_attribute.disabled=true;
                    } else {
                        score_valid = Boolean(0);
                    }
                } else if (value.toString() != "0") {
                    score_valid = Boolean(0);
                }
            } else if (category == "chance") {
                /*let sum = this.dice.values().reduce(function(acc, el) {
                    return acc + el; 
                }, 0);
                console.log("sum", sum);*/
                if (value == this.dice.get_sum()) {
                    score_valid = Boolean(1);
                    disable_attribute.disabled=true;
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
        let sum = 0; 
        for (let category of this.category_elements) {
            sum += Number(category.value);
        }

        return sum;
    }

    /**
     * Updates all score elements for a scorecard
    */
    update_scores(){
        let upper_sum = 0;
        let bonus = 0; 
        let upper_total = 0;
        let lower_sum = 0; 
        let grand_total = 0; 
        
        

        for (let category of this.category_elements) {
            if (category.disabled == true) {
                if (category.className == "upper category") {
                    upper_sum += Number(category.value);
                } else if (category.className == "lower category") {
                    lower_sum += Number(category.value);
                }
            }
        }

        document.getElementById("upper_score").textContent = upper_sum.toString();
        if (upper_sum >= 63) {
            bonus += 35; 
        } 
        upper_total += (upper_sum + bonus);
        document.getElementById("upper_bonus").textContent = bonus.toString();
        document.getElementById("upper_total").textContent = upper_total.toString();
        document.getElementById("lower_score").textContent = lower_sum.toString(); 
        document.getElementById("upper_total_lower").textContent = upper_total.toString();

        grand_total += (upper_total + lower_sum); 
        document.getElementById("grand_total").textContent = grand_total.toString(); 

        console.log(upper_sum, bonus, upper_total, lower_sum, grand_total);
        
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
       
       //console.log("score_info", score_info); 
       //return gameObject; 

       for (let key in score_info) {
        if (key == "rolls_remaining") {
            document.getElementById(key).textContent = score_info[key].toString();
        } else {
            for (let category in score_info[key]) {
                let category_id = category + "_input"; 

                if (score_info[key][category] != -1) {
                    document.getElementById(category_id).value = score_info[key][category].toString(); 
                    document.getElementById(category_id).disabled = true; 
                } else {
                    document.getElementById(category_id).value = ""; 
                    document.getElementById(category_id).disabled = false; 
                }
    
            }
        }
       }

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
        let scorecard_obj = {}; 
        scorecard_obj.rolls_remaining = this.dice.get_rolls_remaining();
        scorecard_obj.upper = {}; 
        scorecard_obj.lower = {};

        for (let category of this.category_elements) {
            let category_key = category.id.replace("_input", ""); 
            if (category.classList.contains("upper")) {
                if (category.disabled == true) {
                    scorecard_obj.upper[category_key] = Number(category.value);
                } else {
                    scorecard_obj.upper[category_key] = -1; 
                }
            } else {
                if (category.disabled == true) {
                    scorecard_obj.lower[category_key] = Number(category.value);
                } else {
                    scorecard_obj.lower[category_key] = -1; 
                }
            }
        }
        return scorecard_obj; 
    }
}

export default Gamecard;






/*
Funtion that will extract the user input from a given field ID.
Parameters:
id = the id of the html tag.
Return the value from the input field.
*/
function getValue(id) {
    var radioValue = document.getElementById(id).value;
    return radioValue;
}
/*
Function that will insert an string into html tag.
Parameters:
id = id of the given html tag.
string = the string that will be displayed.
*/
function displayString(id, string) {
    document.getElementById(id).innerHTML = string;
}
/*
Function that will change class name of a given html tag.
Parameters:
id = the id of the html tag.
newClass = the class name given.
*/
function changeClass(id, newClass) {
    var change = document.getElementById(id);
    change.className = newClass;
}
/*
Function that will display or hide a hovering tooltip over the question mark in ZHA field.
*/
function displayTooltip() {
    document.getElementById("question").onmouseover = function() {
        changeClass("tooltip", "showtooltip");
    } 	    
    document.getElementById('question').onmouseout = function() {
        changeClass("tooltip", "hidetooltip");
    }
}
/*
Fuction that will add 2 dynamic texts for ZHA field:
One example on right side upon focus , and one hint inside on page load or blur.
Funtion will also validate onblur the user input for the ZHA field.
*/
function zhaHint() { 
    var hintText = "Enter your ZHA number";
    var zhaElem = document.getElementById("zha");
    zhaElem.value = hintText;
    changeClass("zha", "zhaitalic");
    zhaElem.onfocus = function() {
        if (this.value == hintText) {
            this.value = "";
            changeClass("zha", "zhanormal");
        }
        displayString("zhint", "(e.g. ZHA123456)");
        displayString("zhaerror", "");
    }
    zhaElem.onblur = function() {
        displayString("zhint", "");
        if (this.value == "") {
            this.value = hintText;
            changeClass("zha", "zhaitalic");
            displayString("zhaerror", "* ZHA number is required");
        }else {
            var zValue = zhaElem.value;
            var zhaTest = /^[zZ][hH][aA][0-9]{6}$/;;
            if (zhaTest.test(zValue)){
                displayString("zhaerror", "");
            }else {
                displayString("zhaerror", "* ZHA number is invalid");
            }
        }
    }
}
/*
Function to validate the form fields
*/
function validateForm() {	
    document.getElementById("contact").onsubmit = function() {
        var submitStatus = true;
        /*
        Function to validate fields and display feedback and prevent onsubmit if any validation fails
        Parameters:
        id - input tag ID
        reg - regular expression
        mess - string to be displayed
        */
        function validateField (id, reg, mess){
            var val = getValue(id);
            if (val == "") { 
                //exclude phone field if empty
                if (id == "phone"){
                    displayString(id + "error", "");//clear previous invalid feedback
                }else {
                    submitStatus = false;
                    displayString(id + "error", mess + " is required");
                }
            }else {
                //prevent validation for hint text and add required message
                if (val == "Enter your ZHA number"){
                    submitStatus = false;
                    displayString(id + "error", mess + " is required");
                }else {
                    if (reg.test(val)) {
                        displayString(id + "error", "");
                    }else {
                        submitStatus = false;
                        displayString(id + "error", mess + " is invalid");
                    }
                }
            }
        }
        //validating each field
        validateField("fname", /^[a-zA-Z]{2,50}$/, "* First name");
        validateField("lname", /^([a-zA-Z]{2,50}|[a-zA-Z]{2,50}[-]{0,1}[a-zA-Z]{2,50})$/, "* Last name");
        validateField("title", /^(mr|ms|mrs|miss|master)$/, "* Title");
        validateField("zha", /^[zZ][hH][aA][0-9]{6}$/, "* ZHA number");
        validateField("email", /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,}$/, "* Email");
        validateField("phone", /^[0-9]{11}$/, "* Phone number");
        //feedback to user if all data is valid
        if (submitStatus == true) {
            alert("You details have been sent");
        }		
        return submitStatus;
    }
}
/*
Function that will focus first name field and execute the script
*/
function init() {
    //focus() method learned from w3schools.com
    document.getElementById("fname").focus();
    zhaHint();
    displayTooltip();
    validateForm();
}
// Initiate the function that will execute the script after html was loaded
window.onload = init;
/*
Full name: Mircea Gancea
Username: mgance01
Module: Javascript
Tutor: Tobi Brodie 
 */
/*
Function that will get the value of a checked radio button
Parameters:
group = the given radio group name
Return the value of the checked field converted into integer
Code learned from 
"http://stackoverflow.com/questions/15839169/how-to-get-value-of-selected-radio-button"
and transformed into a function and added a return to fit my needs
*/
function getRadioValue(group) {
    var groupElem = document.getElementsByName(group);
    var radVal;
    for (var i = 0; i < groupElem.length; i++) {
        if(groupElem[i].checked) {
        radVal = groupElem[i].value;
        }	
    }
    return parseInt(radVal);
}
/*
Function that will create a link
Parameters:
str = the string that will be linked
add = the adresse 
Return a html "a" tag output e.g. <a href="add">str</a>
*/
function createLink(str, add){
    var string = str;
    //link() method learned from w3schools.com
    newLink = string.link(add);
    return newLink;
}
/*
Function that will create the sentence that will display the high risks
Parameters:
factors = the array given which contain the names of the risks that have high value
Return an sentence according with how many elements the array had.
Returns an empty string if array is empty
*/
function getSentence(factors){
    var sentence = "";
    if (factors.length > 0) {
        if (factors.length == 1) {
            sentence = "Your main risk factor is your " + factors[0] + ".";
        }else if (factors.length == 2) {
            sentence = "Your main risk factors are your " + 
                        factors[0] + " and your " + factors[1] + ".";
        }else if (factors.length == 3) {
            sentence = "Your main risk factors are your " + 
                        factors[0] + ", " + factors[1] + " and your " + factors[2] + ".";
        }else {
            sentence = "Your main risk factors are your " + 
                        factors[0] +  ", "+ factors[1] + ", " + factors[2] + " and your " + factors[3] + ".";
        }
    }
    return sentence;
}
/*
Function that will calculate total for user selection and create the user feedback
Parameters:
groups = the array with the radio group names
Return an sentence according with the calculated total and number of high risks if the result is high
*/
function riskResult(groups) {
    var risk  = "";
    var riskFactors = [];
    var total = 0;
	/*
	Loop that will get value for each radio group name that was checked
	Will calculate total and push group names that return high value into array
	*/
    for (var i = 0; i < groups.length; i++) {
        groupName = groups[i];
        radioValue = getRadioValue(groupName);
        total += radioValue;
        if (radioValue >= 10) {
            riskFactors.push("<span class='bold'>" + groupName + "</span>");
        }
    }
    if (total <= 15) {
        risk = "Your results show that you currently have a low risk of developing diabetes. " +
               "However, it is important that you maintain a healthy lifestyle in terms of diet and exercise.";
    }else if (total <= 25) {
        var zhaLink = createLink("http://www.zha.org.zd", "http://www.zha.org.zd");
        risk = "Your results show that you currently have a medium risk of developing diabetes. " +
               "For more information on your risk factors, and what to do about them, " +
               "please visit our diabetes advice website at " + 
               zhaLink;
    }else {
        var highRisk = getSentence(riskFactors);
        var contactLink = createLink("contact form", "contactform.html");
        risk = "Your results show that you currently have a HIGH risk of developing diabetes. " + 
               "<span id='italic'>" +
               highRisk + 
               "</span>" +
               "We advise that you contact the Health Authority to discuss your risk factors as soon as you can. " +
               "Please fill in our " + 
               contactLink + 
               " and a member of the Health Authority Diabetes Team will be in contact with you.";
    } 
    return risk;
}
/*
Function that will execute all script and display feedback according with user selection
*/	
function displayResult() {
    document.getElementById("calc").onclick = function() {
        var radioGroups = ['age', 'BMI', 'family', 'diet'];
        var riskFeedback = riskResult(radioGroups);
        var resBox = document.getElementById("resultbox");
        resBox.className = "showbox";
        document.getElementById("result").innerHTML = riskFeedback;
    }
}
//Initiate the function that will execute code after page load
window.onload = displayResult;
/*
Full name: Mircea Gancea
Username: mgance01
Module: Javascript
Tutor: Tobi Brodie 
 */
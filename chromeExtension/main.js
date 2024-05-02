var bwkCode = "";
var answersMap = {};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getBwkCode() {
    console.log('Extinguished Spark -> Running getBwkCode()');
    try {
        bwkHTML = document.getElementsByClassName("_Chip_bu06u_1")[0].innerHTML;
        bwkCode = bwkHTML.split(": ")[1];
        console.log('Extinguished Spark -> Got bookwork code', bwkCode);
    } catch {
        console.log("Extinguished Spark -> Getting bwk code failed. Assuming you're on the homepage or something.")
    }
}

async function getAnswers() {
    let answers = [];
    console.log('Extinguished Spark -> Continue clicked, getting answers');
    answersFromInput = document.getElementsByTagName('input');
    Array.prototype.forEach.call(answersFromInput, function(answer) {
        answers.push(answer.value);
    });
    if (answers.length == 0){
        answe = await getSelectAnswers();
        test = await getDropdownAnswers();
        answers.push(answe);
    } else {
        console.log('Extinguished Spark -> Got answers', answers);
    }
    answersMap[bwkCode] = answers;
    console.log('Extinguished Spark -> Updated answersMap to', answersMap);
}

//!Being worked on
async function getSelectAnswers() {
    try {
        selected = document.getElementsByClassName('_OptionSelected_1q5vh_576')[0].children[0].children[0].innerHTML;
    } catch {
        console.log("Multiple selections not implemented yet."); //! FIX THIS!
        console.log(document.getElementsByClassName('_OptionSelected_1q5vh_576'))
    }
    console.log('Extinguished Spark -> Got select answer', selected);
    return selected;
}

//!Doesn't work but i'm out of motivation for now cuz js is pain so imma go back to something that I actually know how to code
//Like we-know-your-ip-address (that thing is a mess)
async function getDropdownAnswers() {
    try {
        selected = document.getElementsByClassName('_AnswerTextElement_ygl3l_77')
        console.log(selected[0])
        console.log(selected[1])
    } catch {
        console.log("Extinguished Spark -> Unable to get dropdown answer")
    }
    console.log('Extinguished Spark -> Got select answer', selected);
    return selected;
}

document.addEventListener('DOMContentLoaded', async function(){
    if (document.URL.toLowerCase().includes("sparx")){
        console.log('%cExtinguished Spark Online.', 'font-weight: bold; font-size: 30px; color: aqua; text-shadow: 2px 2px 0 rgb(217,31,38)');
        await sleep(2000); getBwkCode();
    } else {
        console.log("Extinguished Spark -> Sparx not mentioned in the URL. You will now be left alone.")
    }
});

document.addEventListener('click', async function(event) {
    if (document.URL.toLowerCase().includes("sparx")){
        var element = event.target;
        getBwkCode();
        if (element.innerHTML === 'Continue' || element.innerHTML === 'Summary') {
            getAnswers();
        } 
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        if (document.URL.toLowerCase().includes("sparx")){
            var element = event.target;
            getBwkCode();
            if (element.innerHTML === 'Continue' || element.innerHTML === 'Summary') {
                getAnswers();
            } 
        }
    }
});
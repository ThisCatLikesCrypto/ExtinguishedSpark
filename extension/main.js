var bwkCode = "";
var answersMap = {};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getBwkCode() {
    console.log('Extinguished Spark -> Running getBwkCode()');
    bwkHTML = document.getElementsByClassName("_Chip_bu06u_1")[0].innerHTML;
    bwkCode = bwkHTML.split(": ")[1];
    console.log('Extinguished Spark -> Got bookwork code', bwkCode);
}

async function getAnswers() {
    let answers = [];
    console.log('Extinguished Spark -> Continue clicked, getting answers');
    answersFromInput = document.getElementsByTagName('input');
    Array.prototype.forEach.call(answersFromInput, function(answer) {
        answers.push(answer.value);
    });
    console.log('Extinguished Spark -> Got answers', answers);
    answersMap[bwkCode] = answers;
    console.log('Extinguished Spark -> Updated answersMap to', answersMap);
    
    // Update localStorage with the updated answersMap
    localStorage.setItem('answersMap', JSON.stringify(answersMap));
}

document.addEventListener('DOMContentLoaded', async function(){
    if (document.URL.toLowerCase().includes("sparx")){
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

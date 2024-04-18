var bwkCode = "";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to perform actions when the page is loaded or changed
async function getBwkCode() {
    console.log('Extinguished Spark -> Running getBwkCode()');
    await sleep(2000);
    bwkHTML = document.getElementsByClassName("_Chip_bu06u_1")[0].innerHTML;
    bwkCode = bwkHTML.split(": ")[1];
    console.log('Extinguished Spark -> Got bookwork code', bwkCode);
}


// Listener for page load and change events
document.addEventListener('DOMContentLoaded', getBwkCode);

document.addEventListener('click', async function(event) {
    var element = event.target;
    if (element.tagName === 'A') {
      console.log('Extinguished Spark -> <a> clicked, rescanning for bwk code');
      getBwkCode();
    } 
});
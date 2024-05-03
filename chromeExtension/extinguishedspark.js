function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getBwkCode() {
    console.log('Extinguished Spark -> Running getBwkCode()');
    try {
        bwkHTML = document.getElementsByClassName("_Chip_bu06u_1")[0].innerHTML;
        bwkCode = bwkHTML.split(": ")[1];
        console.log('Extinguished Spark -> Got bookwork code', bwkCode);
    } catch {
        console.log("Extinguished Spark -> Getting bwk code failed. Assuming you're on the homepage or something.");
        bwkCode = "FAILED";
    }
    return bwkCode;
}

function getScreenshots() {
    let imageName = prompt("What is the bookwork code you are looking for?");
    let image = localStorage.getItem("answer_" + imageName);
    if (!image) {
        alert("Image not found");
        return;
    }

    // Create elements for the modal overlay
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "9999";
    overlay.onclick = () => {
        overlay.remove(); // Close modal on click outside
    };

    const modalImage = document.createElement("img");
    modalImage.src = image;
    modalImage.style.maxWidth = "90%";
    modalImage.style.maxHeight = "90%";
    modalImage.style.borderRadius = "5px";
    
    // Append the image to the modal overlay
    overlay.appendChild(modalImage);

    // Append the overlay to the body
    document.body.appendChild(overlay);
}


function main() {
    imageName = getBwkCode();
    // Create a div element
    var screenshotArea = document.createElement("div");
    screenshotArea.id = "capture";
    screenshotArea.style.background = "#f5da55";

    document.body.appendChild(screenshotArea);

    if (imageName != "FAILED") {
        chrome.runtime.sendMessage({ message: "takescreenshot"});
    }
    
}

document.addEventListener('DOMContentLoaded', function(){
    if (document.URL.toLowerCase().includes("sparx")){
        console.log('%cExtinguished Spark Online.', 'font-weight: bold; font-size: 30px; color: aqua; text-shadow: 2px 2px 0 rgb(217,31,38)');
    } else {
        console.log("Extinguished Spark -> Sparx not mentioned in the URL. You will now be left alone.")
    }
});

document.addEventListener('click', function(event) {
    if (document.URL.toLowerCase().includes("sparx")){
        var element = event.target;
        if (element.innerHTML === 'Continue' || element.innerHTML === 'Summary') {
            main();
        } 
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        if (document.URL.toLowerCase().includes("sparx")){
                main();
        } 
    } else if (event.key === "Alt") {
        getScreenshots();
    }
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener(async function(message, sender, sendResponse) {
    imageName = getBwkCode();
    console.log(imageName);
    localStorage.setItem("answer_" + imageName, message);
});
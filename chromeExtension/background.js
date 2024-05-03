console.log("background script");

async function takeScreen(){
    try {
        // Get the active tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        // Check if the tab object is undefined
        if (!tab) {
            console.error("No active tab found.");
            return;
        }

        // Retrieve the current image number from local storage
        chrome.storage.local.get("imageNumber", async function(data) {
            let imageNumber = "tempimg";

            // Capture visible tab as an image
            const captureOptions = { format: "png" };
            const imageStream = await chrome.tabs.captureVisibleTab(tab.windowId, captureOptions);
            console.log("Took image");

            // Save captured image to local storage with an incremented image name
            const imageName = `capturedImage_${imageNumber}.png`;
            const imageData = {};
            imageData[imageName] = imageStream;
            chrome.storage.local.set(imageData, () => {
                if (chrome.runtime.lastError) {
                    console.error("Error saving image:", chrome.runtime.lastError);
                } else {
                    console.log("Image saved successfully");
                }
            });
        });
    } catch (error) {
        console.error("Error capturing or saving image:", error);
    }
}




// Define the function to handle the command
async function handleCommand(command="capture_image") {
    console.log(command);
    if (command === 'capture_image') {
        console.log("triggered");
        await takeScreen();
    }
    else if (command === 'get_page'){
        await getPage();
    }
}

// Add listener for commands and call the named function
chrome.commands.onCommand.addListener(handleCommand);

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener(async function(message, sender, sendResponse) {
    console.log("mesag");
    await takeScreen();
    chrome.storage.local.get("temping", async function(data){
        console.log(data.imageData);
        chrome.runtime.sendMessage({ message: data.imageData});
    })

});
console.log("background script");

//I barely have a clue how this works this is all chatgpt
chrome.commands.onCommand.addListener(async function(command) {
    if (command === 'capture_image') {
        try {
            // Retrieve the current image number from local storage
            chrome.storage.local.get("imageNumber", async function(data) {
                let imageNumber = data.imageNumber || 1; // Default to 1 if imageNumber is not set

                // Get the active tab
                const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

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
                        // Increment image number and store it in local storage
                        chrome.storage.local.set({ "imageNumber": imageNumber + 1 });
                    }
                });
            });
        } catch (error) {
            console.error("Error capturing or saving image:", error);
        }
    }
});

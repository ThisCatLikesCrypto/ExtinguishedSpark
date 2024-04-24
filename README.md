# Extinguished Spark
A program designed to get around Sparx Maths™ bookwork checks by taking a screenshot every time you press a certain key/key combo (thus taking a picture of your answer)

# Why are there two?
I made the python one first and then got ChatGPT to make an extension ver (it took a lot of wrestling and I made quite a lot of it myself in the end but oh well)  
Choose which one you want! The extension version is likely to be the most convenient and have updates but if you can't enable developer mode on your browser for whatever reason use the python one.

# Extension instructions
Either clone this repo or download the files. Go to your chromium-based browser. On your extensions page (something like brave://extensions/), turn on developer mode with the little toggle at the top if it isn't on already. Move the 'chromeExtension' folder to somewhere on your computer, then select 'Load extension'. Select it, and it should load.  
It automatically is given permissions on sparxmaths.uk (as well as my websites for testing) and will take screenshots with Ctrl+Shift+S (Command+Shift+S for mac). I tried to get it to work with enter but it just wasn't having it.

# Python instructions
Requires `pynput` and `pyautogui`.  
Either clone this repo or download the files. Move them to their own folder (along with 'numero'!) and whenever you use sparx simply run main.py. It will take screenshots when you press enter, and explorer.py is a viewer for said screenshots.

# Problems?
Make an issue. I'll make an FAQ at some point if I keep getting the same questions.

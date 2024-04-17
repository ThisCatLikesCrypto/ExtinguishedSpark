#Tkinter-powered program, to take pictures of your screen, write them, and let you name them. Also bookwork sparx check killer.
import pyautogui
import tkinter as tk
import os
from pynput.keyboard import Key, Listener
import threading


# Tkinter init
frame = tk.Tk()
frame.geometry('400x200')
frame.title("FUCK SPARX GG")
frame.attributes('-topmost', True)

# Vars init
cwd = os.getcwd()

#Purge all images
def purgeShots():
    directory = os.getcwd()
    files = os.listdir(directory)
    for file in files:
        if os.path.isfile(os.path.join(directory, file)) and file!="main.exe" and file!="main.py" and file!="numero" and file=="explorer.exe" and file=="explorer.py":
            os.remove(file)


# Save Screenshot
def saveShot():
    f = open("numero", "r")
    thing = f.read()
    f.close()
    image = pyautogui.screenshot()
    image.save(thing + ".png", "PNG")
    fsdajifads = str(int(thing)+1)
    f = open("numero", "w")
    f.write(fsdajifads)
    f.close()

quInputLabel = tk.Label(frame, text = "Press enter to take a screenshot.")
quInputLabel.pack()
thePurgeBtn = tk.Button(frame, text="Purge All Screenshots", command=purgeShots)
thePurgeBtn.pack()

def listenCheck(why):
    if why == Key.enter:
        saveShot()

def listeningThread():
    with Listener(on_press = listenCheck) as listener:   
        listener.join()

# Create a new thread
my_thread = threading.Thread(target=listeningThread)

# Start the thread
my_thread.start()

frame.mainloop()
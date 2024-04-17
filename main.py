import pyautogui
import tkinter as tk
import os
import sys
from pynput.keyboard import Key, Listener
import threading

# Tkinter initialization
tehWindow = tk.Tk()
tehWindow.geometry('400x200')
tehWindow.title("lol sparx (this cannot be patched)")
tehWindow.attributes('-topmost', True)

# Current working directory
current_directory = os.getcwd()

# Purge all non-image files from the directory
def purge_non_image_files():
    files = os.listdir(current_directory)
    for file in files:
        if os.path.isfile(os.path.join(current_directory, file)):
            if file.endswith(".png"):
                os.remove(os.path.join(current_directory, file))

# Save Screenshot
def save_screenshot():
    with open("numero", "r") as f:
        count = int(f.read())
    image = pyautogui.screenshot()
    image.save(f"{count}.png", "PNG")
    count += 1
    with open("numero", "w") as f:
        f.write(str(count))

# GUI elements
instruction_label = tk.Label(tehWindow, text="Press Enter to take a screenshot.")
instruction_label.pack()
purge_button = tk.Button(tehWindow, text="Purge All Screenshots", command=purge_non_image_files)
purge_button.pack()
exit_button = tk.Button(tehWindow, text="Exit", command=sys.exit)
exit_button.pack()

# Keyboard listener function
def check_key_press(key):
    if key == Key.enter:
        save_screenshot()

# Listening thread function
def start_listening():
    with Listener(on_press=check_key_press) as listener:   
        listener.join()

# Create and start the listening thread
listening_thread = threading.Thread(target=start_listening)
listening_thread.start()

tehWindow.mainloop()

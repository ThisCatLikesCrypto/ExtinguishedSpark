import os
import tkinter as tk
from PIL import Image, ImageTk

images = []

# Screenshot Browser
class ImageBrowser(tk.Frame):
    def __init__(self, master, images):
        super().__init__(master)
        self.master = master
        self.images = images
        self.current_index = 0

        self.image_labels = []
        self.create_widgets()

    def create_widgets(self):
        # Create image labels
        for _ in range(3):
            image_label = tk.Label(self)
            image_label.pack(side="top")
            self.image_labels.append(image_label)

        # Create "Next" and "Back" buttons
        next_button = tk.Button(self, text="Next", command=self.show_next_images)
        next_button.pack(side="right")

        back_button = tk.Button(self, text="Back", command=self.show_previous_images)
        back_button.pack(side="right")

        # Display initial images
        self.show_images()

    def show_images(self):
        # Clear previous images
        for image_label in self.image_labels:
            image_label.configure(image="")

        # Load and display current images
        for i, image_label in enumerate(self.image_labels):
            index = self.current_index + i
            if index < len(self.images):
                image_path = self.images[index]
                if image_path.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                    image = Image.open(image_path)
                    image.thumbnail((500, 500))  # Resize while preserving aspect ratio
                    photo = ImageTk.PhotoImage(image)
                    image_label.configure(image=photo)
                    image_label.image = photo  # Keep a reference to prevent garbage collection

    def show_next_images(self):
        if self.current_index + 3 < len(self.images):
            self.current_index += 3
            self.show_images()

    def show_previous_images(self):
        if self.current_index - 3 >= 0:
            self.current_index -= 3
            self.show_images()


# View Screenshots
def newView():
    browser = tk.Tk()
    browser.protocol("WM_DELETE_WINDOW", lambda: browser.destroy())
    files = os.listdir(os.getcwd())
    for file in files:
        if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
            images.append(file)
    print(images)
    image_browser = ImageBrowser(browser, images)
    image_browser.pack()
    browser.mainloop()

newView()
import time
from click import command
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from tkinter import *
import subprocess
from threading import Thread
import queue
import sys


class GUIWithTK:
    # Set the directory on watch
    # watchDirectory = "C:\\Users\\Jayesh\\Downloads\\"
    watchDirectory = "/Users/neelansh/Downloads"

    def __init__(self):
        self.observer = Observer()
        self.queue = queue.Queue()
        self.root = Tk()

    def run(self):
        event_handler = Handler()
        self.observer.schedule(event_handler, self.watchDirectory, recursive=True)
        self.observer.start()
        print("observing")
        try:
            while True:
                time.sleep(5)
        except:
            self.observer.stop()
            print("Observer Stopped")
        self.observer.join()

    def block_with_tkinter(self):
        OPTIONS = ["VLC", "Discord", "Onedrive", "Teams", "Slack", "Whatsapp", "Other"]
        program = StringVar(self.root, value="Select a program")
        self.root.geometry("650x250")
        label = Label(
            self.root,
            text="Please select what kind of file you just downloaded!",
            font=("Times New Roman bold", 20),
        )
        label.pack(padx=10, pady=10)
        self.root.attributes("-fullscreen", True)
        self.root.configure(bg="black")
        w = OptionMenu(self.root, program, *OPTIONS, command=change)
        w.config(width=20)
        w.pack(padx=20, pady=20)
        self.root.mainloop()


    def change(*args):
        print(args[0])
        if args[0] == "Other":
            self.root.destroy()
            command = f"Remove-Item -Path {file} "
            process = subprocess.Popen(
                # ["powershell.exe", "D:\\SIH\\Stack-Smashers\\backend\\test.ps1"],
                ["powershell.exe", command],
                shell=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
            )



class Handler(FileSystemEventHandler):
    @staticmethod
    def on_any_event(event):
        print(event.event_type)
        if event.is_directory:
            return print("directory event")
        elif event.event_type == "created":
            # block_with_tkinter()
            print("Watchdog received created event - % s." % event.src_path)
        elif event.event_type == "modified":
            file = event.src_path
            print(file)
            print("Watchdog received modified event - % s." % event.src_path)
            gobj = GUIWithTK()
            gobj.block_with_tkinter()
        elif event.event_type == "deleted":
            print("Watchdog received deleted event - % s." % event.src_path)
        elif event.event_type == "moved":
            print("Watchdog received moved event - % s." % event.src_path)



file = ""

if __name__ == "__main__":
    watch = GUIWithTK()
    watch.run()

    # block_with_tkinter()

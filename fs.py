from asyncio import events
import time
from click import command
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from tkinter import *
import subprocess
from threading import Thread
import os

OPTIONS = ["VLC", "Discord", "Onedrive", "Teams", "Slack", "Whatsapp", "Other"]


class GUIWithTK:
    # Set the directory on watch
    # watchDirectory = "C:\\Users\\Jayesh\\Downloads\\"
    # watchDirectory = "C:\\Users\\Jayesh\\Downloads\\"
    watchDirectory = "/Users/neelansh/Downloads/"

    def __init__(self):
        self.observer = Observer()
        self.root = Tk()
        self.file = ""

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

    def block_with_tkinter(self, file):
        self.file = file
        program = StringVar(self.root, value="Select a program")
        self.root.geometry("650x250")
        label = Label(
            self.root,
            text="Please select what kind of file you just downloaded!",
            font=("Times New Roman bold", 20),
        )
        label.pack(padx=10, pady=10)
        self.root.attributes("-fullscreen", True, "-topmost", True)
        self.root.configure(bg="black")
        w = OptionMenu(self.root, program, *OPTIONS, command=self.change)
        w.config(width=20)
        w.pack(padx=20, pady=20)
        print("----------------------------")
        self.root.mainloop()

    def wait_till_file_is_created(self, file_path):
        file_done = False
        file_size = -1
        try:
            while file_size != os.path.getsize(file_path):
                file_size = os.path.getsize(file_path)
                time.sleep(1)
            while not file_done:
                try:
                    os.rename(file_path, file_path)
                    file_done = True
                except:
                    return True
        except:
            print("ohnoo")

    def change(self, *args):
        global opened
        if args[0] == "Other":
            self.root.destroy()
            print(self.file)
            command = f"Remove-Item -Path '{self.file}' "
            process = subprocess.Popen(
                # ["powershell.exe", "D:\\SIH\\Stack-Smashers\\backend\\test.ps1"],
                ["powershell.exe", command],
                shell=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
            )
            out, err = process.communicate()
            print(
                out.decode("utf-8"),
            )
            print(
                err.decode("utf-8"),
            )

        elif args[0] in OPTIONS[:-1]:
            print(self.file)
            command = f"Get-FileHash -Algorithm SHA1 '{self.file}' | Select Hash | Format-Table -HideTableHeaders "
            process = subprocess.Popen(
                # ["powershell.exe", "D:\\SIH\\Stack-Smashers\\backend\\test.ps1"],
                ["powershell.exe", command],
                shell=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
            )
            out, err = process.communicate()
            print(
                out.decode("utf-8"),
            )
            print(
                err.decode("utf-8"),
            )
            self.root.destroy()


class Handler(FileSystemEventHandler):
    @staticmethod
    def on_any_event(event):
        gobj = GUIWithTK()
        print(event.event_type)
        if event.is_directory:
            return print("directory event")
        elif event.event_type == "created":
            file = event.src_path
            if "part" not in file:
                gobj.wait_till_file_is_created(file)
                gobj.block_with_tkinter(file)
                print("Watchdog received created event - % s." % event.src_path)
        elif event.event_type == "modified":
            file = event.src_path
            if "part" in file:
                gobj.wait_till_file_is_created(file)
                if "part" not in file:
                    gobj.block_with_tkinter(file)
                print(
                    "Watchdog received modified downloading event - % s."
                    % event.src_path
                )
            else:
                print("Watchdog received modified normal event - % s." % event.src_path)
        elif event.event_type == "deleted":
            print("Watchdog received deleted event - % s." % event.src_path)
        elif event.event_type == "moved":
            print("Watchdog received moved event - % s." % event.src_path)


if __name__ == "__main__":
    watch = GUIWithTK()
    watch.run()

    # block_with_tkinter()

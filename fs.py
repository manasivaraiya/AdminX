from asyncio import events
import time
from click import command
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from tkinter import *
import subprocess
from threading import Thread, local
import os
import requests, json


OPTIONS = [
    "VLC Media Player",
    "Discord",
    "Onedrive",
    "Teams",
    "Slack",
    "Whatsapp",
    "arch-linux",
    "audacity",
    "Other",
]
authorized_apps_url = "https://tdx-nis130.vercel.app/api/authorized_apps"


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
        label.grid(padx=10, pady=10, sticky="N")
        self.root.attributes("-fullscreen", True, "-topmost", True)
        self.root.configure(bg="black")
        w = OptionMenu(self.root, program, *OPTIONS, command=self.change)
        w.config(width=20)
        w.grid(column=1, row=10)
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
            print(out.decode("utf-8"))
            print(err.decode("utf-8"))

        elif args[0] in OPTIONS[:-1]:
            print(self.file)
            command = f"Get-FileHash -Algorithm SHA256 '{self.file}' | Select Hash | Format-Table -HideTableHeaders "
            process = subprocess.Popen(
                # ["powershell.exe", "D:\\SIH\\Stack-Smashers\\backend\\test.ps1"],
                ["powershell.exe", command],
                shell=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
            )
            out, err = process.communicate()
            payload = {"name": f"{args[0]}"}
            headers = {"Content-Type": "application/json"}
            response = requests.post(
                authorized_apps_url, headers=headers, data=json.dumps(payload)
            )
            print(json.dumps(payload))
            print(response.status_code)
            if response.status_code == 200:
                hasher = response.json().get("data").get("hash")
                local_hash = out.decode("utf-8")
                escapes = "".join([chr(char) for char in range(1, 32)])
                clean_local_hash = local_hash.translate(str.maketrans("", "", escapes))
                clean_server_hash = hasher.translate(str.maketrans("", "", escapes))
                clean_local_hash = local_hash.translate(str.maketrans("", "", escapes))
                clean_server_hash = hasher.translate(str.maketrans("", "", escapes))
                if clean_local_hash.lower() != clean_server_hash.lower():
                    print('deleting because hash did not match')
                    command = f"Remove-Item -Path '{self.file}' "
                    process = subprocess.Popen(
                        # ["powershell.exe", "D:\\SIH\\Stack-Smashers\\backend\\test.ps1"],
                        ["powershell.exe", command],
                        shell=True,
                        stdout=subprocess.PIPE,
                        stderr=subprocess.PIPE,
                    )
            out, err = process.communicate()
            print(err.decode("utf-8"))
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

    # watch.block_with_tkinter('uwu')

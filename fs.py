from asyncio import events
import time
from turtle import bgcolor, color, width
from click import command
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from tkinter import *
from PIL import ImageTk, Image

import subprocess
from threading import Thread, local
import os
import requests, json
import uuid
import time
OPTIONS = [
    "VLC Media Player",
    "Discord",
    "Onedrive",
    "Teams",
    "Slack",
    "Whatsapp",
    "arch-linux",
    "audacity",
    # "Other ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "Other"
]

authorized_apps_url = "https://tdx-nis130.vercel.app/api/authorized_apps"

def report_incidence(file):
    uuuid = hex(uuid.getnode())
    ts = int(time.time() * 1000)
    data = {"uuid": uuuid, "epoch": ts, "file": file}
    print(uuuid)
    requests.post(url="http://192.168.198.55:3000/api/incidents", data=data)


class WatchDir:
    watchDirectory = "C:\\Users\\Jayesh\\Downloads"

    def __init__(self):
        self.observer = Observer()

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

class GUIWithTK:
    # Set the directory on watch
    # watchDirectory = "C:\\Users\\Jayesh\\Downloads\\"
    def __init__(self):
        self.root = Tk()
        self.file = ""

    def block_with_tkinter(self, file):
        self.file = file
        
        
        w = Canvas(self.root, width=2000, height=300)
        w.create_rectangle(0, 0, 2000, 300, fill="#C0C0C0", outline = '#C0C0C0')
        w.create_rectangle(0,0, 2000, 300, fill="#C0C0C0", outline = '#C0C0C0') 
        w.pack()
        
        
        
        # img=Image.open("./assets/warning_logo.png")
        # resized_image=img.resize((120,120))
        # final_image = ImageTk.PhotoImage(resized_image)
        # panel = Label(self.root, image = final_image,bg="#C0C0C0")
        # panel.place(relx=.18, rely=.15,anchor= CENTER)
        
        
        program = StringVar(self.root, value="Select program")
        self.root.geometry("650x250")
        # self.root.wm_attributes("-transparentcolor", 'grey')
        
        warning_text = Label(
            self.root,
            text="Action blocked by your organization!",
            font=("Roboto bold", 50,"underline"),
            bg="#C0C0C0",
            fg="red"
        )
        warning_text.place(relx=.5, rely=.15,anchor= CENTER)
        
        label = Label(
            self.root,
            text="Please select the program that you are trying to install",
            font=("Roboto bold", 30),
            bg="white",
        )
        label.place(relx=.5, rely=.5,anchor= CENTER)
        # label.grid(row=0, column=0, padx=(100, 10))``
        # label.config(bg='black',fg='white')
        # label.grid(padx=100, pady=100, sticky="N")
        self.root.attributes("-fullscreen", True, "-topmost", True,'-alpha',1)
        # self.root.attributes("-fullscreen", True, "-fullscreen",True,'-alpha',1)
        
        
        self.root.configure(bg="white")
        option_menu = OptionMenu(self.root, program, *OPTIONS, command=self.change)
        option_menu.config(width=15,fg='black',font=("Roboto bold", 15))
        option_menu.place(relx=0.5, rely=0.6,anchor= CENTER)
        # contents = Frame(self.root)
        # contents.config(width=50)
        # contents.grid(row=1, column=1)
        self.root.mainloop()

    def delete_frame(self):
        try:
            while True:
                self.root.destroy()
        except:
            return


    def change(self,*args):
            if args[0] == "Other":
                self.delete_frame()
                print(self.file)
                command = f"Remove-Item -Path '{self.file}' "
                process = subprocess.Popen(
                    # ["powershell.exe", "D:\\SIH\\Stack-Smashers\\backend\\test.ps1"],
                    ["powershell.exe", command],
                    shell=True,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                )
                report_incidence(self.file)
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
                if not response.status_code == 200:
                    # hasher = response.json().get("data").get("hash")
                    local_hash = out.decode("utf-8")
                    escapes = "".join([chr(char) for char in range(1, 32)])
                    clean_local_hash = local_hash.translate(str.maketrans("", "", escapes))
                    # clean_server_hash = hasher.translate(str.maketrans("", "", escapes))
                    clean_local_hash = local_hash.translate(str.maketrans("", "", escapes))
                    # clean_server_hash = hasher.translate(str.maketrans("", "", escapes))
                    clean_server_hash = "helo world"
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
                        report_incidence(self.file)
                out, err = process.communicate()
                print(err.decode("utf-8"))
                self.delete_frame()

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
            return None

class Handler(FileSystemEventHandler):
    
    @staticmethod
    def on_any_event(event):
        gobj = GUIWithTK()
        print("hello world " + event.event_type)
        if event.is_directory:
            return print("directory event")
        elif event.event_type == "created":
            file = event.src_path
            if ("part" not in file) and ("tmp" not in file):
                temp = gobj.wait_till_file_is_created(file)
                if temp is not None:
                    gobj.block_with_tkinter(file)
                    print("Watchdog received created event - % s." % event.src_path)
        elif event.event_type == "modified":
            file = event.src_path
            print(file)
            if ("part" not in file) and ("tmp" not in file):
                gobj.wait_till_file_is_created(file)
                if ("part" not in file) and ("tmp" not in file):
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
        gobj.delete_frame()


if __name__ == "__main__":
    watch = WatchDir()
    watch.run()
    report_incidence('uwu')

import subprocess
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import json
import socket
import uuid
import time
import threading
import time

import time
import atexit

from apscheduler.schedulers.background import BackgroundScheduler


app = Flask(__name__)
CORS(app)

allowedCommands = [
    "Get-Package -IncludeWindowsInstaller -Name *| select Name, Version | ConvertTo-Json",
    "dir",
    "ls",
    'Get-Package -Provider Programs -IncludeWindowsInstaller -Name "VLC media player" |  % { & ($_.Meta.Attributes["UninstallString"] -replace \'"\') /S}',
]


@app.route("/", methods=["POST", "GET"])
def index():
    if request.method == "POST":
        command = request.json
        command = command["command"]
        print(command)
        command = command.strip()
        if command in allowedCommands:
            process = subprocess.Popen(
                # ["powershell.exe", "D:\\SIH\\Stack-Smashers\\backend\\test.ps1"],
                ["powershell.exe", command],
                shell=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
            )
            out, err = process.communicate()

            return {
                "out": out.decode("utf-8"),
                "err": err.decode("utf-8"),
                "command": command,
            }
        return "uwu, not allowed", 403

    if request.method == "GET":
        return "ping pong"


@app.route("/data", methods=["GET"])
def user_data():
    process = subprocess.Popen(
        # ["powershell.exe", "D:\\SIH\\Stack-Smashers\\backend\\test.ps1"],
        ["powershell.exe", "Get-NetIPConfiguration | ConvertTo-Json"],
        shell=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    out, err = process.communicate()

    return {
        "out": out.decode("utf-8"),
        "err": err.decode("utf-8"),
    }


@app.route("/hardware", methods=["GET"])
def user_hw_data():
    process = subprocess.Popen(
        # ["powershell.exe", "D:\\SIH\\Stack-Smashers\\backend\\test.ps1"],
        ["powershell.exe", "Get-ComputerInfo | ConvertTo-Json"],
        shell=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    out, err = process.communicate()

    return {
        "out": out.decode("utf-8"),
        "err": err.decode("utf-8"),
    }


@app.route("/ip", methods=["GET"])
def user_ip_data():
    process = subprocess.Popen(
        # ["powershell.exe", "D:\\SIH\\Stack-Smashers\\backend\\test.ps1"],
        ["powershell.exe", "ipconfig"],
        shell=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    out, err = process.communicate()

    return {
        "out": out.decode("utf-8"),
        "err": err.decode("utf-8"),
    }


def register_pc():
    hostname = socket.gethostname()
    ipv4 = socket.gethostbyname(hostname)
    uuuid = hex(uuid.getnode())
    ts = int(time.time() * 1000)
    data = {"hostname": hostname, "ipv4": ipv4, "uuid": uuuid, "epoch": ts}
    print(data)
    result = requests.post(url="http://192.168.198.55:3000/api/status", data=data)
    print(result.status_code)

@app.before_first_request
def init_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(func=register_pc, trigger="interval", seconds=10)
    scheduler.start()
    # Shut down the scheduler when exiting the app
    atexit.register(lambda: scheduler.shutdown())

if __name__ == "__main__":
    register_pc()
    init_scheduler()
    app.run(port=8080, debug=True, use_reloader=False)

from base64 import decode
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
    "ping google.com",
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


def wlan_ip():
    import subprocess

    result = subprocess.run(
        "ipconfig", stdout=subprocess.PIPE, text=True
    ).stdout.lower()
    scan = 0
    for i in result.split("\n"):
        if "wireless" in i:
            scan = 1
        if scan:
            if "ipv4" in i:
                return i.split(":")[1].strip()


def register_pc():
    hostname = socket.gethostname()
    ipv4 = wlan_ip()
    uuuid = hex(uuid.getnode())
    ts = int(time.time() * 1000)
    data = {"hostname": hostname, "ipv4": ipv4, "uuid": uuuid, "epoch": ts}
    print(data)
    try:
        post = requests.post(url="http://192.168.192.118:3000/api/status", data=data)
        print(post.status_code)
    except Exception as e:
        print(e)


@app.before_first_request
def init_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(func=register_pc, trigger="interval", seconds=300)
    scheduler.start()
    # Shut down the scheduler when exiting the app
    atexit.register(lambda: scheduler.shutdown())


if __name__ == "__main__":
    register_pc()
    init_scheduler()
    app.run(host="0.0.0.0", port=8080, debug=True, use_reloader=False)

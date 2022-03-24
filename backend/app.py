import subprocess
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

allowedCommands = [
    "Get-Package -IncludeWindowsInstaller -Name *| select Name, Version | ConvertTo-Json",
    "dir",
    "ls",
    "Get-Package -Provider Programs -IncludeWindowsInstaller -Name \"VLC media player\" |  % { & ($_.Meta.Attributes[\"UninstallString\"] -replace '\"') /S}"
]


@app.route("/", methods=["POST", "GET"])
def index():
    if request.method == "POST":
        command = request.json
        command = command["command"]
        print(command)
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


if __name__ == "__main__":
    app.run(port=8080, debug=True)

from flask import Flask
import subprocess

app = Flask(__name__)


@app.route("/", methods=["POST", "GET"])
def index():
    return "Hello How are you?"


if __name__ == "__main__":
    pscommand = "Write-Host 'Hello Wolrd!'"
    process = subprocess.Popen(
        ["powershell.exe", "-NoProfile", "-Command", pscommand], shell=True
    )
# app.run(port = 5000)

from urllib import request
import subprocess
from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route("/", methods=["POST", "GET"])
def index():

    if request.method == "POST":
        command = request.form.get("command")
        process = subprocess.Popen(
            # ["powershell.exe", "D:\\SIH\\Stack-Smashers\\backend\\test.ps1"],
            ["powershell.exe", command],
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
        out, err = process.communicate()
        return {"test.ps1": out.decode("utf-8"), "err": err.decode("utf-8")}

    if request.method == "GET":
        return "ping pong"


if __name__ == "__main__":
    app.run(port=8080, debug=True)

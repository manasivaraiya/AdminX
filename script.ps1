
start python D:\SIH\Stack-Smashers\backend\app.py
$uuid=getmac | Foreach {($_ -split '\s+',4)[0]} | Select -Index 3
lt --port 8080 --subdomain $uuid.ToLower()
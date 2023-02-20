from bs4 import BeautifulSoup

f = open('arq.xml', "r")

soup = BeautifulSoup(f, "xml")


html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Index</title>
        <meta charset="utf-8" />
    </head>
    <body>
        <h1>Index</h1>
            <ul>
"""


index = 1
for elem in soup.find_all('ARQELEM'):
    f = open('files/arq'+str(index)+'.xml', "w")
    index += 1
    f.write(str(elem))
    f.close()
    html += "<li><a href=\"/" + \
        str(index) + "\">" + str(elem.find("IDENTI").text) +"</a></li>"


html += """
</ul>
</body>
</html>
"""

file = open('index.html', 'w')
file.write(html)
file.close()

from bs4 import BeautifulSoup
import re

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


def to_html(elem, index):
    html = f"""
<!DOCTYPE html>
<html>
    <head>
        <title>Arq  {elem.find("IDENTI").text}</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1>Arq {elem.find("IDENTI").text}</h1>
       
"""
    for tag in elem.find_all():
        html += "<div>" + tag.text + "</div>"

    html += """ <a href="/" >Back to Index </a></body> </html> """
    f = open('files/arq'+str(index)+'.html', "w")
    f.write(html)
    f.close()


index = 1
for elem in soup.find_all('ARQELEM'):
    f = open('files/arq'+str(index)+'.xml', "w")
    to_html(elem, index)
    index += 1
    f.write(str(elem))
    f.close()
    html += "<li><a href=\"/" + \
        str(index) + "\">" + str(elem.find("IDENTI").text) + "</a></li>"


html += """
</ul>
</body>
</html>
"""


file = open('index.html', 'w')
file.write(html)
file.close()

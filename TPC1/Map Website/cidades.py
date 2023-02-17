import json

file = open("mapa.json", "r")

json = json.load(file)

cities = sorted(json["cidades"], key=lambda elem: elem["nome"])
conections = sorted(json["ligações"], key=lambda elem: elem["origem"])

def getConnections(city):
    list = []
    for elem in conections:
        cityName = ""
        if elem["origem"] == city:
            for cidade in cities:
                if cidade["id"] == elem["destino"]:
                    cityName = cidade["nome"]
            list.append({"id": elem["destino"], "destiny": cityName, "distance": elem["distância"]})
    return list

output = open("map.html", "w+")

webpage = """<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Mapa Virtual</h1>
        <table>
            <tr>
                <td witdh="30%" valign="top">
                    <h3><a name="indice"/>Índice</h3>
                    <ul>
"""

for elem in cities:
    webpage += f'<li><a href="#{elem["id"]}">{elem["nome"]}</a>\n</li>\n'

webpage += "</td><td width=\"70%\">"

for elem in cities:
    webpage += f'<a name="{elem["id"]}"/>\n'
    webpage += f'<h3>{elem["nome"]}</h3>\n'
    webpage += f'<p><b>População</b>: {elem["população"]}</p>\n'
    webpage += f'<p><b>Distrito</b>: {elem["distrito"]}</p>\n'
    webpage += f'<p><b>Descrição</b>: {elem["descrição"]}</p>\n'
    webpage += f'<p><b>Ligações</b>:</p>\n'
    for connection in getConnections(elem["id"]):
        webpage += f'<li><a href="#{connection["id"]}">{connection["destiny"]}</a> <b>Distância</b>: {connection["distance"]}</li>\n'

    webpage += '<br/><address>[<a href="#indice"> Voltar para o Índice]</address>\n'
    webpage += f'<center><hr width="80%"/></center>\n'
    

webpage += """</td>
            </tr>
        </table>
    </body>
</html>
"""

output.write(webpage)



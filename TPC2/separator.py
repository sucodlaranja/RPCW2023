from bs4 import BeautifulSoup

f = open('arq.xml', "r")


soup = BeautifulSoup(f, "xml")
print(soup.prettify().split('<ARQELEM>')[1])

for index,elem in enumerate(soup.prettify().split('<ARQELEM>')):
    if(index > 0):
        f = open('files/arq'+str(index)+'.xml', "w")
        elem = '<ARQELEM>'+elem
        f.write(elem)

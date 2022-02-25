import requests
from bs4 import BeautifulSoup

vgm_url = 'http://127.0.0.1:5000/'
html_text = requests.get(vgm_url).text
soup = BeautifulSoup(html_text, 'html.parser')

for link in soup.find_all('a'):
  print(link.get('href'))

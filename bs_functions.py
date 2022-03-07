import requests
from bs4 import BeautifulSoup

def get_all_url(debug = False):
  vgm_url = 'http://127.0.0.1:5000/'
  html_text = requests.get(vgm_url).text
  soup = BeautifulSoup(html_text, 'html.parser')
  list = []
  for link in soup.find_all('a'):
    if debug:
      print(link.get('href'))
    list.append(link.get('href'))
  return list

if __name__ == "__main__":
  get_all_url(debug = True)
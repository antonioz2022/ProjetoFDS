
from django.test import TestCase, LiveServerTestCase
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium import webdriver
import time

driver = webdriver.Chrome()

class Pet4YouTestCase(LiveServerTestCase):
    def test_cen1(self):
        #Dado 
        driver.get("http://127.0.0.1:8000/pet4you_app/login/")
        user = driver.find_element(by = By.NAME, value="username")
        nome_user = driver.find_element(by = By.NAME, value="username")
        senha = driver.find_element(by = By.NAME, value="password")
        botao = driver.find_element(by = By.NAME, value="submit")
        user.send_keys(f"tempz")
        senha.send_keys("tempz7")
        time.sleep(2)
        botao.send_keys(Keys.ENTER)
        time.sleep(5)

 

from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, "test1/index.html")

def greet(request, name):
    return render(request, "test1/greet.html", {
        "name": name.capitalize()
    })
# Create your views here.

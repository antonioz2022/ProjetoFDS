from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.shortcuts import redirect
from .models import Pet
from django.contrib import messages
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from .forms import PetForm



def createPost(request):
   p = Pet.objects.all()
   if(request.method == 'POST'):
       name = request.POST.get('name')
       species = request.POST.get('species')
       breed = request.POST.get('breed')
       age = request.POST.get('age')
       description = request.POST.get('description')
       owner = request.user
       pet = Pet(name=name, species=species,breed=breed,age=age,description=description, photo='',created_at='',owner=owner)
       pet.save()
       return redirect("pet4you:home")
   else:
       return render(request, 'posting.html')

def listPets(request):
    user = request.user 
    pets = Pet.objects.filter(owner=user)
    return render(request, 'list.html', {'pets': pets})


def authView(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST or None)
        if form.is_valid():
            form.save()

            return redirect("pet4you:login")
    else:
        form = UserCreationForm()

    return render(request, "registration/signup.html", {"form": form})


def logout_view(request):
    logout(request)
    return redirect("pet4you:login")

def login():
    pass

def signup():
    pass


def home(request):
    return render(request, "home.html", {})

def edit_post(request, pet_id):  
    pet = get_object_or_404(Pet, pk=pet_id)

    if request.method == 'POST':
        form = PetForm(request.POST, instance=pet)
        if form.is_valid():
            form.save()
            return redirect('pet4you:home')
    else:
        form = PetForm(instance=pet)

    return render(request, 'edit_post.html', {'form': form})

from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.shortcuts import redirect
from django.contrib import messages
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import logout as auth_logout
from django.db.models import Q
from .models import Pet
from .models import Report
from .forms import PetForm




def createPost(request):
    if request.method == 'POST':
        form = PetForm(request.POST)
        if form.is_valid():
            form.instance.owner = request.user
            form.save()
            return redirect('pet4you:home')  
    else:
        form = PetForm()
    return render(request, 'posting.html', {'form': form})

def favoritar_pet(request, pet_id):
    pet = get_object_or_404(Pet, id=pet_id)
    if(pet.favorited == False):
        pet.favorited = True
    else:
        pet.favorited = False
    pet.save()
    return redirect('pet4you:home')

def desfavoritar_pet(request, pet_id):
    pet = get_object_or_404(Pet, id=pet_id)
    pet.favorited = False
    pet.save()
    return redirect('pet4you:favorite')

def listPets(request):
    user = request.user 
    pets = Pet.objects.filter(owner=user)
    return render(request, 'list.html', {'pets': pets})

def listFavorites(request):
    user = request.user 
    pets = Pet.objects.filter(favorited=True)
    return render(request, 'favorite.html', {'pets': pets})

def add_report(request, pet_id):
    reports = Report.objects.all()
    pet = get_object_or_404(Pet, pk=pet_id)
    if(request.method == 'POST'):
        text = request.POST.get('text')
        reporter = request.user
        report = Report(reporter=reporter,pet=pet, text=text)
        report.save()
        return redirect("pet4you:home")
    else:
        return render(request, 'report.html', {'pet': pet})

def report_admin_view(request, report_id):
    report = get_object_or_404(Report, pk=report_id)
    pet = report.pet
    return render(request, 'report_admin.html', {'report': report, 'pet': pet})



def list_reports(request):
    reports = Report.objects.all()
    return render(request, 'report_list.html', {'reports' : reports} )


def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')  
    else:
        form = AuthenticationForm()
    return render(request, 'registration/login.html', {'form': form})

def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('home')  
    else:
        form = UserCreationForm()
    return render(request, 'registration/signup.html', {'form': form})

def logout(request):
    auth_logout(request)
    return redirect('home')

def home(request):
    pets_para_adocao = Pet.objects.filter(favorited=False)  # Recupera todos os pets para adoção
    return render(request, "home.html", {'pets_para_adocao': pets_para_adocao})


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




def listar_pets(request):
    pets = Pet.objects.all()
    return render(request, 'listarpet.html', {'pets': pets})

def delete_post(request, pet_id):
    pet = get_object_or_404(Pet, id=pet_id)

    # Verifica se o usuário é o dono do pet antes de permitir a exclusão
    if request.user == pet.owner:
        pet.delete()
        # Redireciona de volta para a página inicial ou outra página apropriada
        return redirect('pet4you:home')
    else:
        # Redireciona para uma página de erro ou mostra uma mensagem de erro
        return redirect('pet4you:home')  # Redireciona para a home por padrão


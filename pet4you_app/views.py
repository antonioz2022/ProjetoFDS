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
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.contrib.auth.models import User


@csrf_exempt
@require_POST
def create_admin_user(request):
    username = "anton"
    password = "123456"
    if not User.objects.filter(username=username).exists():
        user = User.objects.create_superuser(username=username, email='admin@example.com', password=password)
        user.save()
        return JsonResponse({'status': 'admin_created'})
    else:
        return JsonResponse({'status': 'admin_exists'})

def createPost(request):
   p = Pet.objects.all()
   if(request.method == 'POST'):
       name = request.POST.get('name')
       species = request.POST.get('species')
       breed = request.POST.get('breed')
       age = request.POST.get('age')
       description = request.POST.get('description')
       photo = request.POST.get('photo')
       owner = request.user
       
       #Validation:
       errors = {}
       if not photo:
            errors['photo'] = 'Photo is required.'
       if not name:
            errors['name'] = 'Name is required.'
       if not age:
            errors['age'] = 'Age is required.'
       if not breed:
            errors['breed'] = 'Breed is required'
       if not species:
            errors['species'] = 'Species is required'
       if age != '':
           if int(age) > 99:
             errors['age'] = 'Age has to be under 99'

       if errors:
            return render(request, 'posting.html', {'errors': errors})
        
       pet = Pet(name=name, species=species,breed=breed,age=age,description=description, photo=photo,created_at='',owner=owner,favorited=False)
       pet.save()
       messages.success(request, 'Pet created successfully.')
       return redirect("pet4you:home")
   else:
       return render(request, 'posting.html')

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
    # Recupera o objeto Pet que será editado
    pet = get_object_or_404(Pet, pk=pet_id)

    if request.method == 'POST':
        name = request.POST.get('name')
        species = request.POST.get('species')
        breed = request.POST.get('breed')
        age = request.POST.get('age')
        description = request.POST.get('description')
        photo = request.POST.get('photo')
        owner = request.user
        
         #Validation:
        errors = {}
        if not photo:
            errors['photo'] = 'Photo is required.'
        if not name:
            errors['name'] = 'Name is required.'
        if not age:
            errors['age'] = 'Age is required.'
        if not breed:
            errors['breed'] = 'Breed is required'
        if not species:
            errors['species'] = 'Species is required'
        if age != '':
           if int(age) > 99:
             errors['age'] = 'Age has to be under 99'

        if errors:
            return render(request, 'edit_post.html', {'errors': errors, 'pet': pet})
        
        pet.name = name
        pet.species = species
        pet.breed = breed
        pet.age = age
        pet.description = description
        pet.photo = photo
        
        pet.save()
        return redirect("pet4you:home")
    else:
        # Renderiza o template de edição com os dados atuais do pet
        return render(request, 'edit_post.html', {'pet': pet})




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

    
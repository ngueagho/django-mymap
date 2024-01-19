from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from .forms import VillesForm
from .models import Villes
# Create your views here.
# def home(request):
#     context = {"message": "hello !"}
#     template = loader.get_template("templates/robertoapp/index.html")
#     return HttpResponse(template.render(context,request))

# def index(request):
#     return HttpResponse("bienvenue")

def mymap(request):
    return render(request, 'mymap.html')

def addcity(request):
    return render(request, 'enregistrement.html')



def create_ville_view(request):
    form = VillesForm()

    # Traitement du formulaire soumis
    if request.method == 'POST':
        form = VillesForm(request.POST)
        if form.is_valid():
            form.save()
            # Redirection ou autre traitement après l'enregistrement réussi
            # {"<p>enregistrement reussi</p>"}

    context = {'form': form}
    return render(request, 'create_ville.html', context)


def ville_list_view(request):
    villes = Villes.objects.all()
    context = {'villes': villes}
    return render(request, 'ville_list.html', context)


def create_ville(request):
    if request.method == 'POST':
        form = VillesForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')  # Redirige vers la page d'accueil ou une autre page appropriée
    else:
        form = VillesForm()
    return render(request, 'villes/create.html', {'form': form})
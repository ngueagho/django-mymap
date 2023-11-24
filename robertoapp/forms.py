from django import forms
from .models import Villes

class VillesForm(forms.ModelForm):
    class Meta:
        model = Villes
        fields = ['name', 'latitude', 'longitude']
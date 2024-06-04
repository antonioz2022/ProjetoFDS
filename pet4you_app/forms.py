# forms.py
from django import forms

class PetFilterForm(forms.Form):
    species = forms.CharField(max_length=100, required=False)
    breed = forms.CharField(max_length=100, required=False)
    age = forms.IntegerField(required=False)
    name = forms.CharField(max_length=100, required=False) 
    
    

# forms.py
from django import forms
from .models import Vaccine

class VaccineForm(forms.ModelForm):
    class Meta:
        model = Vaccine
        fields = ['name', 'date', 'next_due_date']
        widgets = {
            'date': forms.DateInput(attrs={'type': 'date'}),
            'next_due_date': forms.DateInput(attrs={'type': 'date'}),
        }

class PetFilterForm(forms.Form):
    species = forms.CharField(max_length=100, required=False)
    breed = forms.CharField(max_length=100, required=False)
    age = forms.IntegerField(required=False)
    name = forms.CharField(max_length=100, required=False) 
    
    

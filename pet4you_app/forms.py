# forms.py
from django import forms
from .models import Vaccine
import datetime
from django.core.exceptions import ValidationError

class VaccineForm(forms.ModelForm):
    class Meta:
        model = Vaccine
        fields = ['name', 'date', 'next_due_date']
        widgets = {
            'date': forms.DateInput(attrs={'type': 'date'}),
            'next_due_date': forms.DateInput(attrs={'type': 'date'}),
        }
        
    def clean_date(self):
        date = self.cleaned_data['date']
        if date > datetime.date.today():
            raise ValidationError("A data da vacina não pode ser futura.")
        return date

    def clean_next_due_date(self):
        next_due_date = self.cleaned_data['next_due_date']
        if next_due_date != None and next_due_date < datetime.date.today():
            raise ValidationError("A próxima dose não pode ser uma data passada.")
        return next_due_date

class PetFilterForm(forms.Form):
    species = forms.CharField(max_length=100, required=False)
    breed = forms.CharField(max_length=100, required=False)
    age = forms.IntegerField(required=False)
    name = forms.CharField(max_length=100, required=False) 
    
    

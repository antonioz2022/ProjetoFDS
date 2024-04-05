

from django import forms
from .models import Pet

class PetForm(forms.ModelForm):
    class Meta:
        model = Pet
        fields = ['name', 'species', 'breed', 'age', 'description', 'photo']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['name'].widget.attrs['placeholder'] = 'Nome do animal'
        self.fields['species'].widget.attrs['placeholder'] = 'Espécie do animal'
        if 'breed' in self.fields:  
            self.fields['breed'].widget.attrs['placeholder'] = 'Raça do animal (opcional)'
        self.fields['age'].widget.attrs['placeholder'] = 'Idade do animal (em anos)'
        self.fields['description'].widget.attrs['placeholder'] = 'Descrição do animal (opcional)'

        self.fields['name'].widget.attrs['class'] = 'form-control'
        self.fields['species'].widget.attrs['class'] = 'form-control'
        if 'breed' in self.fields: 
            self.fields['breed'].widget.attrs['class'] = 'form-control'
        self.fields['age'].widget.attrs['class'] = 'form-control'
        self.fields['description'].widget.attrs['class'] = 'form-control'

    def clean_age(self):
        age = self.cleaned_data.get('age')
        if age is not None and age <= 0:
            raise forms.ValidationError("A idade deve ser um número positivo")
        return age

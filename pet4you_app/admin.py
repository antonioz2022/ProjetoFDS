from django.contrib import admin
from .models import Pet, Report, Vaccine

admin.site.register(Pet)
admin.site.register(Report)
admin.site.register(Vaccine)

# Register your models here.

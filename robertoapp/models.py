from django.db import models

# Create your models here.
class Villes(models.Model):
    name = models.CharField(max_length= 100, unique = True)
    latitude = models.FloatField(null=False)
    longitude = models.FloatField(null=False)
from django.urls import path
from . import views

# urlpatterns = [
#     path('', views.mymap, name='mymap')
# ]
# urlpatterns = [
#     path('', views.addcity, name='addcity')
# ]
urlpatterns = [
    path('create/', create_ville, name='create_ville'),
    # Autres URL de votre application
]
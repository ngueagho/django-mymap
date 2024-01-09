FROM ubuntu:20.04

RUN apt update

RUN apt install python3-pip -y

RUN python3 -m pip install django

RUN apt install tree -y

RUN apt install vim -y

RUN apt install curl -y

RUN echo "alias python='python3'" >> ~/.bashrc

RUN apt-get install iputils-ping -y

RUN cd /home/ && django-admin startproject robertoproject

RUN apt update

WORKDIR /home/robertoproject/

RUN python3 manage.py startapp robertoapp

RUN python3 /home/robertoproject/manage.py migrate

RUN apt update -y

RUN pip install psycopg2-binary

RUN DEBIAN_FRONTEND=noninteractive apt install postgresql -y

RUN DEBIAN_FRONTEND=noninteractive apt install openssh-server -y

RUN apt install iproute2 -y

RUN apt install postgresql -y

USER root

RUN rm -R /home/robertoproject/*





# RUN mkdir /home/source/

# # Copie tous les fichiers du répertoire source vers un répertoire temporaire
# COPY ./django-mymap/. /home/source/.




# # Exclure le dossier spécifique (hl) en utilisant une instruction RUN
# RUN rm -Rf /home/source/.git
# RUN rm -Rf /home/source/LICENSE
# RUN rm -Rf /home/source/README.md

# # Copie des fichiers restants vers le répertoire de destination
# COPY /home/source/. /home/robertoproject/

# # Supprimer le répertoire temporaire
# RUN rm -rf /home/source








COPY    .  /home/robertoproject/

EXPOSE 8000

# CMD python3 /home/robertoproject/manage.py runserver 0.0.0.0:8000
CMD ["python3","/home/robertoproject/manage.py","runserver","0.0.0.0:8000"]
# CMD ["python3","/home/robertoproject/manage.py","runserver","0.0.0.0:8000"]

# ENTRYPOINT ["python3"] 
# CMD ["manage.py", "runserver", "0.0.0.0:8000"]


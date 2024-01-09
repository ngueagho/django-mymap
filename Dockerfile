FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    python3-pip \
    tree \
    vim \
    curl \
    iputils-ping \
    postgresql \
    openssh-server \
    iproute2

RUN echo "alias python='python3'" >> ~/.bashrc

RUN python3 -m pip install django psycopg2-binary

WORKDIR /home/

RUN django-admin startproject robertoproject

WORKDIR /home/robertoproject/

RUN python3 manage.py startapp robertoapp

RUN python3 manage.py migrate

EXPOSE 8000

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
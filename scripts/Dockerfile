FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /scripts
WORKDIR /scripts
ADD requirements.txt /scripts/
RUN apt-get -qq update
RUN apt-get -qq -y install postgresql
RUN pip install -r requirements.txt
ADD . /scripts/
CMD python3 clock.py

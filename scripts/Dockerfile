FROM python:3.3.6-alpine
ENV PYTHONUNBUFFERED 1
RUN mkdir /scripts
WORKDIR /scripts
ADD requirements.txt /scripts/
RUN pip install -r requirements.txt
ADD . /scripts/
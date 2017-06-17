FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /scripts
WORKDIR /scripts
ADD requirements.txt /scripts/
RUN pip install -r requirements.txt
ADD . /scripts/
# Set the name of the virtual environment
VENV_NAME = .venv
PYTHON_VERSION = 3

venv:
	python$(PYTHON_VERSION) -m venv $(VENV_NAME)

install:
	. $(VENV_NAME)/bin/activate && pip install -r requirements.txt

setup: venv install	

run:
	. $(VENV_NAME)/bin/activate && python -m app.main


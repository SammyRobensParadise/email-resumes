# email-resumes
> A short python script to email resume critique pairs for SYDE Resume Critiques.


## It expects a CSV file that looks like the following


| Requester Student Name 	| Requester Student Email 	| Provider Student Name 	| Provider Student Email 	|
|------------------------	|-------------------------	|-----------------------	|------------------------	|
| Test Name              	| email@email.com         	| Sammy                 	| email2@email.com       	|
|                        	|                         	|                       	|                        	|

## Usage:

1. Clone
```bash

git clone https://github.com/SammyRobensParadise/email-resumes
```

2. install dependencies. I use pip but do whatever floats your boat
```bash
pip install -r requirements.txt
```
3. Update any copy and change:
```python
sender_email = "srobensp@uwaterloo.ca"
```
to
```python
sender_email = "your_username@uwaterloo.ca"
```
4. change the filepath in to `df = pd.read_csv("path/to/csv.csv")` and run `main.py`

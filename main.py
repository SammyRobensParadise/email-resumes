import smtplib, ssl
import pandas as pd
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart



def main():
    df = pd.read_excel('')

    smtp_server = 'mailservices.uwaterloo.ca'

    port = 465
    # port = 587
    sender_email = ''
    username = input('username: ')
    password = input('password: ')

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.login(username, password)

        for i in range(0, len(df.index)):
            print("hello")


if __name__ == "__main__":
    main()
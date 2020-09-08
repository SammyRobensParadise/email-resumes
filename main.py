import smtplib, ssl
import pandas as pd
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def make_message(frame, index):

    """
    returns a string message
    """

    contents = ''
    contents = contents + "Hi " + frame['Incoming Student Name'][index] + "! \n"
    contents = contents + " You've been matched with an upper-year SYDE student, " + frame['Upper Year Student Name'][
        index] + "\n " \
                 "who has volunteered to give you feedback on your resume!"
    contents = contents + "I have done my best to pair you up with an upper year student" \
                          "with experience in a field you are interested in" \
                          "but it is possible it wont be an 'exact' match. With that being said," \
                          " I am sure the feedback will be of value to you! \n\n"
    contents = contents + "It is your responsibility to reach" \
                          "out to your upper year via email (" + frame['Upper Year Student Email'][index] + \
               ") to coordinate a REMOTE resume critique." \
               " I suggest sending an initial copy of your resume" \
               "Then meeting via Zoom or Google Meet / your preferred video conferencing tool" \
               "To discuss feedback. If you would also like a website critique, please also send a link" \
               " to the published site to your upper-year volunteer. \n\n"
    contents = contents + "If you have any questions email me (Sammy, SYDE 2023) at srobensp@uwaterloo.ca."
    return contents


def main():
    df = pd.read_csv('/Users/sammyrobens-paradise/projects/email-resumes/Pairs.csv')
    smtp_server = 'mailservices.uwaterloo.ca'

    port = 465
    sender_email = 'srobensp@uwaterloo.ca'
    username = input('username: ')
    password = input('password: ')

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.login(username, password)

        for i in range(0, len(df.index)):
            message_to_users = MIMEMultipart()
            message_to_users['From'] = sender_email
            message_to_users['To'] = df['Incoming Student Email'][i]
            message_to_users['Cc'] = df['Upper Year Student Email'][i]
            message_to_users['Subject'] = 'OFFICIAL - Your Resume Critique has a match!'
            message_to_users.attach(MIMEText(make_message(df, i)), 'plain')
            message_to_users = message_to_users.as_string()
            server.sendmail(sender_email, df['Incoming Student Email'][i], message_to_users)


if __name__ == "__main__":
    main()

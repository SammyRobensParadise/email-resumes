import smtplib
import ssl
import pandas as pd
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def make_message(frame, index):
    """
    returns a string message
    """

    contents = ""
    contents = contents + "<h2>Hi " + frame["Requester Student Name"][index] + "! 👋 </h2>\n"
    contents = (
            contents
            + "<p><b>You've been matched with a SYDE student, "
            + frame["Provider Student Name"][index]
            +
            "who has volunteered to give you feedback on your resume!</b></p>"
    )
    contents = (
            contents + "<p>I have done my best to pair you up with an upper year student "
                       "with experience in a field you are interested in "
                       "but it may not be an 'exact' match, and I apologize in advance. With that being said,"
                       " I am sure the feedback will be of value to you!</p>"
    )
    contents = (contents + "<h3>You have requested the following:</h3><ul><li>Resume Critique: " +
                frame["Resume Critique"][
                    index] + "</li>" \
                + "<li>Website Critique: " + frame["Website Critique"][index] +
                "</li></ul><p>Please have the above ready for your session!</p>")
    contents = (
            contents + "<p>It is your responsibility to reach "
                       "out to your upper year via email ("
            + frame["Provider Student Email"][index]
            + ") to coordinate a REMOTE resume critique. They are also Cc'd on this email."
              " I suggest sending a copy of your resume in PDF form. "
              "Then meeting via Zoom or Google Meet / your preferred video conferencing tool 📹 "
              "to discuss feedback. If you have opted for a website critique, please also include a link"
              " to the published site."
              " I wish you the best this winter term!<p>"
    )
    contents = (
            contents
            + "<p>If you have any questions email me (Sammy, SYDE 2023) at srobensp@uwaterloo.ca."
              " or message me on the SYDE Discord.</p>"
              "<p>Thanks</p><p>Sammy</p><p><a href='https://sammy.world'>https://sammy.world</a>"
    )
    return contents


def main():
    df = pd.read_csv("/Users/sammyrobens-paradise/projects/email-resumes/software-users.csv")
    smtp_server = "mailservices.uwaterloo.ca"

    port = 465
    sender_email = "srobensp@uwaterloo.ca"
    username = input("username: ")
    password = input("password: ")

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.login(username, password)

        for i in range(0, len(df.index)):
            message_to_users = MIMEMultipart()
            message_to_users["From"] = sender_email
            message_to_users["To"] = df["Requester Student Email"][i]
            message_to_users["Cc"] = df["Provider Student Email"][i]
            message_to_users[
                "Subject"
            ] = "OFFICIAL ⚡️ - Your Resume Critique has a match! 🧠"
            message_to_users.attach(MIMEText(make_message(df, i), "html"))
            message_to_users = message_to_users.as_string()
            server.sendmail(
                sender_email, df["Requester Student Email"][i], message_to_users
            )
            print("send email " + str(i + 1) + " of " + str(len(df.index)))


if __name__ == "__main__":
    main()

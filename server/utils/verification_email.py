import random
import string
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config.config import Config

gmail_password = Config.GMAIL_KEY

def generate_verification_code():
    random_string = ''.join(random.choices(string.ascii_letters + string.digits, k=6))
    return random_string

def send_verification_code(receiver_email, verification_code):
    sender_email = "arijit.chakma.development@gmail.com"
    password = gmail_password

    subject = "Your Verification Code"
    plain_text_body = f"Your verification code is: {verification_code}"

    html_body = f"""
    <html>
    <body>
        <div style="text-align: center; font-family: Arial, sans-serif;">
            <h2 style="color: #4CAF50;">Your Verification Code</h2>
            <p style="font-size: 16px;">Thank you for registering! Your verification code is:</p>
            <p style="font-size: 24px; font-weight: bold; color: #333;">{verification_code}</p>
            <p style="font-size: 14px;">Please use this code to complete your registration.</p>
            <hr style="margin-top: 30px;">
            <p style="font-size: 12px; color: #777;">If you did not request this code, please ignore this email.</p>
        </div>
    </body>
    </html>
    """
    message = MIMEMultipart("alternative")
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject


    message.attach(MIMEText(plain_text_body, "plain"))
    message.attach(MIMEText(html_body, "html"))

    try:
        # Set up the server
        server = smtplib.SMTP("smtp.gmail.com", 587) 
        server.starttls()  
        server.login(sender_email, password)  
        
        # Send the email
        server.sendmail(sender_email, receiver_email, message.as_string())
        print("Verification email sent successfully!")
    except Exception as e:
        print(f"Failed to send email: {e}")
    finally:
        server.quit()
# Project Title
Basic Mern-Auth is a simple project that implements basic authentication via the mern stack.

## Project Description
This Application enable a user to sign up, login, logout, reset their password. Upon signing up a user is emailed a verification code, this code is used to verify the user. Upon resetting password user will be emailed regarding their passwords successful change. I used nodemailer to send emails with gmail. Gmail requires a pass key for third party applications, you need to create a google account, generate a pass key.
### Technologies Used
        Express
        Dotenv
        Mongoose
        Cors
        Jsonwebtoken
        Nodemailer
        Mongoose
        Cookie-Parser
        Bcryptjs
        Node.js
        vs Code
        git/git bash
  

#### Features
      signup
      login
      logout
      verify email
      reset password

##### Installation
1. git clone to your directory
2. npm install
3. create a google account, generate a pass key, create a .env file, store the google email and pass key there. You can access them via dotenv in Mailer/nodeMailer.mjs or you can hard code the values there.
4. The google account used will be sending all emails to users
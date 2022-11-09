//Get user cache data (API and USER ID) and create an action link (authentication link) 
//and apply it to the html template we created to send an email through the mail server.

//Call required modules using const

const admin = require('firebase-admin');
const ejs = require('ejs');
const sgMail = require('@sendgrid/mail');

//Declare the constants of the necessary environmental factors

const SENDGRID_KEY = process.env.SENDGRID_API_KEY
const VERIFIED_EMAIL = process.env.VERIFIED_SENDER

//Declares constants of the unique key values in the firebase (I deleted the keys)
const firebaseConfig = {
  "type": "service_account",
  "project_id": ..
  "private_key_id": ,,
  "private_key": ..
  "client_email": ..
  "client_id": ..
  "auth_uri": "
  "token_uri": "
  "auth_provider_x509_cert_url": "
  "client_x509_cert_url": ..
};


//Initialize firebase
//const adminApp = initializeApp();
const adminApp = admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig)
});

//Returns the FirebaseAuth object for an App.
const {
    getAuth
} = require("firebase-admin/auth");
/*{
    "userEmail":"cnboxserver@gmail.com"
}*/

//Code that derives the function required to execute code (extract user email to send email)
exports.request= async (req, res) => {
    const {
        userEmail

    } = req.body;

//Call actionlink (Authentication Link)
    const actionLink = await getAuth().generateEmailVerificationLink(userEmail)

//Code to keep the email on the General tab (if not done, go to the Promotion tab)
    const emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


//Call Email Template
    const template = await ejs.renderFile('verify-email.ejs', {
            actionLink,
            randomNumber: Math.random() /* 이메일 쌓이지 않게 하는 용도였는데 어째서인지 코드가 안 먹힘. 개선 필요 */
            });

//Connects to sendgrid (Email Server) and send email
    sgMail.setApiKey(SENDGRID_KEY);
    if (true) {       
        const message = {
            from: {
                name: 'bicus',
                email: VERIFIED_EMAIL
            },
            to: userEmail,
            subject: 'bicus 이메일 인증 안내',
            text: `Test ${actionLink}`,
            html: template
        }
        sgMail.send(message);
    };
    //Test code for code success/fail
    res.status(200).send(actionLink);
};

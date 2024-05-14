var tablinks = document.getElementsByClassName("tab-links");
    var tabcontents = document.getElementsByClassName("tab-contents");
   
    function opentab(tabname){
        for(tablink of tablinks){
            tablink.classList.remove("active-link");
        }
        for(tabcontent of tabcontents){
            tabcontent.classList.remove("active-tab");
        }
        event.currentTarget.classList.add("active-link");
        document.getElementById(tabname).classList.add("active-tab");
    }

const scriptURL = 'https://script.google.com/macros/s/AKfycbw7ULD1tWvTQoYDOjOOikFjfTuNw5OZfzovVAcx3SHDS7n7bS1QvPUUoENGIiuaFg_0eg/exec'
    const form = document.forms['submit-to-google-sheet']
    const msg = document.getElementById("msg")
  
    form.addEventListener('submit', e => {
      e.preventDefault()
      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            msg.innerHTML = "Message sent successfully"
            setTimeout(function(){
                msg.innerHTML = ""
            },4000)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
    })

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Route to handle form submission
app.post('/submit-form', (req, res) => {
  const { Name, email, Message } = req.body;

  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kasahgileni@gmail.com', // your email
      pass: 'Ceep19957!SK' // your password
    }
  });

  // Email options
  let mailOptions = {
    from: 'kasahgileni@gmail.com',
    to: 'siboniseni.kasa@outlook.com', // your email
    subject: 'New Form Submission',
    text: `Name: ${Name}\nEmail: ${email}\nMessage: ${Message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error occurred:', error.message);
      res.status(500).send('Error occurred, form submission failed.');
    } else {
      console.log('Email sent:', info.response);
      res.send('Form submitted successfully!');
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

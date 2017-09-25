const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log("Listening on port", PORT);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  next();
});

const contacts = [];
function Contact(firstName, lastName, phoneNumber, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.fullName = firstName + lastName;

    return this;
}

app.get('/contacts', (req,res)=>{
    res.json(contacts);
});

app.get('/contacts/:fullName', (req,res)=>{
    let contact = contacts.find(c=>{
        return c.fullName.toLowerCase() === req.params.fullName.toLowerCase()
    })

    res.json(contact);
});

app.post('/contacts', (req,res)=>{
    let existingContact = contacts.find(c=>{
        return c.fullName.toLowerCase() === req.body.firstName.toLowerCase()+req.body.lastName.toLowerCase()
    });
    if (!existingContact) {
        let newContact = new Contact(req.body.firstName, req.body.lastName, req.body.phoneNumber, req.body.email);
        contacts.push(newContact);

        res.json(contacts);
    }
    else {
        res.status(200);
        res.send("Contact already exists");
    }
    
});

app.put('/contacts/:fullName', (req,res)=>{
    let updatedContact = req.body;
    let newFullName = updatedContact.firstName + updatedContact.lastName;
    updatedContact.fullName = newFullName;
    if (req.params.fullName.toLowerCase() !== newFullName.toLowerCase()) {
        let existingContact = contacts.find(c=>{
            return c.fullName.toLowerCase() === newFullName.toLowerCase()
        });
        if (existingContact) {
            res.status(200);
            res.send("Contact already exists");
            return;
        }
    }
    for (let i=0; i<contacts.length; i++) {
        if (contacts[i].fullName.toLowerCase()===req.params.fullName.toLowerCase()){
            contacts[i]=updatedContact;
            break;
        }
    }

    res.json(contacts);
});

app.delete('/contacts/:fullName', (req,res)=>{
    for (let i=0; i<contacts.length; i++) {
            if (contacts[i].fullName.toLowerCase()===req.params.fullName.toLowerCase()){
                contacts.splice(i,1);
                break;
            }
        }

    res.json(contacts);
});
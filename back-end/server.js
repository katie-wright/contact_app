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

app.get('/contacts', (req,res)=>{
    res.json(contacts);
});

app.get('/contacts/:id', (req,res)=>{
    let contact = contacts.find(c=>{
        return c.id === req.params.id
    })

    res.json(contact);
});

app.post('/contacts', (req,res)=>{
    let newContact = req.body;
    if (contacts.length>0) {
        newContact.id = contacts[contacts.length-1].id+1
    }
    else {
        newContact.id = 1;
    }
    contacts.push(newContact);

    res.json(contacts);
});

app.put('/contacts/:id', (req,res)=>{
    for (let i=0; i<contacts.length; i++) {
        if (contacts[i].id===req.params.id){
            contacts[i]=req.body;
            break;
        }
    }
    res.json(contacts);
});

app.delete('/contacts/:id', (req,res)=>{
    for (let i=0; i<contacts.length; i++) {
        if (contacts[i].id==req.params.id){
            contacts.splice(i,1);
            break;
        }
    }

    res.json(contacts);
});
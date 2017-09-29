const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log("Listening on port", PORT);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/front-end/build'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  next();
});

const contacts = [{
                "id": 1,
                "firstName": "Roxanna",
                "lastName": "Covolini",
                "email": "rcovolini0@gmpg.org",
                "phone": "595-747-2226",
                "tags": ["work"],
                "picture": "",
                "favourite":true
                }, {
                "id": 2,
                "firstName": "Kenna",
                "lastName": "Oxer",
                "email": "koxer1@xing.com",
                "phone": "628-590-3716",
                "tags": ["school", "home"],
                "picture": "",
                "favourite":false
                }, {
                "id": 3,
                "firstName": "Pauline",
                "lastName": "Chree",
                "email": "pchree2@qq.com",
                "phone": "737-669-8862",
                "tags": ["family"],
                "picture": "https://thumb1.shutterstock.com/display_pic_with_logo/330511/128709044/stock-photo-business-woman-portrait-crossed-arms-128709044.jpg",
                "favourite":true
                }, {
                "id": 4,
                "firstName": "Shaine",
                "lastName": "Ghio",
                "email": "sghio3@multiply.com",
                "phone": "332-772-0157",
                "tags": ["home"],
                "picture": "",
                "favourite":false
                }, {
                "id": 5,
                "firstName": "Lanny",
                "lastName": "Gregorowicz",
                "email": "lgregorowicz4@google.co.uk",
                "phone": "461-961-0058",
                "tags": ["work"],
                "picture": "https://www.photocase.com/photos/285296-human-being-youth-young-adults-business-masculine-photocase-stock-photo-large.jpeg",
                "favourite":true
                }]

app.get('/contacts', (req,res)=>{
    res.json(contacts);
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
    let contact = contacts.find(c=>{
        return c.id===Number(req.params.id)
    });
    let updateData = req.body;
    for (const key in updateData) {
        if (contact[key] !== updateData[key]){
            contact[key] = updateData[key];
            console.log("Updated", key)
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

app.get('*', (req, res) => {
    res.sendFile('index.html',{root: __dirname + '/front-end/build'});
});
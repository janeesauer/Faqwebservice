const faqs = require('./faqs.js');  // File containing questions and answersin same directory

const express = require('express');  // Express server package
const app = express();  // Create ecpress server instance

const port = process.env.PORT || 8080;  // get port number from environment or default to 8080

// console.log(faqs)
// GET /faqs
app.get('/faqs/', (req, resp) => {
    // Log which endpoint was hit
    console.log('Endpoint /faqs hit');

    // Set the Content-Type header of the response
    resp.setHeader('Content-Type', 'application/json');

    // Return the faqs
    resp.send(faqs);
});

// GET / single faq
app.get('/faqs/:id([0-9]+)', (req, resp) => {
    // Log which endpoint was hit
    console.log('Endpoint /faqs hit');

    // Set the Content-Type header of the response
    resp.setHeader('Content-Type', 'application/json');

    const id = parseInt(req.params['id']);
    console.log(id);
    // Return the faq
    console.log(faqs.FAQS[id]);
    resp.send(faqs.FAQS[id]);
});

app.get('/faqs/search', (req, resp) => {
    // Log which endpoint was hit
    console.log('Endpoint /faqs hit');
    console.log(req.query);
    console.log(typeof(req.query));

    var matches = [];
    for(let i=0; i<faqs.FAQS.length; i++) {
        
        //console.log(faqs.FAQS[i].question.includes(req.query));
        if(faqs.FAQS[i].question.includes(req.query.q)) {
            //console.log('added to array');
            matches.push(faqs.FAQS[i]);
        }
    }


    // Set the Content-Type header of the response
    resp.setHeader('Content-Type', 'application/json');

    const id = parseInt(req.params['id']);
    // Return the faq
    resp.send(matches);
});

app.listen(port);


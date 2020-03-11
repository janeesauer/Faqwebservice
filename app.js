const faqs = require('./faqs.js');  // File containing questions and answersin same directory

const express = require('express');  // Express server package
const app = express();  // Create ecpress server instance

const port = process.env.PORT || 8080;  // get port number from environment or default to 8080

// GET / single faq
app.get('/faqs/:id([0-9]+)', (req, resp) => {
    // Set the Content-Type header of the response
    resp.setHeader('Content-Type', 'application/json');

    const id = parseInt(req.params['id']);

    // Return the faq
    resp.send(faqs.FAQS[id]);
});

app.get('/faqs/', (req, resp) => {
    resp.setHeader('Content-Type', 'application/json');
    if (req.query.q) {

        const filteredFaqs = faqs.FAQS.filter((item) => {
            const pattern = req.query.q.split(' ').map((t) => '(?=.*\\b' + t + '\\b)').join('');
            //console.debug(pattern);
            const regex = new RegExp(pattern, 'i');
            return regex.test(item.question + ' ' + item.answer);
        });

        // Return the faq
        resp.send({ FAQS: filteredFaqs });
        return;
    }
    resp.send(faqs);
});

app.listen(port);


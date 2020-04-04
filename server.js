const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const cors = require("cors");

const app = express();

// Allow cross origin(To make requests from another domain)
app.use(cors()); 


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server Listening on port ${PORT}`));
import "./App.css";
import React, { Component } from "react";
import Customers from "./components/Customers";
import ApolloCLient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import AddComp from './components/AddComp';
import DeleteComp from './components/DeleteComp';
import EditComp from './components/EditComp';

const client = new ApolloCLient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    console.log("App comp")
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
          <Route exact strict path="/"  component={Customers} />
          <Route exact  path="/add"  component={AddComp} />
          <Route exact  path="/delete"  component={DeleteComp} />
          <Route exact  path="/edit"  component={EditComp} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;

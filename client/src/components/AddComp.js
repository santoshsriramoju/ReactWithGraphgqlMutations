import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";



class AddComp extends Component {

  addNewCustomer = (e) => { 
    e.preventDefault();
    this.props.mutate({
      variables: {
        name: this.name.value,
        age: parseInt(this.age.value),
        email: this.email.value
      }
    });
  };

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            ref={input => (this.name = input)}
            name="name"
            placeholder="enter name"
          />
          <input
            type="text"
            ref={input => (this.age = input)}
            name="age"
            placeholder="enter age"
          />
          <input
            type="text"
            ref={input => (this.email = input)}
            name="email"
            placeholder="enter email"
          />
          <button onClick={this.addNewCustomer}>Submit</button>
        </form>
      </div>
    );
  }
}


const mutation = gql`
  mutation addCustomer($name: String!, $age: Int!, $email: String!) {
    addCustomer(name: $name, age: $age, email: $email) {
      name
      age
      email
      id
    }
  }
`;

export default graphql(mutation)(AddComp);

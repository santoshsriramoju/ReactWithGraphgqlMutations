import React, { Component } from "react";
import {graphql} from "react-apollo";
import gql from 'graphql-tag';


class EditComp extends Component {

  editCustomer = e => {
    e.preventDefault();
    this.props.mutate({
      variables: {
        id: this.id.value,
        name: this.name.value,
        email: this.email.value,
        age: this.age.value
      }
    });
  };

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            name="id"
            placeholder="enter id"
            ref={input => (this.id = input)}
          />
          <input
            type="text"
            name="name"
            placeholder="enter name"
            ref={input => (this.name = input)}
          />
          <input
            type="text"
            name="email"
            placeholder="enter email"
            ref={input => (this.email = input)}
          />
          <input
            type="text"
            name="age"
            placeholder="enter age"
            ref={input => (this.age = input)}
          />
          <button onClick={this.editCustomer}>Edit</button>
        </form>
      </div>
    );
  }
}

const mutation = gql`
mutation editCustomer($id:String!, $name: String, $email: String, $age: String){
    editCustomer(id:$id, name:$name, email:$email, age:$age){
        id,
        name,
        age,
        email
    }
}

`;

export default graphql(mutation)(EditComp);

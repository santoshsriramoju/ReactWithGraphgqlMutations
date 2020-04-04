import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { Link } from "react-router-dom";

const CUSTOMERS_QUERY = gql`
  query CustomersQuery {
    customers {
      name
      age
      email
      id
    }
  }
`;

class Customers extends Component {
  render() {
    return (
      <div>
        <Query query={CUSTOMERS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);
            console.log(data);
            return (              
              <Fragment>
                {data &&
                  data.customers.map(val => {
                    return <h3 key={val.id}>User is {val.name}</h3>;
                  })}
              </Fragment>
            );
          }}
        </Query>
        <hr />
        <Link  to="/add">
          <button>Add Customer</button>
        </Link>
        <Link  to="/delete">
          <button>Delete Customer</button>
        </Link>
        <Link  to="/edit">
          <button>Edit Customer</button>
        </Link>
      </div>
    );
  }
}

export default Customers;

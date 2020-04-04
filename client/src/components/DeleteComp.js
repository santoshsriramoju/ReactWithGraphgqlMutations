import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

class DeleteComp extends React.Component {
  // deleteCustomer = (e)=>{
  //     e.preventDefault();
  //     this.props.mutate({
  //         variables:{
  //             id: this.id.value
  //         }
  //     })
  // };
  //   render() {
  //     return (
  //       <div>
  //         <form>
  //             <input type="text" name="id" placeholder="enter the id to delete" ref={input=> this.id = input}/>
  //        <button onClick={this.deleteCustomer}>Delete</button>
  //         </form>
  //       </div>
  //     );
  //   }

  render() {
    return (
      <Mutation mutation={mutation}>
        {(deleteCustomer, { data }) => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                deleteCustomer({ variables: { id: this.id.value } });
                this.id.value = "";
              }}
            >
              <input
                type="text"
                name="id"
                placeholder="enter the id to delete"
                ref={input => (this.id = input)}
              />
              <button>Delete</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

const mutation = gql`
  mutation deleteCustomer($id: String!) {
    deleteCustomer(id: $id) {
      name
    }
  }
`;

// export default graphql(mutation)(DeleteComp)
export default DeleteComp;

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = require("graphql");

const axios = require('axios');

//Hardcoded data
// const customersData = [
//   { id: "1", name: "John Doe", email: "jdoe@gmail.com", age: 35 },
//   { id: "2", name: "Steve Smith", email: "steve@gmail.com", age: 28 },
//   { id: "3", name: "Brian Mills", email: "mills@gmail.com", age: 55 }
// ];

//Customer Type
const customerType = new GraphQLObjectType({
  name: "customers",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    customers: {
      type: new GraphQLList(customerType),
      resolve(parent, args) {
        // return customersData;
        return axios.get("http://localhost:3000/customers")
        .then(res => res.data)
      }
    },
    customer: {
      type: customerType,
      args: {
        id: { type: GraphQLString}
      },
      resolve(parent, args) {
        // return customersData.find(val => val.id === args.id);
      return axios.get(`http://localhost:3000/customers/${args.id}`)
        .then(res => res.data)
      }
    }
  }
});


//Mutation
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addCustomer:{
            type: customerType,
            args:{
                name:{type: new GraphQLNonNull(GraphQLString)},
                email:{type: new GraphQLNonNull(GraphQLString)},
                age:{type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
               return axios.post('http://localhost:3000/customers',{
                    name: args.name,
                    email: args.email,
                    age: args.age
                })
                .then(res => res.data)
            }
        },
        deleteCustomer:{
            type: customerType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                return axios.delete(`http://localhost:3000/customers/${args.id}`)
                .then(res => res.data)
            }
        },
        editCustomer:{
            type: customerType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLString)},
                name:{type: GraphQLString},
                email:{type: GraphQLString},
                age:{type: GraphQLString}
            },
            resolve(parent,args){
               return axios.patch(`http://localhost:3000/customers/${args.id}`,args)
                .then(res => res.data)
            }
        }
    }
});



module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});

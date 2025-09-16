// 代码生成时间: 2025-09-17 05:45:53
import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLNonNull } from 'graphql';

// Define the Message type
const MessageType = new GraphQLObjectType({
  name: 'Message',
  fields: () => ({/*
    message: {
      type: GraphQLNonNull(GraphQLString),
    },
  }*/}),
});

// Define the Mutation type with message notification function
const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    notifyMessage: {
      type: MessageType,
      args: {
        message: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        console.log(`Notification: ${args.message}`);
        return { message: args.message };
      },
    },
  },
});

// Define the root type for the schema
const RootType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // You can add other query fields here
  },
});

// Create the GraphQL schema
const schema = new GraphQLSchema({
  query: RootType,
  mutation: MutationType,
});

// Export the schema for usage in GraphQL server
export default schema;

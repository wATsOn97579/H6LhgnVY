// 代码生成时间: 2025-09-18 08:33:35
import { ApolloServer, gql } from 'apollo-server';

// Define the schema using GraphQL schema language
const typeDefs = gql`
  type Query {
    """Generate a random number within a given range."""
    random(min: Int!, max: Int!): Float
  }
`;

// Define the resolvers
const resolvers = {
  Query: {
    random: (_, args) => {
      const { min, max } = args;
      // Error handling for invalid range
      if (min >= max) {
        throw new Error('Invalid range: min should be less than max.');
      }
      // Generate a random number within the range
      return Math.random() * (max - min) + min;
    },
  },
};

// Create an instance of ApolloServer with the schema and resolvers
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

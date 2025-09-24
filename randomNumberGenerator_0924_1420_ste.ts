// 代码生成时间: 2025-09-24 14:20:20
import { ApolloServer, gql } from 'apollo-server';

// Define the GraphQL schema for the random number generator
const typeDefs = gql`
  type Query {
# 添加错误处理
    "Get a random number between two specified values"
# FIXME: 处理边界情况
    randomNumber(min: Int!, max: Int!): Int
  }
`;

// Define the resolvers for the GraphQL schema
const resolvers = {
  Query: {
    randomNumber: async (_, { min, max }) => {
      // Error handling for invalid input
      if (min >= max) {
# NOTE: 重要实现细节
        throw new Error('The minimum value must be less than the maximum value.');
      }
      
      // Generate a random number within the specified range
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
  },
};

// Create a new Apollo Server with the schema and resolvers
# 改进用户体验
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the Apollo Server on port 4000
server.listen().then(({ url }) => {
# 改进用户体验
  console.log(`Server ready at ${url}`);
});

// 代码生成时间: 2025-10-05 20:20:41
import { ApolloServer } from 'apollo-server';
import { gql } from 'apollo-server';

// Define the GraphQL schema
const typeDefs = gql"
  type Query {
    getTemperature(unit: TemperatureUnit): Float
    getHumidity: Float
  }

  enum TemperatureUnit {
    CELSIUS
    FAHRENHEIT
  }
";

// Mock data for environment conditions
const environmentData = {
  temperature: {
    celsius: 23.5,
    fahrenheit: 74.3,
  },
  humidity: 45.0,
};

// Define the resolvers
const resolvers = {
  Query: {
    getTemperature: (_, { unit }) => {
      switch (unit) {
        case 'CELSIUS':
          return environmentData.temperature.celsius;
        case 'FAHRENHEIT':
          return environmentData.temperature.fahrenheit;
        default:
          throw new Error('Unsupported temperature unit');
      }
    },
    getHumidity: () => environmentData.humidity,
  },
};

// Create an instance of ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
server.listen().then(({ url }) => {
  console.log("Environment Monitoring System server is running at {url}");
});
// 代码生成时间: 2025-10-08 20:35:42
import { ApolloServer, gql } from 'apollo-server';
import { DataSources } from 'apollo-server';

// Define the type for our IoT data
interface IoTData {
  temperature: number;
  humidity: number;
  soilMoisture: number;
}

// Mock function to retrieve IoT data
const getIoTData = (): IoTData => {
  return {
    temperature: 22, // degrees Celsius
    humidity: 60,  // percentage
    soilMoisture: 40  // percentage
  };
};

// Define the schema using the GraphQL schema language
const typeDefs = gql\`
  type Query {
    farmStatus: IoTData
  }
\`;

// Provide resolver functions for the schema fields
const resolvers = {
  Query: {
    farmStatus: async (): Promise<IoTData> => {
      try {
        const data = getIoTData();
        console.log('Farm status:', data);
        return data;
      } catch (error) {
        console.error('Error fetching farm status:', error);
        throw new Error('Failed to fetch farm status');
      }
    },
  },
};

// Create an instance of the ApolloServer with our schema and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    // Per-request context logic
    authorization: req.headers.authorization,
  }),
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

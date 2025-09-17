// 代码生成时间: 2025-09-17 17:34:40
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } from 'graphql';
import { process } from 'process';
import { ChildProcess, exec } from 'child_process';

// ProcessManager Type Definitions
const ProcessManagerType = new GraphQLObjectType({
  name: 'ProcessManager',
  fields: {
    pid: { type: GraphQLInt },
    status: { type: GraphQLString },
  }
});

// Root Query
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    startProcess: {
      type: new GraphQLObjectType({
        name: 'StartProcessPayload',
        fields: {
          process: { type: ProcessManagerType },
        },
      }),
      args: {
        script: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args) => {
        const childProcess: ChildProcess = exec(args.script);
        return {
          process: { pid: childProcess.pid, status: 'started' },
        };
      },
    },
    stopProcess: {
      type: GraphQLString,
      args: {
        pid: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_, args) => {
        try {
          process.kill(args.pid);
          return 'Process stopped successfully';
        } catch (error) {
          throw new Error('Failed to stop process: ' + error.message);
        }
      },
    },
  },
});

// GraphQL Schema
const schema = new GraphQLSchema({
  query: RootQueryType,
});

// Function to start a process and return its details
function startProcess(script: string): { pid: number; status: string } {
  const childProcess: ChildProcess = exec(script);
  return { pid: childProcess.pid, status: 'started' };
}

// Function to stop a process by PID
function stopProcess(pid: number): string {
  try {
    process.kill(pid);
    return 'Process stopped successfully';
  } catch (error) {
    throw new Error('Failed to stop process: ' + error.message);
  }
}

// Export the schema for usage in GraphQL server
export { schema, startProcess, stopProcess };

// Note:
// This module defines a GraphQL schema for managing processes.
// It includes mutations to start and stop processes.
// The `startProcess` and `stopProcess` functions are also exported
// for use in other parts of the application if needed.

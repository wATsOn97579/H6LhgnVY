// 代码生成时间: 2025-10-09 19:08:46
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

// Define the Package class to represent software packages.
class Package {
  constructor(public name: string, public version: string) {}
}

// Define the PackageManager class to handle package operations.
class PackageManager {
  private packages: Package[] = [];

  // Add a new package to the package manager.
  addPackage(name: string, version: string): void {
    this.packages.push(new Package(name, version));
  }

  // Remove a package from the package manager.
  removePackage(name: string): void {
    this.packages = this.packages.filter(p => p.name !== name);
  }

  // Get all packages.
  getAllPackages(): Package[] {
    return this.packages;
  }
}

// Create an instance of the PackageManager.
const packageManager = new PackageManager();

// Initialize data with some packages.
packageManager.addPackage('express', '4.17.1');
packageManager.addPackage('react', '17.0.2');

// Define the ApolloServer with type definitions and resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    packages: packageManager.getAllPackages()
  }),
  formatError: error => {
    // Log the error and return a user-friendly message.
    console.error(error);
    return error.message;
  },
});

// Start the server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// Export the PackageManager class.
export { PackageManager };

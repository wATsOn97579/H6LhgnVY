// 代码生成时间: 2025-09-23 16:55:34
import { ApolloServer, gql } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import { validate } from 'uuid';

// 定义GraphQL类型
const typeDefs = gql"
  type Query {
    getUserInfo(userId: ID!): UserInfo
  }

  type UserInfo {
    id: ID!
    name: String
    email: String
  }
";

// 定义数据库模型
const prisma = new PrismaClient();

// 定义Resolvers
const resolvers = {
  Query: {
    getUserInfo: async (_, { userId }: { userId: string }) => {
      // 验证输入的userId是否为合法的UUID
      if (!validate(userId)) {
        throw new Error('Invalid UUID provided for userId');
      }
      
      try {
        // 使用Prisma查询数据库，防止SQL注入
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });
        
        if (!user) {
          throw new Error('User not found');
        }
        
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      } catch (error) {
        // 错误处理
        console.error('Error fetching user data:', error);
        throw new Error('Failed to fetch user data');
      }
    },
  },
};

// 创建Apollo服务器
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // 启用Playground和调试工具
  introspection: true,
  playground: true,
});

// 启动服务器
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

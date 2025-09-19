// 代码生成时间: 2025-09-19 13:10:25
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

// 定义数据清洗和预处理工具的类型
const PreprocessingType = new GraphQLObjectType({
  name: 'Preprocessing',
  fields: {
    // 清洗字符串数据
    cleanString: {
      type: GraphQLString,
      args: {
        input: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { input }) => {
        // 清洗逻辑
        return input.replace(/[^a-zA-Z0-9]/g, '');
      },
    },
    // 预处理数值数据
    preprocessNumber: {
      type: GraphQLString,
      args: {
        input: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { input }) => {
        // 预处理逻辑
        const num = parseFloat(input);
        if (isNaN(num)) {
          throw new Error('请输入有效的数值数据');
        }
        return num.toFixed(2);
      },
    },
  },
});

// 创建GraphQL Schema
const schema = new GraphQLSchema({
  query: PreprocessingType,
});

// 示例查询
const exampleQuery = '{
  cleanString(input: "Hello, World!")
  preprocessNumber(input: "123.456")
}';

// 执行查询
// const result = graphqlSync({ schema, source: exampleQuery });
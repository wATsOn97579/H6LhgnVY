// 代码生成时间: 2025-09-20 06:36:25
import { Pool, PoolConfig, QueryConfig, PoolClient } from 'pg';

// DatabasePoolManager 类负责管理 PostgreSQL 数据库连接池
class DatabasePoolManager {
  private pool: Pool;

  constructor(private config: PoolConfig) {
    // 根据配置创建数据库连接池
    this.pool = new Pool(config);
  }

  // 获取连接池中的一个客户端
  public async getClient(): Promise<PoolClient> {
    try {
      // 使用 await 确保获取连接是异步的
      const client = await this.pool.connect();
      return client;
    } catch (error) {
      // 错误处理，这里可以根据实际需要记录日志或重新抛出错误
      console.error('Failed to get client from pool:', error);
      throw error;
    }
  }

  // 执行查询，自动处理连接释放
  public async query<T>(config: QueryConfig): Promise<T[]> {
    const client = await this.getClient();
    try {
      // 执行查询
      const result = await client.query(config);
      return result.rows as T[];
    } catch (error) {
      // 错误处理，这里可以根据实际需要记录日志或重新抛出错误
      console.error('Query failed:', error);
      throw error;
    } finally {
      // 无论成功与否，都要释放连接
      client.release();
    }
  }

  // 关闭连接池
  public async end(): Promise<void> {
    try {
      await this.pool.end();
    } catch (error) {
      // 错误处理，这里可以根据实际需要记录日志或重新抛出错误
      console.error('Failed to end pool:', error);
      throw error;
    }
  }
}

// 使用示例
// 配置数据库连接池
const poolConfig: PoolConfig = {
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
};

// 创建 DatabasePoolManager 实例
const dbPoolManager = new DatabasePoolManager(poolConfig);

// 异步执行查询
(async () => {
  try {
    const clients = await dbPoolManager.getClient();
    const queryConfig: QueryConfig = {
      text: 'SELECT * FROM your_table;',
    };
    const result = await dbPoolManager.query<any>(queryConfig);
    console.log('Query result:', result);
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await dbPoolManager.end();
  }
})();
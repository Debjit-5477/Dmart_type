import mysql from 'mysql2/promise';
import hdb from 'hdb';

interface DatabaseConfig {
  type: 'mysql' | 'sap-hana';
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl?: boolean;
}

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connection: any;
  private config: DatabaseConfig | null = null;

  private constructor() {}

  static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  async connect(config: DatabaseConfig): Promise<void> {
    this.config = config;

    if (config.type === 'mysql') {
      this.connection = await mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.username,
        password: config.password,
        database: config.database,
        ssl: config.ssl ? { rejectUnauthorized: false } : undefined
      });
    } else {
      this.connection = hdb.createClient({
        host: config.host,
        port: config.port,
        user: config.username,
        password: config.password,
        database: config.database,
        encrypt: config.ssl
      });

      await new Promise((resolve, reject) => {
        this.connection.connect((err: any) => {
          if (err) reject(err);
          resolve(true);
        });
      });
    }
  }

  async query(sql: string, params?: any[]): Promise<any> {
    if (!this.connection) {
      throw new Error('Database connection not established');
    }

    if (this.config?.type === 'mysql') {
      const [rows] = await this.connection.execute(sql, params);
      return rows;
    } else {
      return new Promise((resolve, reject) => {
        this.connection.exec(sql, params, (err: any, rows: any) => {
          if (err) reject(err);
          resolve(rows);
        });
      });
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      if (this.config?.type === 'mysql') {
        await this.connection.end();
      } else {
        await new Promise((resolve) => {
          this.connection.disconnect(() => resolve(true));
        });
      }
      this.connection = null;
    }
  }
}

export const db = DatabaseConnection.getInstance();
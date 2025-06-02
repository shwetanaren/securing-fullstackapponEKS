import dotenv from 'dotenv';
dotenv.config();

export default {
    development:{
        client: 'pg',
    connection: process.env.DATABASE_URL
     ? { connectionString: process.env.DATABASE_URL, 
        // ssl: { rejectUnauthorized: false }
    } 
    : {
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
        directory: './migrations'
    }
} };


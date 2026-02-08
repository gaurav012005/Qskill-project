import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '..', process.env.DATABASE_PATH || './database/codingninjas.db');

let db;

export const initDatabase = () => {
  try {
    db = new Database(dbPath, { verbose: console.log });
    db.pragma('journal_mode = WAL');
    console.log('✅ Database connected successfully');
    return db;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

export const getDatabase = () => {
  if (!db) {
    return initDatabase();
  }
  return db;
};

export const closeDatabase = () => {
  if (db) {
    db.close();
    console.log('Database connection closed');
  }
};

export default { initDatabase, getDatabase, closeDatabase };

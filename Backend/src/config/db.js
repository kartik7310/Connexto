import { mongoose } from 'mongoose';
import { config } from './env.js';
import dns from 'node:dns';
dns.setServers(["8.8.8.8", "1.1.1.1"]);  //only for local development
dns.setDefaultResultOrder("ipv4first"); //only for local development
export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

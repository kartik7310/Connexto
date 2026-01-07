import express from "express";
import cors from 'cors';
import { config } from './config/env.js';
import {connectDB} from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import UserRoutes from "./routes/user.route.js"
import ProfileRoutes from "./routes/profile.routes.js"
import logger from "./config/logger.js";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middleware/errorMiddleware.js"
import ConnectionRoutes from "./routes/connection.routes.js"
import SubscriptionRoutes from "./routes/subscription.routes.js"
import ChatRoutes from "./routes/chat.routes.js"
import BlogRoutes from "./routes/blog.route.js"
import "./helper/cronJob.js"
import { createServer } from 'node:http';
import SubscriptionController from "./controllers/subscription.js";
const app = express();
app.set("trust proxy", 1);
const PORT = config.port;
app.post(
  "/api/v1/connexto/webhook/stripe",
  express.raw({ type: "application/json" }),
  SubscriptionController.stripeWebhook
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: config.corsOrigin.split(',').map(origin => origin.trim()),
  credentials: true
}));

import  intitlizeSocket from "./webSocket/socket.js";



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user',UserRoutes );
app.use('/api/v1/profile',ProfileRoutes );
app.use('/api/v1/connections', ConnectionRoutes);
app.use('/api/v1/payment', SubscriptionRoutes);
app.use('/api/v1/chat', ChatRoutes);
app.use('/api/v1/blogs',BlogRoutes);

app.get('/health',(req,res)=>{
  res.status(200).json("app is running")
})
const server = createServer(app);

intitlizeSocket(server)

app.use(globalErrorHandler);

connectDB()
  .then(() => {
    logger.info("MongoDB connected successfully");
    // Start server only after successful DB connection
    server.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error('Database connection error:', err);
    process.exit(1); // Exit if DB connection fails
  });

export default app;

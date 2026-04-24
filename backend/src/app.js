import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import apiRoutes from './routes/index.js';
import energyPricesRoutes from './routes/energyPrices.routes.js';
import { env } from './config/env.js';
import { errorMiddleware, notFoundMiddleware } from './middleware/error.middleware.js';

const app = express();

app.use(helmet());
const allowedOrigins = [
  ...env.corsOrigins,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  'http://localhost:5177',
  'http://localhost:5178',
  'http://localhost:5179'
];
app.use(cors({ 
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1 || origin.startsWith('http://localhost:')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }, 
  credentials: true 
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

app.use(
  rateLimit({
    windowMs: env.rateLimitWindowMs,
    max: env.rateLimitMax,
    standardHeaders: true,
    legacyHeaders: false
  })
);

app.get('/health', (req, res) => {
  res.json({ success: true, message: 'API healthy' });
});

app.use('/api/energy-prices', energyPricesRoutes);
app.use('/api', apiRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;

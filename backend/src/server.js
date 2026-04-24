import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import app from './app.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';

const server = http.createServer(app);

// Socket namespace for live energy updates (Person 2 ownership).
const io = new SocketIOServer(server, {
  cors: {
    origin: env.corsOrigins,
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  socket.emit('prices:welcome', {
    message: 'Connected to live energy stream channel'
  });
});

async function bootstrap() {
  try {
    await connectDatabase();
    // eslint-disable-next-line no-console
    console.log('✓ MongoDB connected');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('⚠️ Warning: MongoDB not connected. Proceeding with API routes only.');
    // eslint-disable-next-line no-console
    console.warn('Error details:', error.message);
  }

  server.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`✓ Backend running on port ${env.port}`);
  });
}

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('✗ Startup failed:', error);
  process.exit(1);
});

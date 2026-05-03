import 'dotenv/config';

import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 3000;

connectDB();

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})

process.on('unhandledRejection', (err) => {
  console.log(`UnhandledRejection Errors: ${err.name} | ${err.message} `);
  server.close(() => {
    console.log('Shutting down....');
    process.exit(1);
  });
})

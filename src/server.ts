import app from './app'; // Ensure this points to the correct file
import config from './app/config';
import mongoose from 'mongoose';

async function main() {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(config.database_url as string);
    console.log('Connected to the database successfully');

    // Start the server
    app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

main();

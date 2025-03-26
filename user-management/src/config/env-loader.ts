import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

export class EnvLoader {
  static loadEnv() {
    console.log('Loading environment variables', __dirname);
    const envFilePath = path.resolve(__dirname, '../../.env');
    if (fs.existsSync(envFilePath)) {
      dotenv.config({ path: envFilePath });

      console.log('\n\nEnvironment variables loaded', typeof process.env.DB_PASSWORD);
    } else {
      console.error('.env file not found');
    }
  }
}

EnvLoader.loadEnv();

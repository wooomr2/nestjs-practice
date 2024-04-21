import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PW}@cluster.icwey.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

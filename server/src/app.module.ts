import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PubChemModule } from './pub-chem/pub-chem.module';

@Module({
  imports: [PubChemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

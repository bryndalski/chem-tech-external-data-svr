import { Module } from '@nestjs/common';
import { CasService } from './cas.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [CasService],
})
export class CasModule {}

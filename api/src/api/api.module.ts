import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/service/service.module';
import { ProductController } from './product.controller';

@Module({
  imports: [ServiceModule],
  controllers: [ProductController],
})
export class ApiModule {}

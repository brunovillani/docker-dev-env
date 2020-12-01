import { Module } from '@nestjs/common';
import { ConnectorsModule } from 'src/connectors';
import { ProductService } from './product.service';

@Module({
  imports: [ConnectorsModule],
  providers: [ProductService],
  exports: [ProductService]
})
export class ServiceModule {}

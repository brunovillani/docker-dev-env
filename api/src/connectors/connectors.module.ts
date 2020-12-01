import { Module } from '@nestjs/common';
import { ProductConnector } from './product.connector';

@Module({
  imports: [],
  providers: [ProductConnector],
  exports: [ProductConnector]
})
export class ConnectorsModule {}

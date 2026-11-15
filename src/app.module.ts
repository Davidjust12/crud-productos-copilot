import { Module } from '@nestjs/common';
import { ProductosModule } from './productos/productos.module.js';

@Module({
  imports: [ProductosModule],
})
export class AppModule {}

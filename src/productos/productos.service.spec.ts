import { NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto.js';
import { ProductosService } from './productos.service.js';

describe('ProductosService', () => {
  let service: ProductosService;

  beforeEach(() => {
    service = new ProductosService();
  });

  it('genera IDs y conserva los campos no enviados en PATCH', () => {
    const producto = service.create({
      nombre: 'Rosa',
      precio: 12.5,
      cantidad: 10,
    } satisfies CreateProductoDto);

    expect(producto.id).toBe(1);
    expect(service.update(producto.id, { cantidad: 6 })).toEqual({
      id: 1,
      nombre: 'Rosa',
      precio: 12.5,
      cantidad: 6,
    });
  });

  it('responde con NotFoundException cuando el producto no existe', () => {
    expect(() => service.findOne(99)).toThrow(NotFoundException);
  });
});

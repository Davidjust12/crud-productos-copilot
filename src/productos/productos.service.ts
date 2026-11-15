import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto.js';
import { UpdateProductoDto } from './dto/update-producto.dto.js';
import { Producto } from './producto.interface.js';

@Injectable()
export class ProductosService {
  private readonly productos: Producto[] = [];
  private siguienteId = 1;

  create(dto: CreateProductoDto): Producto {
    const producto: Producto = {
      id: this.siguienteId++,
      nombre: dto.nombre,
      precio: dto.precio,
      cantidad: dto.cantidad,
    };
    this.productos.push(producto);
    return producto;
  }

  findAll(): Producto[] {
    return this.productos;
  }

  findOne(id: number): Producto {
    const producto = this.productos.find((item) => item.id === id);
    if (!producto) {
      throw new NotFoundException(`No se encontró el producto con ID ${id}`);
    }
    return producto;
  }

  replace(id: number, dto: CreateProductoDto): Producto {
    const index = this.productos.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`No se encontró el producto con ID ${id}`);
    }

    const producto: Producto = {
      id,
      nombre: dto.nombre,
      precio: dto.precio,
      cantidad: dto.cantidad,
    };
    this.productos[index] = producto;
    return producto;
  }

  update(id: number, dto: UpdateProductoDto): Producto {
    const producto = this.findOne(id);
    if (dto.nombre !== undefined) producto.nombre = dto.nombre;
    if (dto.precio !== undefined) producto.precio = dto.precio;
    if (dto.cantidad !== undefined) producto.cantidad = dto.cantidad;
    return producto;
  }

  remove(id: number): void {
    const index = this.productos.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`No se encontró el producto con ID ${id}`);
    }
    this.productos.splice(index, 1);
  }
}

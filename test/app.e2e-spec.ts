import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from '../src/app.module.js';

describe('Productos API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('completa el ciclo CRUD y admite la ruta de colección con barra final', async () => {
    const creado = await request(app.getHttpServer())
      .post('/productos')
      .send({ nombre: 'Rosa', precio: 12.5, cantidad: 10 })
      .expect(201);
    expect(creado.body).toEqual({
      id: 1,
      nombre: 'Rosa',
      precio: 12.5,
      cantidad: 10,
    });

    await request(app.getHttpServer())
      .get('/productos')
      .expect(200)
      .expect([creado.body]);
    await request(app.getHttpServer())
      .get('/productos/')
      .expect(200)
      .expect([creado.body]);
    await request(app.getHttpServer())
      .get('/productos/1')
      .expect(200)
      .expect(creado.body);

    const reemplazado = await request(app.getHttpServer())
      .put('/productos/1')
      .send({ nombre: 'Tulipán', precio: 8, cantidad: 4 })
      .expect(200);
    expect(reemplazado.body).toEqual({
      id: 1,
      nombre: 'Tulipán',
      precio: 8,
      cantidad: 4,
    });

    await request(app.getHttpServer())
      .patch('/productos/1')
      .send({ cantidad: 6 })
      .expect(200)
      .expect({ id: 1, nombre: 'Tulipán', precio: 8, cantidad: 6 });
    await request(app.getHttpServer()).delete('/productos/1').expect(204);
    await request(app.getHttpServer()).get('/productos').expect(200).expect([]);
    await request(app.getHttpServer()).get('/productos/1').expect(404);
  });

  it('rechaza datos inválidos y propiedades no permitidas', async () => {
    await request(app.getHttpServer())
      .post('/productos')
      .send({ nombre: '   ', precio: -1, cantidad: 1, extra: true })
      .expect(400);

    await request(app.getHttpServer())
      .post('/productos')
      .send({ nombre: 'Rosa', precio: 1, cantidad: 1.5 })
      .expect(400);
  });

  afterEach(async () => {
    await app.close();
  });
});

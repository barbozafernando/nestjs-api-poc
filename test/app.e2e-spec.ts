import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { Products } from '../src/modules/products/entity/product.entity';

describe('NESTJS-API-POC (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Products', () => {
    it('(GET)', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/products')
        .expect(200);

      expect(body[0]).toBeDefined();
      expect(body[0]).toHaveProperty('id');
      expect(body[0]).toHaveProperty('description');
      expect(body[0]).toHaveProperty('code');
      expect(body[0]).toHaveProperty('created_at');
      expect(body[0]).toHaveProperty('updated_at');
      expect(body[0]).toHaveProperty('deleted_at');
    });

    it('(POST)', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/products')
        .send({
          description: 'Produto 1',
          code: 123,
        })
        .expect(201);

      expect(body).toBeDefined();
      expect(body).toHaveProperty('id');
      expect(body).toHaveProperty('description');
      expect(body).toHaveProperty('code');
      expect(body).toHaveProperty('created_at');
      expect(body).toHaveProperty('updated_at');
      expect(body).toHaveProperty('deleted_at');
    });

    it('(PUT)', async () => {
      const entity = Products.create({
        description: 'Teste',
        code: 333,
      });

      const savedProduct = await Products.save(entity, { reload: true });

      const { body } = await request(app.getHttpServer())
        .put(`/products/${savedProduct.id}`)
        .send({
          description: 'Produto Teste',
          code: 123,
        })
        .expect(200);

      expect(body).toBeDefined();
      expect(body).toHaveProperty('id', savedProduct.id);
      expect(body).toHaveProperty('description', body.description);
      expect(body).toHaveProperty('code', body.code);
      expect(body).toHaveProperty('created_at', expect.any(String));
      expect(body).toHaveProperty('updated_at', expect.any(String));
      expect(body).toHaveProperty('deleted_at', null);
    });

    it('(DELETE)', async () => {
      const entity = Products.create({
        description: 'Teste',
        code: 333,
      });

      const savedProduct = await Products.save(entity, { reload: true });

      await request(app.getHttpServer())
        .delete(`/products/${savedProduct.id}`)
        .expect(204);
    });
  });
});

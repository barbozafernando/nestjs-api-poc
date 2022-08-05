import { DataSource, QueryRunner } from 'typeorm';
import { products1655590199412 } from '../1655590199412-products';

const queryInfo = 'PRAGMA table_info(products);';

describe('Products Migration', () => {
  let dataSourceConnection: DataSource;
  let migration: products1655590199412;
  let queryRunner: QueryRunner;

  beforeEach(async () => {
    dataSourceConnection = new DataSource({
      name: 'test',
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
    });

    await dataSourceConnection.initialize();
    queryRunner = dataSourceConnection.createQueryRunner();
    migration = new products1655590199412();
  });

  afterAll(async () => {
    await dataSourceConnection.destroy();
  });

  it('should be a instance of Products Migration', async () => {
    expect(migration).toBeInstanceOf(products1655590199412);
  });

  it('should run Up method and Down methods', async () => {
    await migration.up(queryRunner);
    let info = await dataSourceConnection.query(queryInfo);

    console.log(info);

    expect(info).toHaveLength(6);

    expect(info[0]['name']).toBe('id');
    expect(info[0]['type']).toBe('uuid');
    expect(info[0]['pk']).toBe(1);

    expect(info[1]['name']).toBe('description');
    expect(info[1]['type']).toBe('varchar(100)');
    expect(info[1]['notnull']).toBe(1);

    expect(info[2]['name']).toBe('code');
    expect(info[2]['type']).toBe('numeric');
    expect(info[2]['notnull']).toBe(1);

    expect(info[3]['name']).toBe('created_at');
    expect(info[3]['type']).toBe('timestamp');
    expect(info[3]['notnull']).toBe(1);

    expect(info[4]['name']).toBe('updated_at');
    expect(info[4]['type']).toBe('timestamp');
    expect(info[4]['notnull']).toBe(0);

    expect(info[5]['name']).toBe('deleted_at');
    expect(info[5]['type']).toBe('timestamp');
    expect(info[5]['notnull']).toBe(0);

    await migration.down(queryRunner);
    info = await dataSourceConnection.query(queryInfo);

    expect(info).toHaveLength(0);
  });
});

import { MigrationInterface, QueryRunner, Table, getRepository } from 'typeorm';

import IVehicleTypes from '@interfaces/vehicleTypes/IVehicleTypes';

export default class CreateTableVehiclesTypes1594296305320
  implements MigrationInterface {
  name = 'CreateTableVehiclesTypes1594296305320';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vehicle_types',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    const types = [
      {
        name: 'Carro',
      },
      {
        name: 'Moto',
      },
    ] as IVehicleTypes[];

    await getRepository('vehicle_types').save(types);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('vehicle_types');
  }
}

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTableVehicles1594296798115
  implements MigrationInterface {
  name = 'CreateTableVehicles1594296798115';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vehicles',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'brand',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'model',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'color',
            type: 'varchar',
          },
          {
            name: 'plate',
            type: 'varchar',
          },
          {
            name: 'type_id',
            type: 'uuid',
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

    await queryRunner.createForeignKey(
      'vehicles',
      new TableForeignKey({
        name: 'vehicles_type',
        referencedColumnNames: ['id'],
        referencedTableName: 'vehicle_types',
        columnNames: ['type_id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vehicles');
  }
}

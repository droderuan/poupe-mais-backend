import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addValueTypeConlumnIntoTransactions1620180709513
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('transactions', [
      new TableColumn({
        name: 'value',
        type: 'decimal',
        precision: 11,
        scale: 2,
        isNullable: false,
      }),
      new TableColumn({
        name: 'type',
        type: 'varchar',
        precision: 11,
        scale: 2,
        isNullable: false,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transactions', 'value');
    await queryRunner.dropColumn('transactions', 'type');
  }
}

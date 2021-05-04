import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addColumnAlreadyPlacedIntoObjectives1620088672814
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'objectives',
      new TableColumn({
        name: 'already_placed',
        type: 'decimal',
        precision: 11,
        scale: 2,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('objectives', 'already_placed');
  }
}

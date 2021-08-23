import { Column, DataType, Model, Table } from "sequelize-typescript";

interface DepartmentCreationAttrs {
  name: string;
}

@Table({ tableName: "departments", createdAt: false, updatedAt: false })
export class Department extends Model<Department, DepartmentCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  dpId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  dpName: string;
}

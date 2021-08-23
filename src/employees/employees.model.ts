import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { Department } from "../departments/departments.model";

interface EmployeeCreationAttrs {
  name: string;
  active: boolean;
  dpId: number;
  userId: string;
}

@Table({ tableName: "employees", createdAt: false, updatedAt: false })
export class Employee extends Model<Employee, EmployeeCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  active: boolean;

  @ForeignKey(() => Department)
  @Column({ type: DataType.INTEGER })
  dpId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  author: User;
}

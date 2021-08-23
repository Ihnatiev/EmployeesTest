import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Employee } from "../employees/employees.model";

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: "users", createdAt: false, updatedAt: false })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: "3b276fba-d201-4db5-879d-a3c738a8272a", description: "Unique id" })
  @Column({ type: DataType.UUID, unique: true, primaryKey: true })
  id: string;

  @ApiProperty({ example: "user@mail.ua", description: "Email" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: "159357Pass", description: "Password" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @HasMany(() => Employee)
  employees: Employee[];
}

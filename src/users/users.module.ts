import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users.model";
import { AuthModule } from "../auth/auth.module";
import { Employee } from "../employees/employees.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Employee]),
    forwardRef(() => AuthModule)
  ],
  exports: [UsersService]
})
export class UsersModule {
}

import { forwardRef, Module } from "@nestjs/common";
import { EmployeesService } from "./employees.service";
import { EmployeesController } from "./employees.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Employee } from "./employees.model";
import { AuthModule } from "../auth/auth.module";
import { Department } from "../departments/departments.model";

@Module({
    providers: [EmployeesService],
    controllers: [EmployeesController],
    imports: [
        SequelizeModule.forFeature([Employee, Department]),
        forwardRef(() => AuthModule)
    ]
})
export class EmployeesModule {
}

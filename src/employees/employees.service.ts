import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Employee } from "./employees.model";
import { Department } from "../departments/departments.model";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { NOT_AUTHORIZED } from "../shared/constants";

@Injectable()
export class EmployeesService {
    constructor(@InjectModel(Employee) private employeeRepository: typeof Employee,
                @InjectModel(Department) private departmentRepository: typeof Department) {
    }

    async getCreatorByUserId(userId: string): Promise<Employee> {
        return await this.employeeRepository.findOne({where: {userId}});
    }

    async getAll(): Promise<Employee[]> {
        return await this.employeeRepository.findAll();
    }

    async getById(id: number): Promise<Employee> {
        return await this.employeeRepository.findOne({where: {id}, include: {all: true}});
    }

    async create(dto: CreateEmployeeDto, userId: string): Promise<any> {
        try {
            const employee: Employee = await this.employeeRepository.create({...dto, userId});

            return {
                success: true,
                message: "Employee created successfully!",
                employeeId: employee.id
            };
        } catch (e) {
            return {
                success: false,
                message: "Adding an employee failed!"
            };
        }
    }

    async updateById(dto: UpdateEmployeeDto, id: number, userId: string): Promise<any> {
        try {
            const creator: Employee = await this.getCreatorByUserId(userId);

            if (!creator) {
                throw new UnauthorizedException({success: false, message: NOT_AUTHORIZED});
            }

            await this.employeeRepository.update(dto, {where: {id}});

            return {
                success: true,
                message: "Updated successfully!"
            };
        } catch (e) {
            return {
                success: false,
                message: "Updating an employee failed!"
            };
        }
    }

    async deleteById(id: number, userId: string): Promise<Record<string, string | boolean>> {
        try {
            const creator: Employee = await this.getCreatorByUserId(userId);

            if (!creator) {
                throw new UnauthorizedException({success: false, message: NOT_AUTHORIZED});
            }

            await this.employeeRepository.destroy({where: {id}});

            return {
                success: true,
                message: "Employee deleted!"
            };
        } catch (e) {
            return {
                success: false,
                message: "Deleting an employee failed!"
            };
        }
    }
}

import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Request,
    UseGuards
} from "@nestjs/common";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { EmployeesService } from "./employees.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Employee } from "./employees.model";

@Controller("/api/employees")
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) {
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    getAll(): Promise<Employee[]> {
        return this.employeesService.getAll();
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    getOne(@Param("id") id: number): Promise<Employee> {
        return this.employeesService.getById(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreateEmployeeDto, @Request() request: any): Promise<any> {
        return this.employeesService.create(dto, request.user.id);
    }

    @Put(":id")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    update(
        @Body() dto: UpdateEmployeeDto,
        @Param("id")
            id: number,
        @Request() request: any
    ): Promise<any> {
        return this.employeesService.updateById(dto, id, request.user.id);
    }

    @Delete(":id")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    remove(@Param("id") id: number, @Request() request: any): Promise<Record<string, string | boolean>> {
        return this.employeesService.deleteById(id, request.user.id);
    }
}

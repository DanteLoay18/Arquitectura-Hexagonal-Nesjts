import { Controller, Get, Inject, Param } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiResponse, ApiTags } from "@nestjs/swagger";

import { Employee } from "../../../core/domain/Employee";
import { CompanyUseCases } from "src/core/application/services/CompanyUseCase";


@ApiTags('Company')
@Controller('/company')
export class CompanyController {

    constructor(private company: CompanyUseCases) {}

    @ApiInternalServerErrorResponse({ description: 'Error server'})
    @ApiResponse({ description: "Northwind's employees", type: Array<Employee> })
    @Get('/employee')
    async getEmployess() {
        return this.company.getEmployees()
    }

}
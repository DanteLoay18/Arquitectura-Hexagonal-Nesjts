import { Controller, Get, Inject, Param } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiResponse, ApiTags } from "@nestjs/swagger";

import { Customer } from "../../../core/domain/Customer";
import { CustomerPortfolioUseCases } from "src/core/application/services/CustomerPortafolioUseCases";


@ApiTags('Portfolio')
@Controller('/portfolio')
export class CustomerPortfolioController {

    constructor(private portfolio: CustomerPortfolioUseCases) {}

    @ApiInternalServerErrorResponse({ description: 'Error server'})
    @ApiResponse({ description: 'Customers list from northwind company', type: Array<Customer> })
    @Get('/customer')
    async getCustomers() {
        return this.portfolio.getCustomer()
    }

    @ApiInternalServerErrorResponse({ description: 'Error server'})
    @ApiResponse({ description: 'Customers list by demographic id from northwind company', type: Array<Customer> })
    @Get('/customer/demoghraphic/:id')
    async getCustomersByDemographic(@Param('id') demographicId: string) {
        return this.portfolio.getByDemographics('')
    }

}
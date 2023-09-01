import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { NorthwindDatabaseModule } from "./Db/northwind-database.module";
import { CategoryEntity } from "./Db/entities/category.entity";
import { ProductEntity } from "./Db/entities/product.entity";
import { SupplierEntity } from "./Db/entities/supplier.entity";
import { CustomersEntity } from "./Db/entities/customer.entity";
import { EmployeesEntity } from "./Db/entities/employess.entity";
import { ShippersEntity } from "./Db/entities/shippers.entity";
import { OrdersEntity } from "./Db/entities/orders.entity";
import { OrderDetailsEntity } from "./Db/entities/order-details.entity";


@Module({
    imports:[
        NorthwindDatabaseModule,
        TypeOrmModule.forFeature([
        CategoryEntity,
        ProductEntity,
        SupplierEntity,
        CustomersEntity,
        EmployeesEntity,
        ShippersEntity,
        OrdersEntity,
        OrderDetailsEntity
        ]),
    ],
    exports: [
        NorthwindDatabaseModule,
        TypeOrmModule.forFeature([
          ShippersEntity,
        ]),
    ]
})
export class PersistenceModule { }
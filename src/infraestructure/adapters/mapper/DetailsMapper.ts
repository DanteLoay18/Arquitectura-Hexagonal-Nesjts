import { Injectable } from "@nestjs/common";
import { Detail } from "../../../core/domain/vo/Detail";
import { OrderDetailsEntity } from "src/infraestructure/persistence/Db/entities/order-details.entity";
import { Mapper } from "src/core/shared/Mapper";

@Injectable()
export class DetailsMapper implements Mapper<OrderDetailsEntity[], Detail[]> {
    
    map(entities: OrderDetailsEntity[]): Detail[] {
        
        return entities.map(detail => new Detail({
            ...detail,
            discount: detail.discount,
            unitPrice: detail.unitPrice
        }))

    }

}
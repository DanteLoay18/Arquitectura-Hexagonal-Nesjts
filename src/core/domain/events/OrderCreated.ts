import { DomainEvent } from "src/core/shared/DomainEvent";
import { Order } from "../Order";

export class OrderCreated extends DomainEvent<Order>{
    
    static EVENT_NAME = 'dante-app.order-created';

    constructor(order: Order){
        super(order)
    }

    getName(): string {
        return OrderCreated.EVENT_NAME
    }
}
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { OrderCreated } from "../../../../domain/events/OrderCreated";
import { StockUseCases } from "../../../services/StockUseCases";

@EventsHandler(OrderCreated)
export class OrderCreatedHandler implements IEventHandler<OrderCreated> {

    constructor(private stock: StockUseCases) { }

    async handle(event: OrderCreated) {
        const order = event.getData()
        console.log('Evento Orden creada')
        await this.stock.updateStockProducts(order)
    }

}
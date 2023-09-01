import { Order } from "src/core/domain/Order";
import { OrderService } from "src/core/domain/services/OrderService";
import { CreateOrderDto } from "src/core/shared/dto/CreateOrderDto";
import { OrderCreatedDto } from "src/core/shared/dto/OrdersCreatedDto";
import { Paginated } from "../utils/Paginated";
import { count } from "console";

export interface GetOrdersRequest{
    page:number;
    size: number;

}

export class PurchaseUseCases{
    constructor(private order: OrderService){}

    async createOrder(createOrderDto:CreateOrderDto): Promise<OrderCreatedDto>{
        console.log("desde el application",createOrderDto)
        return this.order.create(createOrderDto)
                        .then(order => order.getSummary())
    }

    async getOrders(getOrder: GetOrdersRequest){
        const offset =getOrder.page -1;
        const orders= await this.order.getOrdersSlice(getOrder.size,offset);
        const totalRecords = await this.order.getOrdersCount();

        return Paginated.create({
            ...getOrder,
            count: totalRecords,
            data: orders
        })   
    }
}
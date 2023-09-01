import { CreateOrderDto } from "src/core/shared/dto/CreateOrderDto";
import { EventBusPublisher } from "../ports/inbound/EventBusPublisher";
import { CustomerRepository, EmployeeRepository, OrderRepository, ProductRepository, ShipperRepository } from "../ports/outbound";
import { EntityNotFoundException } from "src/core/shared/exception/EntityNotFoundException";
import { CreateDetailDTO } from "src/core/shared/dto/CreateDetailDto";
import { Detail } from "../vo/Detail";
import { ShippingDto } from "src/core/shared/dto/ShippingDto";
import { Order } from "../Order";
import { OrderId } from '../vo/OrderId';
import { OrderCreated } from "../events/OrderCreated";


export class OrderService{

    constructor(
        private readonly order:OrderRepository,
        private readonly customer:CustomerRepository,
        private readonly employee:EmployeeRepository,
        private readonly shipper: ShipperRepository,
        private readonly product: ProductRepository,
        private readonly eventBus: EventBusPublisher
    ){}
    
    async create(createOrder: CreateOrderDto){
        const customer = await this.getCustomer(createOrder.customerId);
        const employee = await this.getEmployee(createOrder.employeeId);
        const details = await this.getProductDetail(createOrder.details);

        const shipping : ShippingDto = {
            shipper: await this.getShipper(createOrder.shipperId),
            freight:createOrder.freight,
            shippedDate:createOrder.shippedDate,
            destination:{
                name:createOrder.shipName,
                address:createOrder.shipAddress,
                city:createOrder.shipCity,
                country:createOrder.shipCountry,
                region:createOrder.shipRegion
            }
        }
        console.log('Dominio', {customer, employee, details, shipping})
        return Order.createNewOrder(customer, employee, details, shipping);
    }

    async getCustomer(customerId:any){
        const customer = await this.customer.findById(customerId);
        if(!customer){
            throw new EntityNotFoundException(`Custome(id="${customerId}" no encontrado)`)
        }
        return customer;
    }

    async getEmployee(employeeId:any){
        const employee = await this.employee.findById(employeeId);
        if(!employee){
            throw new EntityNotFoundException(`Employee(id="${employeeId}") no encontrado`);
        }
        return employee;
    }

    async getShipper(shipperId: any){
        const shipper = await this.shipper.findById(shipperId);
        if(!shipper){
            throw new EntityNotFoundException(`Shipper(id="${shipperId}") no encontrado`);
        }
        return shipper
    }

    async getProduct(productId:any){
        const product= await this.product.findById(productId);
        if(!product){
            throw new EntityNotFoundException(`Product(id="${productId}" no encontrado)`)
        }
        return product;
    }

    async getProductDetail(detailsDto: CreateDetailDTO[])   {
        const details: Detail[]=[];
        for(let detail of detailsDto){
            const entity = new Detail({
                product : await this.getProduct(detail.productId),
                unitPrice: detail.unitPrice,
                discount: detail.discount,
                quantity: detail.quantity
            })
            details.push(entity);
        }
        return details;
    } 

    async save(order: Order):Promise<Order>{
        return this.order
                    .save(order)
                    .then(orderId => {
                        order.orderId= orderId
                        return order
                    })
                    .then(order => {
                        this.eventBus.publish(new OrderCreated(order))
                        return order;
                    })
    }


    async getOrdersSlice(limit: number, offset:number){
        return this.order.findBySlice(limit,offset)
    }

    async getOrdersCount(){
        return this.order.count();
    }
}
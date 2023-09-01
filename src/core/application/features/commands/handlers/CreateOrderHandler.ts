import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PurchaseUseCases } from "../../../services/PurchaseUseCases";
import { CreateOrderCommand } from "../CreateOrderCommand";

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {

    constructor(private purchase: PurchaseUseCases) { }

    async execute(command: CreateOrderCommand) {
        console.log("Handler", command)
        return this.purchase.createOrder(command.order)
    }

}
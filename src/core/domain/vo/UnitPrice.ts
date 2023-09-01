import { ValueObject } from "src/core/shared/ValueObject";


export class UnitPrice extends ValueObject<number>{

    constructor(value:number){
        super(value, `${value} discount cannot be applied`)
    }

    protected validate(value: number): boolean {
        return value >=0;
    }

}
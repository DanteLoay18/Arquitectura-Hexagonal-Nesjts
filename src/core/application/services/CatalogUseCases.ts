import {Injectable} from '@nestjs/common'
import { ProductService } from 'src/core/domain/services/ProductService'

@Injectable()
export class CatalogUseCases{
    constructor(private product: ProductService){}

    getProducts(){
       

    }

    getCategories(){

    }
}
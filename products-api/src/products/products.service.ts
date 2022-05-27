import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/sequelize'
import { Product } from "./products.model";

@Injectable()
export class ProductsService{
    
    constructor(
        @InjectModel(Product)
        private productModel: typeof Product
    ){}

    async obtainAll(): Promise<Product[]>{
        return this.productModel.findAll();
    }

    async obtainOne(id: number): Promise<Product>{
        return this.productModel.findByPk(id);
    }

    async create(product: Product){
        this.productModel.create(product);
    }

    async alter(product: Product): Promise<number[]>{
        return this.productModel.update(product, {
            where: {
                id: product.id
            }
        });
    }

    async delete(id: number){
        const product: Product = await this.obtainOne(id);
        product.destroy();
    }
}
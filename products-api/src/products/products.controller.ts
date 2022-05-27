import { Body, Controller, Delete, Get, Module, Param, Post, Put } from "@nestjs/common";
import { Product } from "./products.model";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController{

    constructor(private productsService: ProductsService){
    }

    @Get()
    obtainAll(): Promise<Product[]>{
        return this.productsService.obtainAll()
    }

    @Get(':id')
    async obtainOne(@Param() params): Promise<Product>{
        return this.productsService.obtainOne(params.id);
    }

    @Post()
    async create(@Body() body: Product){
        body.id = 100;
        this.productsService.create(body);
        return 'Created product';
    }

    @Put()
    async alter(@Body() body: Product): Promise<number[]>{
        return this.productsService.alter(body);
    }

    @Delete()
    async delete(@Param() params){
        this.productsService.delete(params.id);
    }
}
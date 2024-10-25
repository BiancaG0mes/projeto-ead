import { NextFunction, Request, Response } from 'express';
import { ProductService } from "../services/ProductService";

class ProductController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const { name, price } = req.body;
            const validation = this.isValidInput(name, price);
            if(!validation.isValid) {
                res.status(400).json({error: validation.msg});
            }
            const product = await this.productService.create(name, price);
            res.status(201).json(product);
        } catch (error) {
            this.handleError(res, error, "Erro ao criar Product.");
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const { name, price } = req.body;
            const validation = this.isValidInput(name, price);
            if(!validation.isValid) {
                res.status(400).json({error: validation.msg});
            }
            const product = await this.productService.update(id, name, price);
            res.status(200).json(product);
        } catch (error) {
            this.handleError(res, error, "Erro ao atualizar Product.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            await this.productService.delete(id);
            res.status(204).send();
        } catch (error) {
            this.handleError(res, error, "Erro ao deletar Product.");
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const products = await this.productService.getAll();
            res.status(200).json(products);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar todos Products.");
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const product = await this.productService.getById(id);
            res.status(200).json(product);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar Product pelo ID.");
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const product = await this.productService.getById(id);
            if (!product) {
                res.status(404).json({ error: "Product não encontrado." });
            }
            next();
        } catch (error) {
            this.handleError(res, error, "Erro ao verificar Product.");
        }
    }

    private handleError(res: Response, error: unknown, message: string) {
        if (error instanceof Error) {
            console.error(`${message} ${error.message}`);
            res.status(400).json({ error: error.message });
        } else {
            console.error(`Erro inesperado: ${error}`);
            res.status(500).json({ error: "Ocorreu um erro inesperado." });
        }
    }

    private validateId(id: string) {
        if (id.length !== 24) {
            throw new Error("ID Inválido.");
        }
    }

    private isValidInput(name: any, price: any) {
        if(typeof name !== "string" || name.trim().length == 0) {
            return {isValid: false, msg: "Invalid name: must be a non empty string."}
        }
        if(typeof price !== "number" || price < 0) {
            return {isValid: false, msg: "Invalid price: must be a non negative number."}
        }
        return  {isValid: true };
    }
}

export { ProductController };

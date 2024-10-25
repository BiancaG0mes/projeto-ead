import { prisma } from '../prisma';

class ProductService {

    async create (name: string, price: number) {
        try {
            const product = await prisma.product.create({
                data: {
                    name,
                    price
                }
            });
            return product;
        } catch (error) {
            console.log(`Error ao criar product: ${error}`);
            throw error;
        }
    }

    async update (id: string, name: string, price: number) {
        try {
            const product = await prisma.product.update({
                where: { id },
                data: {
                    name,
                    price
                }
            });
            return product;
        } catch (error) {
            console.log(`Error ao atualizar product: ${error}`);
            throw error;
        }
    }

    async delete (id: string) {
        try {
            await prisma.product.delete({
                where: { id }
            });
        } catch (error) {
            console.log(`Error ao deletar product: ${error}`);
            throw error;
        }
    }

    async getAll () {
        try {
            const products = await prisma.product.findMany({
                orderBy: { id: 'asc' }
            });
            return products;
        } catch (error) {
            console.log(`Error ao buscar products: ${error}`);
            throw error;
        }
    }

    async getById (id: string) {
        try {
            const product = await prisma.product.findUnique({
                where: { id }
            });
            return product;
        } catch (error) {
            console.log(`Error ao buscar product: ${error}`);
            throw error;
        }
    }
}

export { ProductService };

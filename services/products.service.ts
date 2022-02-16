import fs from 'fs'

export const listProducts = async () => {
    const products = await fs.readFileSync('data/products.json');

    return {
        data: JSON.parse(products.toString())
    }
};

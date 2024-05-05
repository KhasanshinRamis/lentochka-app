import axios from 'axios';
import * as z from 'zod';
import { NewProductSchema } from '@/schemas';
import { IProduct } from '@/interface/IProduct';

class ProductService {
	private URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/admin/new-product`;

	async create(newPost: z.infer<typeof NewProductSchema>) {
		return axios.post(`${this.URL}`, newPost);
	}
}

export default new ProductService();
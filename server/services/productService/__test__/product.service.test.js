import {pool} from '../../../config/dbConfig/database.js';
import * as productService from '../product.service.js';
import {SQL_QUERIES} from '../../../utils/queries.js';


// Mock environment values
jest.mock('../../../config/dbConfig/database.js', () => ({
    pool: {
        query: jest.fn()
      }
  }));
  
  describe('Product Service', () => {
    describe('createProduct', () => { 
        it('should create product', async () => {
            const mockProductId = 1;
            pool.query.mockResolvedValueOnce({ insertId: mockProductId });

            const productName = 'testProduct', userId = 1, createdAt = new Date().toISOString();
            await productService.createProduct(productName, userId, createdAt);

            expect(pool.query).toHaveBeenCalledWith(SQL_QUERIES.product.insertQuery, [productName, userId, createdAt]);
        });
        it('should throw an error when database query fails', async () => {
            // Mock query error
            const errorMessage = 'Database error';
            pool.query.mockRejectedValueOnce(new Error(errorMessage));
      
            // Call createProduct function
            const productName = 'Test Product';
            const userId = 123;
            const createdAt = new Date().toISOString();
      
            // Expectations
            await expect(productService.createProduct(productName, userId, createdAt)).rejects.toThrow(`Failed to create product: ${errorMessage}`);
          });
    });

    describe('getProductById', () => {
      it('should return product data when product ID exists', async () => {
        // Mock query result
        const mockProductData = [{"productId": 1, "productName": "NEXT GEN App"}];
        pool.query.mockResolvedValueOnce([mockProductData]);
  
        const productId = 1;
        const productData = await productService.getProductById(productId);
  
        expect(pool.query).toHaveBeenCalledWith(SQL_QUERIES.product.getByIdQuery, [productId]);
        expect(productData).toEqual(mockProductData);
      });

  
      it('should throw an error when database query fails', async () => {
        // Mock query error
        const errorMessage = 'Database error';
        pool.query.mockRejectedValueOnce(new Error(errorMessage));
  
        const teamId = 1;
        await expect(productService.getProductById(teamId)).rejects.toThrow(`Failed to get product by id: ${errorMessage}`);
      });
    });

    describe('getAllProducts', () => {
        it('should return product list', async () => {
          // Mock query result
          const mockProductData = [{"teamId": 1, "teamName": "NEXT GEN TEAM", "createdAt": "2024-02-10T13:21:45.184Z"}, {"teamId": 2, "teamName": "OPDS", "createdAt": "2024-02-04T13:20:14.184Z"}];
          pool.query.mockResolvedValueOnce([mockProductData]);
    
          const productData = await productService.getProducts()
    
          expect(pool.query).toHaveBeenCalledWith(SQL_QUERIES.product.getAllQuery);
          expect(productData).toEqual(mockProductData);
        });
  
    
        it('should throw an error when database query fails', async () => {
          // Mock query error
          const errorMessage = 'Database error';
          pool.query.mockRejectedValueOnce(new Error(errorMessage));
    
          expect(pool.query).toHaveBeenCalledWith(SQL_QUERIES.product.getAllQuery);
          await expect(productService.getProducts()).rejects.toThrow(`Failed to get products: ${errorMessage}`);
        });
    });

    describe('updateProduct', () => {
        it('should update an existing product', async () => {
          // Mock query result
          const productId = 1;
          const productName = 'Updated Product';
          pool.query.mockResolvedValueOnce({ affectedRows: 1 });
    
          // Call updateProduct function
          const result = await productService.updateProduct(productName, productId);
    
          // Expectations
          expect(pool.query).toHaveBeenCalledWith(
            SQL_QUERIES.product.updateQuery,
            [productName, productId]
          );
          expect(result).toEqual({ affectedRows: 1 });
        });
        it('should throw an error when database query fails', async () => {
            // Mock query error
            const errorMessage = 'Database error';
            pool.query.mockRejectedValueOnce(new Error(errorMessage));
      
            // Call updateProduct function
            const productId = 1;
            const productName = 'Updated Product';
      
            // Expectations
            await expect(productService.updateProduct(productName, productId)).rejects.toThrow(`Failed to update product: ${errorMessage}`);
        });
    });    

  });

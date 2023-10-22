import express from 'express';
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import { brainTreePaymentController,braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productListController, productPhotoController, realtedProductController, searchProductController, updateProductController } from '../controller/productController.js';
import formidable from 'express-formidable';

const router = express.Router();

router.post('/create-product', requireSignIn,isAdmin,formidable(), createProductController);
router.put('/update-product/:pid', requireSignIn,isAdmin,formidable(), updateProductController);
router.get('/get-product', getProductController);

router.get('/get-product/:slug',getSingleProductController);
router.get('/product-photo/:pid',productPhotoController);
router.delete('/delete-product/:pid', deleteProductController);
router.get('/product-count' , productCountController);
router.get('/product-list/:page' , productListController);
router.get('/search/:keyword', searchProductController);
router.get('/related-product/:pid/:cid',realtedProductController);
router.get('/product-category/:slug',productCategoryController);
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);
router.get("/braintree/token", braintreeTokenController);

export default router;
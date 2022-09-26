import express from 'express'
const productRouter = express.Router()

import { productCreateController } from '../../controllers/product/create.js'
import { productDeleteController } from '../../controllers/product/delete.js'
import { productCountController } from '../../controllers/product/productCount.js'
import { productSearchController } from '../../controllers/product/search.js'
import { productUpdateController } from '../../controllers/product/update.js'

productRouter.get('/count', productCountController)
productRouter.post('/search', productSearchController)
productRouter.get('/create', productCreateController)
productRouter.put('/update', productUpdateController)
productRouter.delete('/delete/:id', productDeleteController)

export default productRouter
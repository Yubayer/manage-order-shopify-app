import express from 'express'
const orderRouter = express.Router()

import { allOrdersController } from '../../controllers/order/all.js'
import { UrderOrdersController } from '../../controllers/order/update.js'

orderRouter.get('/all', allOrdersController)
orderRouter.post('/update', UrderOrdersController)


export default orderRouter
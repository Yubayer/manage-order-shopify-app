import updateOrderHelper from "../../helpers/order/update-order.js";

export const UrderOrdersController = async (req, res) => {
    console.log("all order")
    const session = await Shopify.Utils.loadCurrentSession(
        req,
        res,
        app.get("use-online-tokens")
      );
      let status = 200;
      let error = null;
      let data = null
  
      try {
        const response = await updateOrderHelper(session, req);
        data = response
      } catch (e) {
        console.log(`Failed to process products/create: ${e.message}`);
        status = 500;
        error = e.message;
      }
      res.status(status).send({ success: status === 200, data, error });
}
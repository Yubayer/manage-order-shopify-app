import productCreator from "../../helpers/product-creator.js";

export const productCreateController = async (req, res) => {
    const session = await Shopify.Utils.loadCurrentSession(
        req,
        res,
        app.get("use-online-tokens")
      );
      let status = 200;
      let error = null;
  
      try {
        await productCreator(session);
      } catch (e) {
        console.log(`Failed to process products/create: ${e.message}`);
        status = 500;
        error = e.message;
      }
      res.status(status).send({ success: status === 200, error });
}
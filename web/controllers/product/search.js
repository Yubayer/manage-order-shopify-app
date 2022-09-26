import productSearch from "../../helpers/product-search.js";

export const productSearchController = async (req, res) => {
    console.log("searcing....")
    const session = await Shopify.Utils.loadCurrentSession(
        req,
        res,
        app.get("use-online-tokens")
      );
      let status = 200;
      let error = null;
  
      try {
        const response = await productSearch(session, req);
        res.status(status).send({ success: status === 200, response });
      } catch (e) {
        console.log(`Failed to process products/create: ${e.message}`);
        status = 500;
        error = e.message;
        res.status(status).send({ success: status === 500, error });
      }
    //   res.status(status).send({ success: status === 200, error });
}
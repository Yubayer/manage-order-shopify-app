export const productCountController = async (req, res) => {
    const session = await Shopify.Utils.loadCurrentSession(
        req,
        res,
        app.get("use-online-tokens")
      );
      const { Product } = await import(
        `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
      );
  
      const countData = await Product.count({ session });
      res.status(200).send(countData);
}
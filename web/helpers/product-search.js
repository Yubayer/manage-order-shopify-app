import { Shopify } from "@shopify/shopify-api";

export default async function productSearch(session, req) {
    console.log("ssss")
    const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);
    console.log("show product: ", req.body)

    try {
        const data = await client.query({
            data: `{
          products(first: 2, reverse: true) {
            edges {
              node {
                id
                title
              }
            }
          }
        }`,
        });
        
        return data

    } catch (error) {
        console.log("error:  -", error.response.errors)
    }
}


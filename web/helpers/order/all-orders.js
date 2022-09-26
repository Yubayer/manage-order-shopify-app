import { Shopify } from "@shopify/shopify-api";

const orderQuery = `{
  draftOrders(first: 2) {
    edges {
      node {
        id
        order {
            id
            name
            createdAt
            metafields (first: 10) {
                edges{
                    node{
                        id
                        namespace
                        value
                        key
                    }
                }
            }
          }
        status
        lineItems(first: 10) {
            edges {
              node {
                sku
                title
                quantity
                name
                vendor
              }
            }
          }
        metafields (first: 10) {
            edges{
                node{
                    id
                    namespace
                    value
                    key
                }
            }
        }
        customer {
            firstName
            lastName
            email
        }
      }
    }
  }
}`

const orderQuery2 = `{
  orders(first: 5) {
    edges{
      node{
        id
        name
        metafields(first: 50) {
          edges {
            node {
              id
              namespace
              value
              key
            }
          }
        }
      }
    }
  }
}`

export default async function allOrders(session, req) {
    console.log("orders helper")
    const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);

    try {
        const data = await client.query({
            data: orderQuery2
        });

        return data
    }
    catch (e) {
        console.log("order error:: ", e.response)
        console.log("order error2:: ", e.response.errors)
        console.log("order error2 location:: ", e.response.errors[0].locations)
        console.log("order error2 path:: ", e.response.errors[0].path)
    }

}



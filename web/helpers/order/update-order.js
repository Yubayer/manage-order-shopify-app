import { Shopify } from "@shopify/shopify-api";

const orderUpdateMutation = `mutation updateOrderMetafields($input: OrderInput!) {
    orderUpdate(input: $input) {
      order {
        id
        metafields(first: 2) {
          edges {
            node {
              id
              namespace
              key
              value
            }
          }
        }
      }
      userErrors {
        message
        field
      }
    }
  }`

export default async function updateOrderHelper(session, req) {
    console.log("orders helper")

    const { id, orderId, key, namespace, requirements } = req.body
    console.log("key: ", key)
    const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);



    try {
        const data = await client.query({
            data: {
                "query": orderUpdateMutation,
                "variables": {
                    "input": {
                        "metafields": [
                            {
                                "id": `${id}`,
                                "value": `{"requirements":${requirements}}`
                            }
                        ],
                        "id": `${orderId}`
                    }
                },
            },
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



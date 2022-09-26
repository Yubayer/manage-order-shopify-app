import React from 'react'
import { Card, Page, Layout, TextContainer, Heading, Image, TextField, Banner, FormLayout } from "@shopify/polaris";

function ShowProducts({
    products
}) {
    return (
        <>
            {products.length > 0 && products.map(product => {
                return <Layout>
                    <Layout.Section sectioned>
                        <Card title="Order details" sectioned>
                            <p>
                                Use to follow a normal section with a secondary section to create
                                a 2/3 + 1/3 layout on detail pages (such as individual product or
                                order pages). Can also be used on any page that needs to structure
                                a lot of content. This layout stacks the columns on small screens.
                            </p>
                        </Card>
                    </Layout.Section>
                    <Layout.Section secondary sectioned>
                        <Card title="Tags" sectioned>
                            <p>Add tags to your order.</p>
                        </Card>
                    </Layout.Section>
                </Layout>
                
            })}
        </>
    )
}

export default ShowProducts
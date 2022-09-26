import { Card, Page, Layout, TextContainer, Heading, Image, TextField, Banner, FormLayout } from "@shopify/polaris";
import { ResourcePicker, TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import ShowProducts from "./ShowProducts";

export default function Manage() {
    const [open, setOpen] = useState(false)
    const [products, setProducts] = useState([])

    const handleSelectorOpen = e => {
        setOpen(true)
    }

    const handleSelector = e => {
        setProducts([...products, ...e.selection])
        setOpen(false)
    }

    const handleDelete = e => {
        console.log(products)
    }

    return (
        <Page fullWidth>
            <TitleBar
                title="Page name"
                primaryAction={{ content: "Selector", onAction: handleSelectorOpen }}
                secondaryActions={[
                    { content: "delete", onAction: handleDelete }
                ]}
            />
            <Layout>
                <ResourcePicker
                    resourceType="Product"
                    open={open}
                    onSelection={handleSelector}
                    onCancel={() => setOpen(false)}
                    showVariants={false}
                    initialQuery="shirt"
                />
                <Layout.Section>
                    <Card sectioned>
                        <Heading>Heading</Heading>
                        <TextContainer>
                            <p>Body</p>
                            <div style={{ padding: "0 20px" }}>
                                <Image
                                    source={'ad'}
                                    alt="Nice work on building a Shopify app"
                                    width={120}
                                />
                            </div>
                        </TextContainer>
                    </Card>
                </Layout.Section>
                <Layout.Section secondary>
                    <Card title="Tags" sectioned>
                        <p>Add tags to your order.</p>
                    </Card>
                </Layout.Section>
            </Layout>

            <ShowProducts
                products={products}
            />

        </Page>
    );
}

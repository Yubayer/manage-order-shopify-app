import { Card, Page, Layout, TextContainer, Heading, Image, TextField, Banner, FormLayout } from "@shopify/polaris";
import { ResourcePicker, TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import ShowProducts from "./ShowProducts";

export default function Manage() {
    const [open, setOpen] = useState(false)
    const [products, setProducts] = useState([])

    const handleSelectorOpen = e => {
        setOpen(true)
        setProducts([])
    }

    const handleSelector = e => {
        setProducts([...products, ...e.selection])
        setOpen(false)
    }

    const handleDelete = e => {
        console.log(products)
    }

    const handleClearProducts = e => {
        setProducts([])
    }

    return (
        <>
            <Card
                sectioned
                title="Manage page"
                actions={[
                    { content: "Delete", onAction: handleDelete },
                    { content: "Selector", onAction: handleSelectorOpen },
                    { content: "Clear", onAction: handleClearProducts }
                ]}
            />
            <br/>
            <Layout>
                <ResourcePicker
                    resourceType="Product"
                    open={open}
                    onSelection={handleSelector}
                    onCancel={() => setOpen(false)}
                    showVariants={false}
                    initialQuery="shirt"
                />
            </Layout>

            <ShowProducts
                products={products}
            />

        </>
    );
}

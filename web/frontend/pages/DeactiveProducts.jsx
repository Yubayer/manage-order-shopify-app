import { Card, Layout, Page, Form, FormLayout, TextField, Button, Select } from '@shopify/polaris'
import React from 'react'
import { useCallback } from 'react';
import { useState } from 'react';
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

function DeactiveProducts() {
    const [search, setSearch] = useState('');
    const fetch = useAuthenticatedFetch();

    const handleSearchProduct = e => {
        setSearch(e)
    }

    const handleSubmit = e => {
        fetch('/api/products/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                search,
                scope
            })
        })
            .then(e => e.json())
            .then(e => console.log(e))
            .catch(e => console.log(e))
    }

    const options = [
        { label: 'Title', value: 'title' },
        { label: 'Vendor', value: 'vendor' }
    ];

    const [scope, setScope] = useState('title');

    const handleSelectChange = e => {
        console.log(e)
    }

    return (
        <Page>
            <Layout>
                <Layout.Section secondary>
                    <Card sectioned>
                        <Form onSubmit={handleSubmit}>
                            <FormLayout>
                                <TextField
                                    value={search}
                                    onChange={handleSearchProduct}
                                    label="Text"
                                    type="text"
                                />

                                <Select
                                    label="Search by: "
                                    labelInline
                                    options={options}
                                    onChange={handleSelectChange}
                                    value={scope}
                                />

                                <Button submit>Submit</Button>
                            </FormLayout>
                        </Form>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    )
}

export default DeactiveProducts
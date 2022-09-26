import React from 'react'
import { Card, Layout, Button, ProgressBar, ButtonGroup, Text } from '@shopify/polaris'

function ViewOrders({
    handleAddPage,
    orders,
    handleDeletePage,
    handleUpdatePage
}) {
    return (
        <>
            {orders.map((order, index) => {
                return <Layout.Section key={`key--${index}`}>
                    <Card
                        sectioned
                        title={`Order Name: ${order.node.name}`}
                        actions={[
                            { content: "Add Page", onAction: () => handleAddPage(order) }
                        ]}
                    >
                        <strong>Order Id: {order.node.id}</strong>
                        <Card.Section title={`Prograce report: ${order.manage.prograce.prograce}%`}>
                            <Text variant="heading2xl" as="h3">
                                Online store dashboard
                            </Text>
                            <ProgressBar
                                progress={order.manage.prograce.prograce}
                                size="small"
                                ariaLabelledBy="29"
                            />
                        </Card.Section>
                        {order.manage.prograce.length > 0 && order.manage.prograce.all.map((page, i) => {
                            return <Card.Section
                                title={`${i + 1}. ${page.title}`}
                            >
                                <p>Time: {page.time}</p>
                                <p style={{ color: `${!page.complete ? "red" : "blue"}` }}>Status: {page.complete ? "Complete" : "InComplete"}</p>
                                <br />
                                <ButtonGroup>
                                    <Button onClick={() => handleUpdatePage(order, i)} size="slim">Update</Button>
                                    <Button onClick={() => handleDeletePage(order, i)} size="slim">Delete</Button>
                                </ButtonGroup>
                            </Card.Section>
                        })}
                    </Card>
                </Layout.Section>
            })}
        </>
    )
}

export default ViewOrders
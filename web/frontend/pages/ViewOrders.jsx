import React from 'react'
import { Card, Layout, Button, ProgressBar, ButtonGroup } from '@shopify/polaris'

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
                        <strong className={`${order.manage.prograce.prograce < 100 ? 'text-warning' : 'text-success'}`}>Order Id: {order.node.id}</strong><br />
                        <strong className={`${order.manage.prograce.prograce < 100 ? 'text-warning' : 'text-success'}`}>Total Pages: {order.manage.prograce.length}</strong><br />
                        <strong className={`${order.manage.prograce.prograce < 100 ? 'text-warning' : 'text-success'}`}>Complete Pages: {order.manage.prograce.complete.length}</strong><br />
                        <strong className={`${order.manage.prograce.prograce < 100 ? 'text-warning' : 'text-success'}`}>InComplete Pages: {order.manage.prograce.inComplete.length}</strong><br />
                        <Card.Section title={`Prograce report: ${order.manage.prograce.prograce.toFixed(0)}%`}>
                            <div class="progress">
                                <div
                                    class={`progress-bar progress-bar-striped progress-bar-animated ${order.manage.prograce.prograce.toFixed(2) < 100 ? 'bg-warning' : 'bg-success'}`}
                                    role="progressbar"
                                    aria-valuenow={order.manage.prograce.prograce.toFixed(2)}
                                    aria-valuemin="0" aria-valuemax="100"
                                    style={{ width: `${order.manage.prograce.prograce.toFixed(2)}%` }}>
                                    {order.manage.prograce.prograce.toFixed(0)}%
                                </div>
                            </div>
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
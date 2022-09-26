import { Card, Layout, Page } from '@shopify/polaris'
import React, { useEffect } from 'react'
import { TitleBar } from "@shopify/app-bridge-react";
import { useAuthenticatedFetch } from "../hooks";
import { useState } from 'react';
import AddPage from './AddPage';
import ViewOrders from './ViewOrders';
import UpdatePage from './UpdatePage';

function Order() {
    const [orders, setOrders] = useState([])
    const fetch = useAuthenticatedFetch();
    const [activeAddPageModal, setActiveAddPageModal] = useState(false)
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [singleOrder, setSingleOrder] = useState({})
    const [updatePageReq, setUpdatePageReq] = useState({})
    const [updateIndex, setUpdateIndex] = useState(0)
    const [newPage, setNewPage] = useState({ title: "", time: "", complete: false })

    useEffect(() => {
        fetchOrder()
    }, [])

    const handleUpdateOrders = async e => {
        console.log("primary action: view orders")
        fetchOrder()
    }

    const fetchOrder = async () => {
        console.log("fetch order => call api")
        const rawResponse = await fetch('/api/orders/all');
        const jsonResponse = await rawResponse.json();

        let oldOrder = jsonResponse.data.body.data.orders.edges
        let newOrders = oldOrder.filter(order => {
            let mx = order.node.metafields.edges.filter(m => m.node.key === 'requirements' ? true : false)
            if (mx.length > 0) {
                let manageNode = mx[0].node
                let prograce = updateValue(manageNode)
                order.manage = manageNode
                order.manage.prograce = prograce
            }
            else order.manage = null
            order.node.metafields.edges = mx
            return order.manage == null ? false : true
        })
        setOrders(newOrders)
        setSingleOrder({})
        setUpdateIndex(0)
        setUpdatePageReq({})
        setNewPage({ title: "", time: "", complete: false })
    }

    const updateValue = node => {
        let prograce = {}
        let value = JSON.parse(node.value)
        if (value.requirements) {
            let complete = value.requirements.filter(v => v.complete ? true : false)
            let inComplete = value.requirements.filter(v => v.complete ? false : true)
            prograce.length = value.requirements.length
            prograce.inComplete = inComplete
            prograce.complete = complete
            prograce.all = value.requirements
            prograce.prograce = value.requirements.length == 0 ? 0 : complete.length / value.requirements.length * 100
        } else {
            prograce.prograce = 0
            prograce.length = 0
            prograce.all = []
            prograce.inComplete = []
            prograce.complete = []
        }

        return prograce
    }

    const hadnleTest = e => {
        console.log(orders)
    }

    const handleAddPage = order => {
        console.log("add page")
        setActiveAddPageModal(true)
        setSingleOrder(order)
    }

    const handleNewPageInput = (value, name) => {
        setNewPage({ ...newPage, [name]: value })
    }

    const handleAddNewPage = async (e) => {
        let newPagevalue = singleOrder.manage.prograce.all
        newPagevalue.push(newPage)
        let newRqrs = JSON.stringify(newPagevalue)
        console.log(singleOrder)
        setActiveAddPageModal(false)
        const updateData = {
            requirements: newRqrs,
            orderId: singleOrder.node.id,
            id: singleOrder.manage.id
        }
        await updateOrderMetafileds(updateData)
    }

    const updateOrderMetafileds = async (data) => {
        const addResponse = await fetch('/api/orders/update', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        const jsonREsponse = await addResponse.json()
        fetchOrder()
    }

    const handleDeletePage = async (order, index) => {
        console.log(order, index)
        const reqrs = order.manage.prograce.all.filter((a, i) => i == index ? false : true)
        console.log(JSON.stringify(reqrs))

        const updateData = {
            requirements: JSON.stringify(reqrs),
            orderId: order.node.id,
            id: order.manage.id,
        }
        await updateOrderMetafileds(updateData)
    }

    const handleUpdatePage = (order, index) => {
        setOpenUpdateModal(true)
        setUpdateIndex(index)
        let updateOrder = order.manage.prograce.all
        let fi = updateOrder[index]
        setSingleOrder(order)
        setUpdatePageReq(fi)
    }

    const handleUpdatePageInput = (value, key) => {
        value === 'true' ? value = true : value === 'false' ? value = false : value
        setUpdatePageReq({ ...updatePageReq, [key]: value })
    }

    const handleUpdatePageSubmit = async (e) => {
        setOpenUpdateModal(false)
        let updateOrderReq = singleOrder.manage.prograce.all
        updateOrderReq[updateIndex] = updatePageReq

        const updateData = {
            requirements: JSON.stringify(updateOrderReq),
            orderId: singleOrder.node.id,
            id: singleOrder.manage.id
        }
        await updateOrderMetafileds(updateData)
    }

    return (
        <>
            <Card
                sectioned
                title="Manage Orders"
                actions={[
                    { content: "Update Order", onAction: handleUpdateOrders },
                    { content: "Test Order", onAction: hadnleTest }
                ]}
            />
            <br/>
            <Layout>
                <ViewOrders
                    orders={orders}
                    handleAddPage={handleAddPage}
                    handleDeletePage={handleDeletePage}
                    handleUpdatePage={handleUpdatePage}
                />

                <AddPage
                    activeAddPageModal={activeAddPageModal}
                    setActiveAddPageModal={setActiveAddPageModal}
                    order={singleOrder}
                    newPage={newPage}
                    handleNewPageInput={handleNewPageInput}
                    handleAddNewPage={handleAddNewPage}
                />

                <UpdatePage
                    openUpdateModal={openUpdateModal}
                    setOpenUpdateModal={setOpenUpdateModal}
                    handleUpdatePageInput={handleUpdatePageInput}
                    updatePage={updatePageReq}
                    handleUpdatePageSubmit={handleUpdatePageSubmit}
                />
            </Layout >
        </>
    )
}

export default Order
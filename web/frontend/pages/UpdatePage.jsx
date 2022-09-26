import React from 'react'
import { useState } from 'react';
import { Modal, Select, Stack, TextField } from '@shopify/polaris'


function UpdatePage({
    handleUpdatePageInput,
    openUpdateModal,
    setOpenUpdateModal,
    updatePage,
    handleUpdatePageSubmit
}) {

    const options = [
        { label: 'Complete', value: true },
        { label: 'InComplete', value: false }
    ];

    return (
        <div style={{ height: '500px' }}>
            <Modal
                open={openUpdateModal}
                onClose={() => setOpenUpdateModal(false)}
                title="Update Order Requirements"
                primaryAction={{content: "update", onAction: handleUpdatePageSubmit}}
            >
                <Modal.Section>
                    <Modal.Section>
                        <Stack vertical>
                            <Stack.Item fill>
                                <TextField
                                    label="Title"
                                    value={updatePage.title}
                                    onChange={(value) => handleUpdatePageInput(value, 'title')}
                                    autoComplete="off"
                                />
                                <TextField
                                    label="Time"
                                    value={updatePage.time}
                                    onChange={(value) => handleUpdatePageInput(value, 'time')}
                                    autoComplete="off"
                                />
                                <br />
                                <Select
                                    label="Status"
                                    options={options}
                                    onChange={(value) => handleUpdatePageInput(value, 'complete')}
                                    value={updatePage.complete}
                                />
                            </Stack.Item>
                        </Stack>
                    </Modal.Section>
                </Modal.Section>
            </Modal>
        </div>
    )
}

export default UpdatePage
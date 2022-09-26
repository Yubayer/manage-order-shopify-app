import { Modal, Select, Stack, TextField } from '@shopify/polaris'

import React from 'react'
import { useState } from 'react';

function AddPage({
    activeAddPageModal,
    setActiveAddPageModal,
    order,
    newPage,
    handleNewPageInput,
    handleAddNewPage
}) {

    const [selected, setSelected] = useState(false);
    const options = [
        { label: 'Complete', value: true },
        { label: 'InComplete', value: false }
    ];

    return (
        <div style={{ height: '500px' }}>
            <Modal
                open={activeAddPageModal}
                onClose={() => setActiveAddPageModal(false)}
                title="Reach more shoppers with Instagram product tags"
                primaryAction={{ content: "Add New Page", onAction: handleAddNewPage }}
            >
                <Modal.Section>
                    <Modal.Section>
                        <Stack vertical>
                            <Stack.Item fill>
                                <TextField
                                    label="Title"
                                    value={newPage.title}
                                    onChange={(value) => handleNewPageInput(value, 'title')}
                                    autoComplete="off"
                                />
                                <TextField
                                    label="Time"
                                    value={newPage.time}
                                    onChange={(value) => handleNewPageInput(value, 'time')}
                                    autoComplete="off"
                                />
                                <br />
                                <Select
                                    label="Status"
                                    options={options}
                                    onChange={(value) => handleNewPageInput(value, 'complete')}
                                    value={selected}
                                />
                            </Stack.Item>
                        </Stack>
                    </Modal.Section>
                </Modal.Section>
            </Modal>
        </div>
    )
}

export default AddPage
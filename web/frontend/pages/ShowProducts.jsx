import React from 'react'
import { Card, Page, Layout, TextContainer, Heading, Image, TextField, Banner, FormLayout } from "@shopify/polaris";

function ShowProducts({
    products
}) {
    return (
        <>
            <div class="row row-cols-2 row-cols-md-4 g-3">
                {products.length > 0 && products.map(product => {
                    return <div class="col">
                        <div class="card h-100">
                            <img
                                src={product.images[0].originalSrc}
                                class="card-img-top"
                                alt="imag"
                                width="100"
                                style={{aspectRatio: '.9', objectFit: 'cover'}} />
                            <div class="card-body">
                                <h5 class="card-title">{product.title}</h5>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}

export default ShowProducts
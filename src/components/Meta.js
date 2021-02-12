import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ description, title }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome to E-Shop',
    description: "We sell the best product"

}

export default Meta

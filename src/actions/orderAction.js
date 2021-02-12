import axios from 'axios'

export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: "ORDER_CREATE_REQUEST" })

        const { data } = await axios.post('/api/orders', order)

        dispatch({ type: "ORDER_CREATE_SUCCESS", payload: data })
    } catch (error) {
        dispatch({
            type: "ORDER_CREATE_FAILD",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: "ORDER_DETAILS_REQUEST" })

        const { data } = await axios.post(`/api/orders/${id}`)

        dispatch({ type: "ORDER_DETAILS_SUCCESS", payload: data })
    } catch (error) {
        dispatch({
            type: "ORDER_DETAILS_FAILD",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }

}

export const payOrderAction = (id, paymentResult) => async (dispatch) => {
    try {
        dispatch({ type: "ORDER_PAY_REQUEST" })

        const { data } = await axios.put(`/api/order/${id}/pay`, paymentResult)

        dispatch({ type: "ORDER_PAY_SUCCESS", payload: data })

    } catch (error) {
        dispatch({
            type: "ORDER_PAY_FAILD",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const getUserOrders = () => async (dispatch) => {
    try {
        dispatch({ type: 'ORDER_USER_REQUEST' })

        const { data } = await axios.get(`/api/order/myorder`)

        dispatch({ type: 'ORDER_USER_SUCCESS', payload: data })
    } catch (error) {
        dispatch({
            type: "ORDER_USER_FAILD",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }

}

export const listOrder = () => async (dispatch) => {
    try {
        dispatch({ type: 'ORDER_LIST_REQUEST' })
        const { data } = await axios.get('/api/admin/orders')
        dispatch({ type: 'ORDER_LIST_SUCCESS', payload: data })
    } catch (error) {
        dispatch({
            type: "ORDER_LIST_FAILD",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }

}

export const deliverOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'ORDER_DELIVER_REQUEST' })
        await axios.put(`/api/admin/orders/${id}/deliver`)
        dispatch({ type: 'ORDER_DELIVER_SUCCESS' })
    } catch (error) {
        dispatch({
            type: "ORDER_DELIVER_FAILD",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}
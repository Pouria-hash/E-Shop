import axios from 'axios'

export const listProduct = (keyword = "", pageNum = '') => async (dispatch) => {
    try {
        dispatch({ type: "PRODUCT_LIST_REQUEST" })

        const { data } = await axios.get(`/api/products?keyword=${keyword}&pagenum=${pageNum}`)

        dispatch({
            type: "PRODUCT_LIST_SUCCESS",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "PRODUCT_LIST_FAILED",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })

    }
}

export const detailProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: "PRODUCT_DETAIL_REQUEST" })

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: "PRODUCT_DETAIL_SUCCESS",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "PRODUCT_DETAIL_FAILED",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: "PRODUCT_DELETE_REQUEST" })

        await axios.delete(`/api/admin/products/${id}`)

        dispatch({ type: "PRODUCT_DELETE_SUCCESS" })
    } catch (error) {
        dispatch({
            type: "PRODUCT_DELETE_FAILD",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const addProduct = (product) => async (dispatch) => {
    try {
        dispatch({ type: "PRODUCT_ADD_REQUEST" })

        const { data } = await axios.post('/api/admin/products', product)

        dispatch({ type: "PRODUCT_ADD_SUCCESS" })


    } catch (error) {
        dispatch({
            type: "PRODUCT_ADD_FAILD",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const editProduct = (id, product) => async (dispatch) => {
    try {
        dispatch({ type: "PRODUCT_EDIT_REQUEST" })
        await axios.put(`/api/admin/products/${id}/edit`, product)
        dispatch({ type: "PRODUCT_EDIT_SUCCESS" })

    } catch (error) {
        dispatch({
            type: "PRODUCT_ADD_FAILD",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const createReview = (productId, review) => async (dispatch) => {
    try {
        dispatch({ type: "PRODUCT_CREATE_REVIEW_REQUEST" })

        await axios.post(`/api/products/${productId}/reviews`, review)
        dispatch({ type: "PRODUCT_CREATE_REVIEW_SUCCESS" })

    } catch (error) {
        dispatch({
            type: "PRODUCT_ADD_FAILD",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const topRateProduct = () => async (dispatch) => {
    try {
        dispatch({ type: "PRODUCT_TOP_REQUEST" })

        const { data } = await axios.get('/api/products/top')
        dispatch({ type: "PRODUCT_TOP_SUCCESS", payload: data })
    } catch (error) {
        dispatch({
            type: "PRODUCT_TOP_FAILD",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}
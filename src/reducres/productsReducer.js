export const ProductsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case "PRODUCT_LIST_REQUEST":
            return { loading: true, products: [] }
        case "PRODUCT_LIST_SUCCESS":
            return { loading: false, products: action.payload.products, pages: action.payload.page, pages: action.payload.pages }
        case "PRODUCT_LIST_FAILED":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const ProductDetailReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case "PRODUCT_DETAIL_REQUEST":
            return { loading: true, ...state }
        case "PRODUCT_DETAIL_SUCCESS":
            return { loading: false, product: action.payload }
        case "PRODUCT_DETAIL_FAILED":
            return { loading: false, error: action.payload }
        case "PRODUCT_DETAIL_RESET":
            return { product: { reviews: [] } }
        default:
            return state
    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case "PRODUCT_DELETE_REQUEST":
            return { loading: true }
        case "PRODUCT_DELETE_SUCCESS":
            return { loading: false, success: true }
        case "PRODUCT_DELETE_FAILD":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productAddReducer = (state = {}, action) => {
    switch (action.type) {
        case "PRODUCT_ADD_REQUEST":
            return { loading: true }
        case "PRODUCT_ADD_SUCCESS":
            return { loading: false, success: true }
        case "PRODUCT_ADD_FAILD":
            return { loading: false, error: action.payload }
        case "PRODUCT_ADD_RESET":
            return {}
        default:
            return state
    }
}

export const productEditReducer = (state = { product: { review: [] } }, action) => {
    switch (action.type) {
        case "PRODUCT_EDIT_REQUEST":
            return { loading: true }
        case "PRODUCT_EDIT_SUCCESS":
            return { loading: false, success: true, product: action.payload }
        case "PRODUCT_EDIT_FAILD":
            return { loading: false, error: action.payload }
        case "PRODUCT_EDIT_RESET":
            return { product: { review: [] } }
        default:
            return state
    }
}



export const productCreateReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case "PRODUCT_CREATE_REVIEW_REQUEST":
            return { loading: true }
        case "PRODUCT_CREATE_REVIEW_SUCCESS":
            return { loading: false, success: true }
        case "PRODUCT_CREATE_REVIEW_FAILD":
            return { loading: false, error: action.payload }
        case "PRODUCT_CREATE_REVIEW_RESET":
            return {}
        default:
            return state
    }
}

export const productTopRateReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case "PRODUCT_TOP_REQUEST":
            return { loading: true }
        case "PRODUCT_TOP_SUCCESS":
            return { loading: false, products: action.payload }
        case "PRODUCT_TOP_FAILD":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
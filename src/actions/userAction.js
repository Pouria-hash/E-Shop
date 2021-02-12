import axios from 'axios'



export const userLogin = (username, password) => async (dispatch) => {
    try {
        dispatch({ type: 'USER_LOGIN_REQUEST' })

        const { data } = await axios.post(
            "/api/user/login",
            { username, password }
        )

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: "USER_LOGIN_FAILD",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })


    }

}
export const userLogout = () => async (dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch({ type: "USER_LOGOUT" })
    dispatch({ type: "USER_DETAIL_RESET" })
    dispatch({ type: "ORDER_USER_RESET" })
    dispatch({ type: "USER_LIST_RESET" })
    dispatch({ type: "USER_REGISTER_RESET" })
    await axios.post('/api/user/logout')
}

export const userRegister = (username, password, email) => async (dispatch) => {
    try {
        dispatch({ type: "USER_REGISTER_REQUEST" })
        const { data } = await axios.post("/api/user/register", { username, password, email })

        dispatch({ type: "USER_REGISTER_SUCCESS", payload: data })

        dispatch({ type: "USER_LOGIN_SUCCESS", payload: data })


        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: "USER_LOGIN_FAILD",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const getUserDetails = (user) => async (dispatch) => {
    try {
        dispatch({ type: "USER_DETAIL_REQUEST" })

        const { data } = await axios.get('/api/user/profile')

        dispatch({ type: "USER_DETAIL_SUCCESS", payload: data })
    } catch (error) {
        dispatch({
            type: "USER_DETAIL_FAILD",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }

}

export const updateProfile = (user) => async (dispatch) => {
    try {
        dispatch({ type: "USER_UPDATE_PROFILE_REQUEST" })


        const { data } = await axios.put('/api/user/profile', user)

        dispatch({ type: "USER_UPDATE_PROFILE_SUCCESS", payload: data })

        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: "USER_UPDATE_PROFILE_FAILD",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const getUserList = () => async (dispatch) => {
    try {
        dispatch({ type: "USER_LIST_REQUEST" })

        const { data } = await axios.get('/api/users')

        dispatch({ type: "USER_LIST_SUCCESS", payload: data })
    } catch (err) {
        dispatch({
            type: "USER_LIST_FAILD",
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
}

export const userDeleteAction = (userId) => async (dispatch) => {
    try {
        dispatch({ type: "USER_DELETE_REQUEST" })

        const { data } = await axios.delete(`/api/users/${userId}`)

        dispatch({ type: "USER_DELETE_SUCCESS", payload: data })
    } catch (err) {
        dispatch({
            type: "USER_DELETE_FAILD",
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }

}


export const getAdminUserDetails = (userId) => async (dispatch) => {
    try {
        dispatch({ type: "USER_ADMIN_DETAILS_REQUEST" })

        const { data } = await axios.get(`/admin/user/${userId}`)

        dispatch({ type: "USER_ADMIN_DETAILS_SUCCESS", payload: data })
    } catch (err) {
        dispatch({
            type: "USER_ADMIN_DETAILS_FAILD",
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
}


export const adminUserUpdate = (userId, userData) => async (dispatch) => {
    try {
        dispatch({ type: "USER_ADMIN_UPDATE_REQUEST" })

        const { data } = await axios.put(`/admin/user/${userId}`, userData)

        dispatch({ type: "USER_ADMIN_UPDATE_SUCCESS" })

        dispatch({ type: "USER_ADMIN_DETAILS_SUCCESS", payload: data })
    } catch (err) {
        dispatch({
            type: "USER_ADMIN_UPDATE_FAILD",
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
}
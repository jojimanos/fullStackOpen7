const initialState = { message: '', classname: '' }

export const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SUCCESS':
            return action.payload
        case 'FAILURE':
            return action.payload
        default:
            return state
    }
}

export const success = ({ message, className }) => {
    return {
        type: "SUCCESS",
        payload: { message, className }
    }
}

export const failure = ({ message, className }) => {
    return {
        type: "FAILURE",
        payload: { message, className }
    }
}
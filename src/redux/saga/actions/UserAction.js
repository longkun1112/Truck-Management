import * as types from '../Types/UserType'

export const addUserAction = (data) => {
    return {
        type: types.ADD_USER,
        data
    }
}

export const UserAddedAction = (user) => {
    return {
        type: types.USER_ADDED,
        payload: user
    }
}

export const editUserAction = (data) => {
    return {
        type: types.EDIT_USERS,
        payload: data
    }
}

export const UserEditedAction = (user) => {
    return {
        type: types.USERS_EDITED,
        payload: user
    }
}

export const deleteUserAction = (id) => {
    return {
        type: types.DELETE_USER,
        id
    }
}

export const UserDeletedAction = (id) => {
    return {
        type: types.USER_DELETED,
        id
    }
}
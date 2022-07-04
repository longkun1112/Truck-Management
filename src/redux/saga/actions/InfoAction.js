import * as types from '../Types/InfoType'

export const addInfoAction = (data) => {
    return {
        type: types.ADD_INFO,
        data
    }
}

export const InfoAddedAction = (info) => {
    return {
        type: types.INFO_ADDED,
        info
    }
}

// export const editTaskAction = (id, data) => {
//     return {
//         type: types.EDIT_TASKS,
//         payload: {id, data}
//     }
// }

// export const taskEditedAction = (task) => {
//     return {
//         type: types.TASKS_EDITED,
//         payload: task
//     }
// }

export const deleteInfoAction = (id) => {
    return {
        type: types.DELETE_INFO,
        id
    }
}

export const InfoDeletedAction = (id) => {
    return {
        type: types.INFO_DELETED,
        id
    }
}
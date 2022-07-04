import * as types from '../Types/CargoType'

export const addTaskAction = (data) => {
    return {
        type: types.ADD_TASK,
        data
    }
}

export const taskAddedAction = (task) => {
    return {
        type: types.TASK_ADDED,
        task
    }
}

export const editTaskAction = (id, data) => {
    return {
        type: types.EDIT_TASKS,
        payload: {id, data}
    }
}

export const taskEditedAction = (task) => {
    return {
        type: types.TASKS_EDITED,
        payload: task
    }
}

export const deleteTaskAction = (id) => {
    return {
        type: types.DELETE_TASK,
        id
    }
}

export const taskDeletedAction = (id) => {
    return {
        type: types.TASK_DELETED,
        id
    }
}
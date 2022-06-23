const initialState = [
    // { id: 0, name: "Mirana", email: "email1@email.com", phone: 1234567890, role: 'Admin', dob: '1/1/1995', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkIdpg477dCMhtl-rmZLVD-wyyY5qIbojV1A&usqp=CAU' },
    // { id: 1, name: "Kunkka", email: "test@test.com", phone: 4567891230, role: 'Operator', dob: '1/1/1995', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkIdpg477dCMhtl-rmZLVD-wyyY5qIbojV1A&usqp=CAU' },
    { id: 2, name: "Invoker", email: "email@email.com", phone: 1234567890, role: 'Driver', dob: '1/1/1995', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpvzlxbkpphuv_STYw3FE0nLzDLa5o0oxNXA&usqp=CAU' },
    { id: 4, name: "Lisa", email: "lisa@genshin.com", phone: 1234567890, role: 'Admin', dob: 'Jun 09 ', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkIdpg477dCMhtl-rmZLVD-wyyY5qIbojV1A&usqp=CAU' },
    { id: 5, name: "Jean", email: "jean@genshin.com", phone: 1234567890, role: 'Admin', dob: ' March 14 ', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlGVx4l57xdvXB9OxEMSl15ZxDFjfv_A_SVg&usqp=CAU'}
];

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_USER":
            state = [...state, action.payload];
            return state;
        case "DELETE_USER":
            const UserFilter = state.filter((user) =>
            user.id === action.payload ? null : user
            );
            state = UserFilter;
            return state;
        case "UPDATE_USER":
            const userUpdate = state.filter((user) =>
            user.id === action.payload.id
                ? Object.assign(user, action.payload)
                : user
            );
            state = userUpdate;
            return state;
        case "RESET_USER":
            state = [{ name: null, email: null, phone: null }];
            return state;
        default:
            return state;
    }
};
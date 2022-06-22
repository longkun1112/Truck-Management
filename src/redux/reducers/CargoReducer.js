const initialState = [
    { id: 0, cargoType: "Computer, Electronics", },
    { id: 1, cargoType: "Vegetables", },
    { id: 2, cargoType: "Kid toys, Compute", },
];

export const CargoReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_CARGO":
        state = [...state, action.payload];
        return state;
      case "DELETE_CARGO":
        const cargoFilter = state.filter((cargo) =>
          cargo.id === action.payload ? null : cargo
        );
        state = cargoFilter;
        return state;
      case "UPDATE_CARGO":
        const cargoUpdate = state.filter((cargo) =>
          cargo.id === action.payload.id
            ? Object.assign(cargo, action.payload)
            : cargo
        );
        state = cargoUpdate;
        return state;
      case "RESET_CARGO":
        state = [{ name: null, cargoType: null, }];
        return state;
      default:
        return state;
    }
  };

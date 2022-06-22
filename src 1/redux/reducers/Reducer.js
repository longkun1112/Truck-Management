  const initialState = [
    { id: 0, name: "Raman Sharma", email: "email@email.com", phone: 1234567890, truckPlate: "30A-50493", cargoType: "Computer, Electronics", driver: "Nguyễn Văn A", truckType: '5 tons', price: '1000000000', dimension: '10-2-1.5', parkingAddress: 'No.128 Hoàn Kiếm, HN', productionYear: '2010', status: 'In-used' },
    { id: 1, name: "Test Name", email: "test@test.com", phone: 4567891230, truckPlate: "30A-12345", cargoType: "Vegetables", driver: "Nguyễn Văn B", truckType: '10 tons', price: '1500000000', dimension: '9.8-1.8-1.8', parkingAddress: 'No.128 Hoàn Kiếm, HN', productionYear: '2011', status: 'New' },
    { id: 2, truckPlate: "30A-50493", cargoType: "Kid toys, Compute", driver: "Nguyễn Văn C", truckType: '20 tons', price: '2000000000', dimension: '10-2-2', parkingAddress: 'No.128 Hoàn Kiếm, HN', productionYear: '2012', status: 'Suspended'},
  ];
  
  const initialState1 = [
    { id: 0, truckPlate: "30A-50493", cargoType: "Computer, Electronics", drive: "Nguyễn Văn A", truckType: '5 tons', price: '1000000000', dimension: '10-2-1.5', parkingAddress: 'No.128 Hoàn Kiếm, HN', productionYear: '2010', status: 'In-used'},
    { id: 1, truckPlate: "30A-12345", cargoType: "Vegetables", drive: "Nguyễn Văn B", truckType: '10 tons', price: '1500000000', dimension: '9.8-1.8-1.8', parkingAddress: 'No.128 Hoàn Kiếm, HN', productionYear: '2011', status: 'New'},
    { id: 2, truckPlate: "30A-50493", cargoType: "Kid toys, Compute", drive: "Nguyễn Văn C", truckType: '20 tons', price: '2000000000', dimension: '10-2-2', parkingAddress: 'No.128 Hoàn Kiếm, HN', productionYear: '2012', status: 'Suspended'},
  ];
  
  export const Reducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_CONTACT":
        state = [...state, action.payload];
        return state;
      case "DELETE_CONTACT":
        const contactFilter = state.filter((contact) =>
          contact.id === action.payload ? null : contact
        );
        state = contactFilter;
        return state;
      case "UPDATE_CONTACT":
        const contactUpdate = state.filter((contact) =>
          contact.id === action.payload.id
            ? Object.assign(contact, action.payload)
            : contact
        );
        state = contactUpdate;
        return state;
      case "RESET_CONTACT":
        state = [{ name: null, email: null, phone: null }];
        return state;
      default:
        return state;
    }
  };
  
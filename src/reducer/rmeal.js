export default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_FAVORITE':
            return [...state, action.payload];
        case 'REMOVE_FAVORITE':
            return state.filter(getId => getId.idMeal !== action.payload);
        default:
            return state;
    }
};

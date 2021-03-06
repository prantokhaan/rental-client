const initialData = {
    trucks: []
}

export const truckReducer = (state=initialData, action)=>{
    switch (action.type) {
      case "GET_ALL_TRUCKS": {
        return {
          ...state,
          trucks: action.payload,
        };
      }

      default:
        return state;
    }
}
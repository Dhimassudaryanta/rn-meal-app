import { Alert } from 'react-native';

export const saveFood = (keyword) => async dispatch => {


    dispatch({ type: 'FETCH_FAVORITE', payload: keyword });




};


export const removeFood = (data, callback) => async dispatch => {

    console.log(data);
    const deleteHandler = () => {
        dispatch({ type: "REMOVE_FAVORITE", payload: data })
        if (callback) {
            callback();
        }
    };

    Alert.alert(
        'Delete',
        'Do you want to delete this item?',
        [{ text: 'Okay', style: 'destructive', onPress: deleteHandler }
            ,
        { text: 'Nope', style: 'destructive', onPress: null }
        ]);

}
import AsyncStorage from '@react-native-async-storage/async-storage'
import createDataContext from "./createDataContext";
import trackerApi from '../api/tracker'
import { navigate } from '../RootNavigation'
 
const authReducer = (state, action) => {
    switch(action.type) {
        case 'set_loading':
            return { ...state, loading: action.payload };
        case 'signin':
            return { loading: false, token: action.payload, errorMessage: '' }
        case 'signout':
            return { loading: false, token: null, errorMessage: '' }
        case 'add_error':
            return { ...state, errorMessage: action.payload }
        case 'clear_error':
            return { ...state, errorMessage: '' }
        default:
            return state
    }
}

const tryLocalSignin = dispatch => async () => {
    dispatch({ type: 'set_loading', payload: true })
    const token = await AsyncStorage.getItem('token')
    if(token) {
        dispatch({
            type: 'signin',
            payload: token
        })
        navigate('TrackList')
    } else {
        dispatch({ type: 'set_loading', payload: false })
        navigate('SignUp')
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({
        type: 'clear_error'
    })
}

const signup = dispatch => async ({ email, password }) => {
    try {
        const response = await trackerApi.post('/signup', { email, password })
        await AsyncStorage.setItem('token', response.data.token)
        dispatch({ 
            type: 'signin', 
            payload: response.data.token 
        })

        navigate('TrackList')
    } catch(err) {
        dispatch({ 
            type: 'add_error', 
            payload: 'Unable to create account. Please try again.' 
        })
    }
}

const signin = (dispatch) => async ({ email, password }) => {
    try {
        const response = await trackerApi.post('/signin', { email, password })
        await AsyncStorage.setItem('token', response.data.token)
        dispatch({
            type: 'signin',
            payload: response.data.token
        })

        navigate('TrackList')
    } catch(err) {
        dispatch({ 
            type: 'add_error', 
            payload: 'Unable to sign in. Please try again.' 
        })
    }
}

const signout = (dispatch) => async () => {
    await AsyncStorage.removeItem('token')
    dispatch({ type: 'signout' })
}

export const { Context, Provider } = createDataContext(
    authReducer, 
    { signup, signin, signout, clearErrorMessage, tryLocalSignin }, 
    { loading: true, token: null, errorMessage: '' }
)
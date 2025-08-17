import React, { useContext, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Context as AuthContext } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'

const SignInScreen = ({ navigation }) => {

    const { state, signin, clearErrorMessage } = useContext(AuthContext)

    useEffect(() => {
        navigation.addListener("focus", clearErrorMessage);
    }, [])

    return <View style={styles.container}>
        <AuthForm 
            headerText='Sign In'
            errorMessage={state.errorMessage}
            onSubmit={({ email, password }) => signin({ email, password })}
            submitButtonText='Sign In'
        />
        <NavLink
            text="New user? Sign up here!"
            routeName="SignUp"
        />
    </View> 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200
    }
})

export default SignInScreen
import React, { useContext, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Context as AuthContext } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'

const SignUpScreen = ({ navigation }) => {

    const { state, signup, clearErrorMessage } = useContext(AuthContext)

    useEffect(() => {
        navigation.addListener("focus", clearErrorMessage);
    }, [])

    return <View style={styles.container}>
        <AuthForm 
            headerText='Sign Up'
            errorMessage={state.errorMessage}
            onSubmit={({ email, password }) => signup({ email, password })}
            submitButtonText='Sign Up'
        />
        <NavLink
            text="Already have an account? Sign in instead!"
            routeName="SignIn"
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

export default SignUpScreen
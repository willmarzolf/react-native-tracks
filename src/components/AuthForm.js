import React, { useState } from "react";
import { StyleSheet } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'
import Spacer from "./Spacer";

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return <>
        <Spacer>
            <Text h3 style={styles.title}>{headerText}</Text>
        </Spacer>
        <Input 
            label="Email" 
            value={email}
            onChangeText={setEmail}
            autoCapitalize='none'
            autoCorrect={false}
        />
        <Spacer />
        <Input 
            secureTextEntry
            label="Password" 
            value={password}
            onChangeText={setPassword}
            autoCapitalize='none'
            autoCorrect={false}
        />
        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        <Spacer>
            <Button 
                title={submitButtonText} 
                onPress={() => onSubmit({ email, password })}
            />
        </Spacer>
    </>
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center'
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginHorizontal: 15,
        textAlign: 'center'
    },
})

export default AuthForm
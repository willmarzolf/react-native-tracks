// import '../_mockLocation'
import React, { useContext, useEffect, useState, useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import Map from '../components/Map'
import { Context as LocationContext } from '../context/LocationContext'
import useLocation from '../hooks/useLocation'
import TrackForm from '../components/TrackForm'

const TrackCreateScreen = ({ navigation }) => {
    const { state: { recording }, addLocation } = useContext(LocationContext)
    const [isFocused, setIsFocused] = useState(false) 
    const callback = useCallback((location) => {
        addLocation(location, recording)
    }, [recording])
    const [err] = useLocation(isFocused || recording, callback)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setIsFocused(true)
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setIsFocused(false)
        });
        return unsubscribe;
    }, [navigation]);

    return <SafeAreaView>
        <Text h3 style={styles.title}>Create a Track</Text>
        <Map />
        {err ? <Text>Please enable location services</Text> : null}
        <TrackForm />
    </SafeAreaView>
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        marginVertical: 15
    }
})

export default TrackCreateScreen
import React from 'react'
import { Text, StyleSheet, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const TrackListScreen = ({ navigation }) => {
    return <SafeAreaView>
        <Text style={{ fontSize: 48 }}>Track List Screen</Text>
        <Button 
            title="Go To Track Detail"
            onPress={() => navigation.navigate('TrackDetail')}
        />
    </SafeAreaView>
}

const styles = StyleSheet.create({})

export default TrackListScreen
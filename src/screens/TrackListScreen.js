import React, { useEffect, useContext } from 'react'
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Text, ListItem } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Context as TrackContext } from '../context/TrackContext'

const TrackListScreen = ({ navigation }) => {

    const { state, fetchTracks } = useContext(TrackContext)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', fetchTracks);
        return unsubscribe;
    }, [navigation]);

    return <SafeAreaView>
        <Text h3 style={styles.title}>Tracks</Text>
        { state.length > 0 &&
            <FlatList 
                data={state}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                    return <TouchableOpacity onPress={() => {
                        navigation.navigate('TrackDetail', { _id: item._id })
                    }}>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>{item.name}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    </TouchableOpacity>
                }}
            />
        }

    </SafeAreaView>
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        marginVertical: 15
    }
})

export default TrackListScreen
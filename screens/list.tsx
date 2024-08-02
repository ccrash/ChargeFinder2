import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { Text, TextInput, Button, View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, SafeAreaView, Platform } from 'react-native'
import * as Location from 'expo-location'

import { fetchChargers } from '../helpers/api'
import { Charger } from '../def/charger'

import ListItem from '../components/listItem'

interface _props {
  navigation: any
}

const ListScreen = ({ navigation } : _props) => {
  const [chargers, setChargers] = useState<Charger[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [region, setRegion] = useState<any>({
    latitude: 0.0,
    longitude: 0.0,
    latitudeDelta: 0.04,
    longitudeDelta: 0.04,
  })

  const [filteredData, setFilteredData] = useState<Charger[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filterBy, setFilterBy] = useState<'valid' | 'distance'>('valid');

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied')
          setLoading(false)
          return
        }

        let location = await Location.getCurrentPositionAsync({})
        setLocation(location)
        setRegion({
          ...region,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
        let chargers = await fetchChargers(location.coords.latitude, location.coords.longitude)
        setChargers(chargers)
      } catch (error) {
        setErrorMsg('Failed to fetch location')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  useEffect(() => {
    if (search === '') {
        setFilteredData(chargers);
    } else {
        const filtered = chargers.filter(item => {
            if (filterBy === 'valid') {
                return item.AddressInfo.Title.toLowerCase().includes(search.toLowerCase());
            } else if (filterBy === 'distance') {
                return item.AddressInfo.Distance.toString().includes(search);
            }
            return false;
        });
        setFilteredData(filtered);
    }
  }, [search, filterBy, chargers]);


  const renderHeader = () => (
    <View style={styles.header}>
        <TextInput
            style={styles.input}
            placeholder={`Search by ${filterBy}`}
            value={search}
            onChangeText={text => setSearch(text)}
        />
        <View style={styles.buttonContainer}>
            <Button
                title="Filter by Name"
                onPress={() => setFilterBy('valid')}
                color={filterBy === 'valid' ? 'blue' : 'gray'}
            />
            <Button
                title="Filter by Distance"
                onPress={() => setFilterBy('distance')}
                color={filterBy === 'distance' ? 'blue' : 'gray'}
            />
        </View>
    </View>
  )

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    )
  }

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      { renderHeader() }
      <FlatList
        data={chargers}
        renderItem={({item}) => <ListItem item={item} onPress={() => navigation.navigate('Details', { charger : item })}/>}
        keyExtractor={(item) => item.ID.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  )
}

export default ListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 16,
    marginTop: Platform.select({
      ios: 16,
      android: 32,
    })
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    paddingHorizontal: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  }
})

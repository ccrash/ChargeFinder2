import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Modal, ActivityIndicator, Alert, TouchableOpacity, FlatList, Dimensions, StyleSheet  } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'

import { fetchChargers } from '../helpers/api'
import { Charger } from '../def/charger'
import { User } from '../def/user'

import MapMarkerDetails from '../components/mapMarkerDetails'
import ListItem from '../components/listItem'

interface _props {
  navigation : any,
  route: any
}

export const MapScreen: React.FC<_props> = ({ navigation, route }) => {

  const { user } : { user: User } = route.params

  const [chargers, setChargers] = useState<Charger[]>([])
  const [selectedCharger, setSelectedCharger] = useState<Charger | null>(null)
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [region, setRegion] = useState<any>({
    latitude: 0.0,
    longitude: 0.0,
    latitudeDelta: 0.04,
    longitudeDelta: 0.04,
  })

  const sheetRef = useRef<BottomSheet>(null)

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
        console.error(error)
        setErrorMsg('Failed to fetch location')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const handleMarkerPress = (charger: Charger) => {
    setSelectedCharger(charger)
    setModalVisible(true)
  }

  const refreshChargers = async () => {
    try {
      const chargers = await fetchChargers(region.latitude, region.longitude)
      setChargers(chargers)
    } catch (error) {
      Alert.alert('Error', 'Failed to refresh chargers')
    } 
  }

  const onDetailsSelect = (charger: Charger) => {
    setModalVisible(false)
    navigation.navigate('Details', { charger, user })
  }

  const onDetailsClose = () => {
    setModalVisible(false)
  }

  const renderYourMarker = () => {
    if(location) {
      return (
          <Marker key={'you'}
              coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude, }}
              title={"Your position"}
              pinColor={'green'}
          />
      )
    }
    return null
  }

  const renderMarkers = () => {
    return chargers.map((charger) => (
      <Marker
        key={charger.ID}
        coordinate={{
          latitude: charger.AddressInfo.Latitude,
          longitude: charger.AddressInfo.Longitude,
        }}
        title={charger.AddressInfo.Title}
        onPress={() => handleMarkerPress(charger)}
      />
    ))
  }

  const renderMarkerDetails = () => (
    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
      <MapMarkerDetails charger={selectedCharger} onContinue={onDetailsSelect} onClose={onDetailsClose} />
    </Modal>
  )

  const renderList = () => (
    <View style={styles.bottomSheet}>
      <FlatList
        data={chargers}
        renderItem={({item}) => <ListItem item={item} onPress={() => navigation.navigate('Details', { charger : item, user })}/>}
        keyExtractor={(item) => item.ID.toString()}
        contentContainerStyle={styles.listContainer}
      />
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
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={setRegion}
        >
            { renderYourMarker() }
            { renderMarkers() }
        </MapView>
      )}
      {selectedCharger && renderMarkerDetails()}
      <TouchableOpacity style={styles.refreshButton} onPress={refreshChargers}>
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[200, '50%', '100%']}
      >
        <BottomSheetView style={styles.contentContainer}>
          { renderList() }
        </BottomSheetView>
      </BottomSheet>  
    </View>
  )
}

export default MapScreen

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 50,
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    refreshButton: {
      backgroundColor: 'black',
      width: 'auto',
      borderRadius: 10,
      padding: 20,
      position: 'absolute',
      top: 30,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    refreshButtonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
      textTransform: 'uppercase'
    },
    bottomSheet: {
      backgroundColor: 'white',
      padding: 16,
      height: '100%',
    },
    listItem: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
    listContainer: {
      paddingHorizontal: 16,
    },
  })
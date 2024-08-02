import React, { useState, useEffect } from 'react'
import { View, Text, Modal, ActivityIndicator, Alert, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'

import { fetchChargers } from '../helpers/api'
import { Charger } from '../def/charger'

import MapMarkerDetails from '../components/mapMarkerDetails'

import { StyleSheet, Dimensions } from 'react-native'

export const MapScreen = ({ navigation }: { navigation: any }) => {
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
    navigation.navigate('Details', { charger })
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
      <TouchableOpacity style={styles.mapButton} onPress={refreshChargers}>
        <Text style={styles.mapButtonText}>Refresh</Text>
      </TouchableOpacity>
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
    mapButton: {
      backgroundColor: 'black',
      width: 'auto',
      borderRadius: 20,
      padding: 20,
      position: 'absolute',
      bottom: 50,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    mapButtonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16
    },
  })
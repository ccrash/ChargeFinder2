import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ActivityIndicator, Alert, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'

import { fetchChargers } from '../helpers/api'
import { Charger } from '../def/charger'
import { User } from '../def/user'

import MapMarkerDetails from '../components/mapMarkerDetails'
import ChargersList from '../components/chargersList'

interface _props {
  navigation: any,
  route: any
}

export const MapScreen: React.FC<_props> = ({ navigation, route }) => {

  const { user }: { user: User } = route.params

  const [chargers, setChargers] = useState<Charger[]>([])
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
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
        const items = await fetchChargers(location.coords.latitude, location.coords.longitude)
        setChargers(items)
      } catch (error) {
        setErrorMsg('Failed to fetch location')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const mapRef = useRef<MapView>(null)
  const sheetRef = useRef<BottomSheet>(null)
  const markerRef = useRef<any>([])

  const refreshChargers = async () => {
    try {
      const items = await fetchChargers(region.latitude, region.longitude)
      setChargers(items)
    } catch (error) {
      Alert.alert('Error', 'Failed to refresh chargers')
    }
  }

  const selectMarker = (charger: Charger) => {
    markerRef.current[charger.ID].showCallout()
    mapRef.current.animateToRegion({
      latitude: charger.AddressInfo.Latitude,
      longitude: charger.AddressInfo.Longitude,
      latitudeDelta: 0.04,
      longitudeDelta: 0.04
    }, 1000);
  }

  let _bottomSheetSnap = 0
  const handleSheetChanges = (index: number) => {
    _bottomSheetSnap = index
  }

  const handleOnListPress = (charger: Charger) => {
    if (_bottomSheetSnap == 2) {
      navigation.navigate('Details', { charger, user })
    }
    else {
      selectMarker(charger)
    }
  }

  const onChargerSelect = (charger: Charger) => {
    navigation.navigate('Details', { charger, user })
  }

  const renderYourMarker = () => {
    if (location) {
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
        ref={element => markerRef.current[charger.ID] = element}
        key={charger.ID}
        coordinate={{
          latitude: charger.AddressInfo.Latitude,
          longitude: charger.AddressInfo.Longitude,
        }}
        title={charger.AddressInfo.Title}
      >
        <MapMarkerDetails charger={charger} onContinue={onChargerSelect} />
      </Marker>
    ))
  }

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
          ref={mapRef}
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={setRegion}
        >
          {renderYourMarker()}
          {chargers && renderMarkers()}
        </MapView>
      )}
      <TouchableOpacity style={styles.refreshButton} onPress={refreshChargers}>
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[200, '50%', '100%']}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.bottomSheet}>
            <ChargersList chargers={chargers} onPress={handleOnListPress} />
          </View>
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
  }
})
import 'react-native-gesture-handler'
import React, { useState, useCallback } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import { startChargingSession, stopChargingSession } from '../helpers/api'
import { formatDistance } from '../helpers/utils'
import { Charger } from '../def/charger'
import { User } from '../def/user'

interface _props {
  navigation: any,
  route: any
}

export const DetailsScreen: React.FC<_props> = ({ navigation, route }) => {

  const { charger, user }: { charger: Charger, user: User } = route.params
  const [charging, setCharging] = useState(false)

  useFocusEffect(
    useCallback(() => {
      const backHandler = navigation.addListener('beforeRemove', (e) => {
        if (charging) {
          e.preventDefault()
          Alert.alert(
            'Cannot go back',
            'Please stop charging your car before navigating back.',
            [{ text: 'OK' }]
          )
        }
      })

      return () => {
        backHandler();
      }
    }, [charging, navigation])
  )

  const handleStartStopCharging = () => {
    if (!charging) {
      startChargingSession(user.name, user.carId, charger.ID).then(() => {
        setCharging(true)
      })
    } else {
      stopChargingSession(user.name, user.carId, charger.ID).then(() => {
        setCharging(false)
      })
    }
  }

  const renderChargeButton = () => (
    <TouchableOpacity style={[styles.buttonCharge, styles.button]} onPress={handleStartStopCharging}>
      <Text style={styles.buttonChargeText}>Start Charging</Text>
    </TouchableOpacity>
  )

  const renderStopButton = () => (
    <TouchableOpacity style={[styles.buttonStop, styles.button]} onPress={handleStartStopCharging}>
      <Text style={styles.buttonStopText}>Stop Charging</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      {charger.AddressInfo.Title && <Text style={styles.title}>{charger.AddressInfo.Title}</Text>}
      <View style={styles.details}>
        {charger.AddressInfo.AddressLine1 && <Text style={styles.address}>{charger.AddressInfo.AddressLine1}</Text>}
        {charger.AddressInfo.Town && <Text>{charger.AddressInfo.Town}</Text>}
        {charger.AddressInfo.StateOrProvince && <Text>{charger.AddressInfo.StateOrProvince}</Text>}
        <View style={styles.subDetails}>
          {charger.AddressInfo.Postcode && <Text style={styles.postcode}>{charger.AddressInfo.Postcode}</Text>}
          {charger.AddressInfo.Distance && <Text style={styles.distance}>{formatDistance(charger.AddressInfo.Distance)}</Text>}
        </View>
      </View>
      {charging ? renderStopButton() : renderChargeButton()}
    </View>
  )
}

export default DetailsScreen

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '80%'
  },
  address: {
    color: 'grey',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postcode: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  distance: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'right',
  },
  button: {
    marginTop: 50,
    borderRadius: 10,
    padding: 20,
  },
  buttonCharge: {
    backgroundColor: 'black',
  },
  buttonChargeText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase'
  },
  buttonStop: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1
  },
  buttonStopText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase'
  },
  bold: {
    color: 'black',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 80
  },
  normal: {
    color: 'black',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 20
  },
  close: {
    alignContent: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    textAlign: 'right',
    marginBottom: 10
  },
  x: {
    color: 'black',
    fontSize: 20
  },
})
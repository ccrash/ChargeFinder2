import 'react-native-gesture-handler'
import React, { FC, useState, useCallback } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import { Charger } from '../def/charger'

interface _props {
  navigation : any,
  route: any
}

export const DetailsScreen: FC<_props> = ({navigation, route}: _props) => {
  
  const { charger } : { charger: Charger }= route.params
  const [charging, setCharging] = useState(false)

  useFocusEffect(
    useCallback(() => {
        const backHandler = navigation.addListener('beforeRemove', (e) => {
            if (charging) {
                e.preventDefault()
                Alert.alert(
                    'Cannot go back',
                    'Please stop charging your car first to navigate back.',
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
      setCharging(true)
    } else {
      setCharging(false)
    }
  }

  const renderChargeButton = () => (
      <TouchableOpacity style={styles.buttonCharge} onPress={handleStartStopCharging}>
        <Text style={styles.buttonChargeText}>Start Charging</Text>
      </TouchableOpacity>
  )

  const renderStopButton = () => (
      <TouchableOpacity style={styles.buttonStop} onPress={handleStartStopCharging}>
        <Text style={styles.buttonStopText}>Stop Charging</Text>
      </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View>
        { charger.AddressInfo.Title && <Text style={styles.title}>{charger.AddressInfo.Title}</Text> }
        { charger.AddressInfo.AddressLine1 && <Text>{charger.AddressInfo.AddressLine1}</Text> }
        { charger.AddressInfo.Town && <Text>{charger.AddressInfo.Town}</Text> }
        { charger.AddressInfo.StateOrProvince && <Text>{charger.AddressInfo.StateOrProvince}</Text> }
        { charger.AddressInfo.Postcode && <Text>{charger.AddressInfo.Postcode}</Text> }
        { charging ? renderStopButton() : renderChargeButton() }
      </View>
    </View>
  )
}

export default DetailsScreen

export const styles = StyleSheet.create({

  expenseContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyHome: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',

    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    openMapButton: {
      backgroundColor: 'black',
      width: 'auto',
      borderRadius: 20,
      padding: 20,
      position: 'absolute',
      bottom: 50,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    openMapButtonText: {
      color: 'white',
      textAlign: 'center',
    },
    buttonCharge: {
      backgroundColor: 'black',
      borderRadius: 5,
      padding: 20,

    },
    buttonChargeText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16
    },
    buttonStop: {
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 20,
      borderColor: 'black',
      borderWidth: 1
    },
    buttonStopText: {
      color: 'black',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16
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
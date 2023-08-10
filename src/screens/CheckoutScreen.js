import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SP_KEY} from '@env';
import {StripeProvider, usePaymentSheet} from '@stripe/stripe-react-native';

const CheckoutScreen = ({route}) => {
  const totalAmount = route.params.totalAmount;
  const [ready, setReady] = useState(false);
  const {initPaymentSheet, presentPaymentSheet, loading} = usePaymentSheet();

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const initializePaymentSheet = async () => {
    try {
      const {paymentIntent, ephemeralKey, customer} =
        await fetchPaymentSheetParams();

      const {error} = await initPaymentSheet({
        merchantDisplayName: 'Example, Inc.',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        returnURL: 'stripe-example://stripe-redirect',
      });

      if (error) {
        console.log(`Paymentsheet code: ${error.code}`, error.message);
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
        setReady(true);
      }
    } catch (error) {
      console.error('Error initializing payment sheet:', error);
    }
  };

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await fetch('http://192.168.1.137:4002/payment-sheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount:Math.round(totalAmount * 100),
            currency:'INR'
          })
      });
      const {paymentIntent, ephemeralKey, customer} = await response.json();

      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    } catch (error) {
      console.error('Error fetching payment sheet params:', error);
      throw error;
    }
  };

  const openPaymentSheet = async () => {
    try {
      const {error} = await presentPaymentSheet();

      if (error) {
        console.log(`Error code: ${error.code}`, error.message);
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
        Alert.alert('Success', 'Your order is confirmed!');
      }
    } catch (error) {
      console.error('Error opening payment sheet:', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <StripeProvider
        publishableKey="pk_test_51NbMeoSAgswOLPgsxZBnEvDq1LbDTcC3fwnbvoSqIK7a40ob0hZ4ewCwEElm8rkOyNCd79D8IST7Gr5hyqu2Yeej003fyadMAp"
        urlScheme="your-url-scheme"
        merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}">
        <Text style={{ textAlign: 'center', fontSize: 20, margin: 20, color: 'black' }}>
          Total billing amount - <Text style={{ color: 'blue' }}>₹ {totalAmount}</Text>
        </Text>
        <TouchableOpacity
          style={{ backgroundColor: 'blue', padding: 10 }}
          onPress={openPaymentSheet}
          disabled={loading || !ready}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Pay now</Text>
        </TouchableOpacity>
      </StripeProvider>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({});

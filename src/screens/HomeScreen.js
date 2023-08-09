import {StyleSheet, Text, View, Alert} from 'react-native';
import React from 'react';
import {SP_KEY} from '@env';
import {StripeProvider} from '@stripe/stripe-react-native';
import PaymentScreen from './PaymentScreen';

const HomeScreen = () => {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <StripeProvider
          publishableKey={SP_KEY}
          merchantIdentifier="merchant.identifier" // required for Apple Pay
          urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        >
          <PaymentScreen />
        </StripeProvider>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

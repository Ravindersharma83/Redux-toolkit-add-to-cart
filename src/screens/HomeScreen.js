import {StyleSheet, Text, View, Alert} from 'react-native';
import React from 'react';
import {SP_KEY} from '@env';
import {StripeProvider} from '@stripe/stripe-react-native';
import PaymentScreen from './PaymentScreen';

const HomeScreen = ({route}) => {
  const totalAmount = route.params.totalAmount;
  return (
    <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
      <View>
        <StripeProvider
          publishableKey={SP_KEY}
          merchantIdentifier="merchant.identifier" // required for Apple Pay
          urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        >
          <Text style={{textAlign:'center',fontSize:20,margin:20,color:'black'}}>Total billing amount - <Text style={{color:'blue'}}>₹ {totalAmount}</Text></Text>
          <Text style={{textAlign:'center',fontSize:16,margin:20,color:'red'}}>Please Enter your card details below to complete the payment process</Text>
          <PaymentScreen totalAmount={totalAmount} />
        </StripeProvider>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

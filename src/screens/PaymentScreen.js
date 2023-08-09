import {Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import {CardField, useStripe, createToken, confirmPayment} from '@stripe/stripe-react-native';
import createPaymentIntent from '../apis/stripeApis';

const PaymentScreen = () => {
    const[cardInfo,setCardInfo] = useState(null);
    const[disabled,setDisabled] = useState(true);
    const fetchCardDetail = (cardDetail) => {
        // console.log('my card details',cardDetail);
        if(cardDetail.complete){
            setCardInfo(cardDetail);
            setDisabled(false);
        }else{
            setCardInfo(null);
            setDisabled(true);
        }
    }

    const onDone = async() => {
        console.log('my card details',cardInfo);
        let apiData = {
            amount:500,
            currency:'INR'
        }
        try {
            const res = await createPaymentIntent(apiData);
            console.log('payment intent create successfully',res);

            if(res?.data?.paymentIntent){
                let confirmPaymentRes = confirmPayment(res?.data?.paymentIntent,{paymentMethodType:'Card'});
                console.log('confirmPaymentRes -- ****',confirmPaymentRes);
                Alert.alert("Payment successful !!");
            }
        } catch (error) {
            console.log('Error raised during payment intent',error);
        }
        // if(!!cardInfo){
        //     try {
        //         const resToken = await createToken({...cardInfo, type:'Card'});
        //         console.log('resToken',resToken);
        //     } catch (error) {
        //         Alert.alert('Error raised during create token');
        //     }
        // }
    }
  return (
    <View style={{flex:1}}>
        <SafeAreaView style={{flex:1}}>
            <CardField
            postalCodeEnabled={false}
            placeholders={{
                number: '4242 4242 4242 4242',
            }}
            cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
            }}
            style={{
                width: '100%',
                height: 50,
                marginVertical: 30,
            }}
            onCardChange={cardDetails => {
                // console.log('cardDetails', cardDetails);
                fetchCardDetail(cardDetails);
            }}
            onFocus={focusedField => {
                console.log('focusField', focusedField);
            }}
            />
        <TouchableOpacity style={{backgroundColor:disabled ? 'gray' : 'red',padding:10}} onPress={onDone} disabled={disabled}>
            <Text style={{color:'white',textAlign:'center'}}>Pay now</Text>
        </TouchableOpacity>
        </SafeAreaView>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});

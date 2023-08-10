import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {decreaseQty, increaseQty} from '../redux/slices/ProductSlice';
import {
  addToCart,
  deleteMyCartItem,
  removeFromCart,
} from '../redux/slices/CartSlice';

const CartScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const myCart = useSelector(state => state.cart);
  const cartTotal = () => {
    let total = 0;
    myCart.map((item, index) => {
      total = total + item.price * item.qty;
    });
    return total;
  };

  return (
    <View style={[styles.container, {backgroundColor: 'white'}]}>
      <View style={styles.header}>
      <View>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            margin: 10,
            color: 'black',
          }}>
          Cart Details
        </Text>
      </View>
    </View>
    <View style={{marginTop: 10, flex: 1, marginBottom: 10}}>
      <FlatList
        data={myCart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <View style={[styles.itemView, {backgroundColor: 'white'}]}>
              <Image source={{uri: item.image}} style={styles.productImage} />
              <View style={styles.nameView}>
                <Text style={{color: 'black'}}>
                 {item.name}
                </Text>
                <Text style={[styles.price, {color: 'green'}]}>
                  $ {item.price}
                </Text>
                <Text style={[styles.price, {color: 'red'}]}>
                  Qty - {item.qty}
                </Text>
              </View>
            </View>
          );
        }}
      />

        <View style={{width:'100%',height:60,backgroundColor:'#fff',position:'absolute',bottom:0,flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}>
          <View style={{width:'50%',justifyContent:'center',alignItems:'center',height:'100%'}}>
              <Text style={{fontSize:16,fontWeight:'700',color:'#000'}}>{`Total - $ ${cartTotal()}`}</Text>
          </View>
          <View style={{width:'50%',justifyContent:'center',alignItems:'center',height:'100%'}}>

              <TouchableOpacity style={{width:'50%',height:45,backgroundColor:'green',justifyContent:'center',alignItems:'center',borderRadius:7,marginBottom:5}} onPress={() => navigation.navigate('Checkout',{totalAmount:cartTotal()})}>
                  <Text style={{color:'#fff'}}>Checkout</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{width:'50%',height:45,backgroundColor:'green',justifyContent:'center',alignItems:'center',borderRadius:7,marginBottom:30}} onPress={() => navigation.navigate('Checkout2',{totalAmount:cartTotal()})}>
                  <Text style={{color:'#fff'}}>Checkout 2</Text>
              </TouchableOpacity>
          </View>
        </View>
    </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  itemView: {
    width: '90%',
    height: 100,
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'row',
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  nameView: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: 'green',
    marginTop: 10,
  },
  buttonStyles: {
    backgroundColor: 'green',
    borderRadius: 7,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

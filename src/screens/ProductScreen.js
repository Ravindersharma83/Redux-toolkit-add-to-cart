import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addProducts } from '../redux/slices/ProductSlice';
import ProductListing from './ProductListing';

const ProductScreen = ({navigation}) => {
  const data = [
    {
      id: 1,
      qty: 0,
      name: 'Shoes 1',
      price: 1100,
      image:
        'https://img.freepik.com/premium-psd/shoes-3d-rendering-isolated_625075-30.jpg?size=626&ext=jpg&ga=GA1.2.1349196585.1687175242&semt=sph',
    },
    {
      id: 2,
      qty: 0,
      name: 'Shoes 2',
      price: 680,
      image:
        'https://img.freepik.com/premium-photo/colorful-sport-shoes-mustard-color-wall_151013-4913.jpg?size=626&ext=jpg&ga=GA1.2.1349196585.1687175242&semt=sph',
    },
    {
      id: 3,
      qty: 0,
      name: 'Shoes 3',
      price: 599,
      image:
        'https://img.freepik.com/premium-photo/colorful-sport-shoes-green_151013-4554.jpg?size=626&ext=jpg&ga=GA1.1.1349196585.1687175242&semt=sph',
    },
];

const dispatch = useDispatch();
useEffect(()=>{
  data.map((item)=>{
    dispatch(addProducts(item));
  })
  // dispatch(addProducts(data));
},[])

  return (
    <View style={{flex:1}}>
      <ProductListing navigation={navigation}/>
    </View>
  )
}

export default ProductScreen

const styles = StyleSheet.create({})
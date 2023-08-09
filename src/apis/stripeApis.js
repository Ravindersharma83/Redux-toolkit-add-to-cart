import axios from "axios";

const creatPaymentIntent = (data) => {
    return new Promise((resolve, reject) => {
        axios.post('http://192.168.1.137:4002/payment-sheet', data).then(function (res) {
            resolve(res)
        }).catch(function (error) {
            console.log('fun called',error);
            reject(error)
        })
    })
}

export default creatPaymentIntent
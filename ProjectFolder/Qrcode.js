import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
export default class Qrcode extends Component {
  
    
    render() {
        let logoFromFile = require('./img/ncm.jpg');
        return (
            <View style={styles.container}>
                <QRCode
                    value={this.props.customerPhoneNumber}
                    logoSize={30}
                    logo={logoFromFile}
                    size={200}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00b5ec',
    },
});
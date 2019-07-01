//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button , TextInput} from 'react-native';
import firebase from 'react-native-firebase';
// create a component
class RetriveData extends Component {
    constructor() {
        super();
        db=firebase.firestore()
        this.state={
            info:{}
        }
        }  
       _saloma=()=>{
           alert("saloma") 
        }
        componentDidMount(){
            var cityRef = db.collection('cities').doc('SF');
            var getDoc = cityRef.get()
                .then(doc => {
                    if (!doc.exists) {
                        console.log('No such document!');
                    } else {
                        console.log('Document data:', doc.data());
                    }
                })
                .catch(err => {
                    console.log('Error getting document', err);
                });
        }
        _RetriverData=(name)=>{
            var cityRef = db.collection('cities').doc(name);
            var getDoc = cityRef.get()
                .then(doc => {
                    if (!doc.exists) {
                        console.log('No such document!');
                    } else {
                        console.log('Document data:', doc.data());
                    }
                })
                .catch(err => {
                    console.log('Error getting document', err);
                });
         /*    docs = db.collection('cities').get()
            this.setState({info:docs.fullName})
            console.log(this.state.info) */
           /*  dd=firebase.firestore().collection("user")
            dd.get()
            .then(doc=>{
                const { phoneNumber, fullName } = doc.data();
                console.warn(phoneNumber)
            })
            firebase.firestore().doc("user/9PZDQfpjzGzoRAWYOCEt")
            .get()
            .then(doc=>{
             const { phoneNumber, fullName } = doc.data();
             console.log(phoneNumber)
            }) */
           /*  db.collection("cities").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });
            }); */
        }
        updateTextInput(value) {
            this.setState({ textInput: value });
          }
        render() { 
        return (
          <View>
            <Text>salam
            </Text>   
            <Text>salam
            </Text>   
            <Button title="ali" onPress={()=>this._RetriverData(this.state.textInput)}/>
              <TextInput
            placeholder={'Add TODO'}
            value={this.state.textInput}
            onChangeText={(text) => this.updateTextInput(text)}
          />
          </View>
        );
          }
        }
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});
//make this component available to the app
export default RetriveData;

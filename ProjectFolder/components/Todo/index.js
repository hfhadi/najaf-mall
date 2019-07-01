import React from 'react';
import { StyleSheet, View, FlatList, TextInput, Button, } from 'react-native';


import firebase from 'react-native-firebase';
import Todo from './Todo'; // we'll create this next
import { AsyncStorage } from 'react-native';


today = new Date()
var myNumber

export default class App extends React.Component {


  constructor() {
    super();
   
    db = firebase.firestore()

     citiesRef = db.collection("user");

    this.ref = db.collection('user');
     myNumber=db.collection('user').doc("phoneNumber")
    this.ref2 = db.collection('customers');

    this.unsubscribe = null;
    this.state = {
      textInput: '',
      loading: true,
      todos: [],
      tweets2: [],
      customers:[],
      myNumber
    };
  }
componentWillMount(){
  this.addTodo(this.props.customerPhoneNumber, this.props.fullName)
  this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
}



 

  componentWillReceiveProps(){
 //  this.addTodo(this.props.customerPhoneNumber, this.props.fullName)
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const todos = [];
    querySnapshot.forEach((doc) => {
      const { name} = doc.data();
      todos.push({  
        key: doc.id,
        id: doc.id,
        doc, // DocumentSnapshot
       name
       
      });
    });
    this.setState({
      todos,
      loading: false,
    });


  }

  updateTextInput(value) {
    this.setState({ textInput: value });
  }
  
justAlert=(phoneNumber,confirm,fullName)=>{

 /*  citiesRef.doc(phoneNumber).set({
    name: fullName,
    
    regions: ["west_coast", "norcal"] })
  this.setState({
    textInput: '',
  }); */
 /*  this.state.myNumber.get().then(function(doc) 
  {
      if (doc.exists) 
      {
          console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) 
  {
      console.log("Error getting document:", error);
  });

if(confirm)
  this.ref.add({
   // title: this.state.textInput,
    point:0,
    phoneNumber: phoneNumber,
    fullName:fullName
  });
  */

}
 

addTodo=(phone,name)=> {


  var cityRef = db.collection('user').doc(phone);

            var getDoc = cityRef.get()
                .then(doc => {
                    if (!doc.exists) {
                      citiesRef.doc(phone).set({
                        name: name,
                        
                        regions: ["west_coast", "norcal"] })
                      this.setState({
                        textInput: '',
                      });
                    } else {
                       console.warn("user exist")
                    }
                })
                .catch(err => {
                    console.log('Error getting document', err);
                });



  
  }

  render() {

    if (this.state.loading) {
      return null; // or render a loading icon
    }
    return (

      <View style={{ flex: 10 }}>
        <View style={{flex:7}}>
          <FlatList style={{ flex: 1 }}
            data={this.state.todos}
            renderItem={({ item }) => <Todo {...item} />}
          />
        </View>
        <View style={{ flex: 3 }}>
          <TextInput
            placeholder={'Add TODO'}
            value={this.state.textInput}
            onChangeText={(text) => this.updateTextInput(text)}
          />
          <Button
            title={'Add TODO'}
            disabled={!this.state.textInput.length}
            onPress={() => this.addTodo()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 64,
    padding: 10,
    width: 135,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  }
});

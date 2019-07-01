//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList,TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase'
// create a component
class App extends Component {

  state = {
    myList:  [{'key':'1'},{'key':'2'}]
  }

  constructor(props) {
    super(props)

    db = firebase.firestore()
    this.ref = firebase.firestore().collection('cities'),
    this.state = {
     
      todos: [],
  };
  }


  addData = () => {

    var citiesRef = db.collection("cities");

    citiesRef.doc("SF").set({
      name: "San Francisco", state: "CA", country: "USA",
      capital: false, population: 860000,
      regions: ["west_coast", "norcal"]
    });
    citiesRef.doc("LA").set({
      name: "Los Angeles", state: "CA", country: "USA",
      capital: false, population: 3900000,
      regions: ["west_coast", "socal"]
    });
    citiesRef.doc("DC").set({
      name: "Washington, D.C.", state: null, country: "USA",
      capital: true, population: 680000,
      regions: ["east_coast"]
    });
    citiesRef.doc("TOK").set({
      name: "Tokyo", state: null, country: "Japan",
      capital: true, population: 9000000,
      regions: ["kanto", "honshu"]
    });
    citiesRef.doc("BJ").set({
      name: "Beijing", state: null, country: "China",
      capital: true, population: 21500000,
      regions: ["jingjinji", "hebei"]
    });
    citiesRef.doc("IQ").set({
      name: "بغداد", state: null, country: "العراق",
      capital: true, population: 21500000,
      regions: ["jingjinji", "hebei"]
    });
    citiesRef.doc("BGD").set({
      name: "بغداد", state: null, country: "العراق",
      capital: true, population: 21500000,
      regions: ["jingjinji", "hebei"]
    });
  }

  getDocument = (name) => {
   
   
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
  }

   getAllData = ()=> {
 myData=[]
    db.collection("cities").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      myData.push({'key':doc.id})
     
      });
    }).then(
      this.setState({myList:myData})
    )
    console.log(myData)
   
    console.log(this.state.myList)
  }

  componentWillMount(){
    myData=[]
    db.collection("cities").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      myData.push({'key':doc.data().name})
     
      });
    }).then(
      this.setState({myList:myData})
    )
    console.log(myData)
   
    console.log(this.state.myList)
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate) 
}
onCollectionUpdate = (querySnapshot) => {
  const todos = [];
  querySnapshot.forEach((doc) => {
    const { name, country } = doc.data();
    
    todos.push({
      key: doc.id,
      name, // DocumentSnapshot
      country,
    
    });
  });

  this.setState({ 
    todos,
   // loading: false,
 });
}
  
  render() {
    return (
      <View style={styles.container}>

         <FlatList
          data={this.state.todos}
          renderItem={({item}) =>
          
          <TouchableOpacity onPress={ () => this.getDocument(item.key)}
          onPress={()=>alert(item.name)}
          >
           <Text style={styles.item}>{item.key}:{item.name}:{item.country}</Text>
         
           </TouchableOpacity>
          }
          />
        
        <Text>App</Text>
        <Button title="add" onPress={() => this.addData()} />
        <Button title="get" onPress={() => this.getDocument('SF')} />
        <Button title="get All" onPress={() => this.getAllData()} />

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
    //  backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default App;

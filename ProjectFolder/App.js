import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, StyleSheet, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
//import Mynotifcation from './Notification'
//import Qrcode from './Qrcode'
import ToDo from './components/Todo'
import Singup from './Signup'
export default class App extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: '',
      codeInput: '',
      phoneNumber: '+4531223388',
      confirmResult: null,
      username: false,
      resualt:false,
      fullName:''
    };
  }
  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.toJSON() });
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          message: '',
          codeInput: '',
          phoneNumber: '+4531223388',
          confirmResult: null,
          resualt:false,
          fullName:''
        });
      }
    });
  }
  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }
  signIn = () => {
    const { phoneNumber } = this.state;
    this.setState({ message: 'إرسال رمز التحقق ...' });
    firebase.auth().signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => this.setState({ confirmResult, message: 'تم ارسال رمز التحقق', resualt:true }))
     /*  .then((user)=>this.refs.child.justAlert(user["phoneNumber"],this.state.resualt,this.state.fullName)) */
     .then((confirmResult)=>console.warn("true"))
      .catch(error => this.setState({ message: `حدث خطأ : ${error.message}` }));
  };
  confirmCode = () => {
    const { codeInput, confirmResult } = this.state;
    if (confirmResult && codeInput.length) {
      confirmResult.confirm(codeInput)
        .then((user) => {
          console.log(codeInput)
        })
        .then(console.warn(codeInput))
        .catch(error => this.setState({ message: `حدث خطأ : ${error.message}` }));
    }
  };
  signOut = () => {
    firebase.auth().signOut();
  }
  showBarCode = () => {
    this.setState({
      username: true
    })
  }
  renderPhoneNumberInput() {
    const { phoneNumber } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db' }} />
          <TextInput style={styles.inputs}
            placeholder="الإسم بالكامل"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(fullName) => this.setState({ fullName })} />
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/color/mobile' }} />
          <TextInput style={styles.inputs}
            placeholder="رقم التليفون"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={value => this.setState({ phoneNumber: value })}
            value={phoneNumber}
          />
        </View>
        {/*  <Text>إكتب رقم التليفون ...</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15}}
          onChangeText={value => this.setState({ phoneNumber: value })}
          placeholder={'إكتب هنا رقم التليفون ...'}
          value={phoneNumber}
        /> */}
        <Button title="تسجيل" disabled={this.state.phoneNumber.length < 10} onPress={this.signIn} />
      </View>
    );
  }
  renderMessage() {
    const { message } = this.state;
    if (!message.length) return null;
    return (
      <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
    );
  }
  renderVerificationCodeInput() {
    const { codeInput } = this.state;
    return (
      <View style={{ marginTop: 25, padding: 25 }}>
        <Text>أدخل رمز التحقق في الأسفل</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value => this.setState({ codeInput: value })}
          placeholder={'Code ... '}
          value={codeInput}
        />
        <Button title="فعل رمز التحقق" color="#841584" onPress={this.confirmCode} />
      </View>
    );
  }
  renderQrCode=(user)=>{
    return(
      <ScrollView style={{ flex: 10 }}>
      <Text>your number is{user["phoneNumber"]}</Text>
      <View style={{ flex: 3 }}>
     <ToDo ref="child"  customerPhoneNumber={user["phoneNumber"]} confirm={this.state.resualt} fullName={this.state.fullName}/>
     <Button title='toDo' onPress ={()=> this.refs.child.justAlert(user["phoneNumber"],this.state.resualt,this.state.fullName)}/>
      </View>
      <View style={{ flex: 7 }}>
    {/*   <Qrcode customerPhoneNumber={user["phoneNumber"]}/> */}
    </View>
{/* <Button title="Out"  onPress={()=>this.signOut()}/> */}
      <Singup signout={() => this.signOut()} qrcode={() => this.showBarCode()} customerPhoneNumber={user["phoneNumber"]} />
    </ScrollView>
    )
  }
  render() {
    const { user, confirmResult } = this.state;
    return (
      <View style={{ flex: 1 }}>
{!user && this.renderMessage()}

        {!user && !confirmResult && this.renderPhoneNumberInput()}
        
        {!user && confirmResult && this.renderVerificationCodeInput()}
        {user && !this.state.username && this.renderQrCode(user)}
        {user && this.state.username && (
          <Text>
            show qrcode
            </Text>
        )
        }
      {/*   <Mynotifcation /> */}
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
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  signupButton: {
    backgroundColor: "#FF4DFF",
  },
  signUpText: {
    color: 'white',
  }
});
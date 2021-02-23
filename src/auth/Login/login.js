import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  ScrollView,
  BackHandler,
  ToastAndroid,
  CheckBox
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DarkGrey,Blue, Pink, Grey, LightGrey, Brown, Cream, Orange,LightBlue} from '../../utils/Constants';
import {Log, Signin, name, email, password, phone, Already_have_account_Login as ha, Dont_have_account_signup as dha} from '../../utils/Constants';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import Caller from "../../configurations/Caller";


export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      language: 'eng',
      icon :"checkbox-blank-outline"
    };
    
  }

  spring() {
    this.setState({backClickCount: 1}, () => {
      ToastAndroid.show('Back press twice to exit', ToastAndroid.SHORT);
      setTimeout(() => {this.setState({backClickCount: 0})}, 1000);
      });
  }

  handleBackPress = () => {
    console.log("Back Press");
    if (this.props.navigation.isFocused())
      this.state.backClickCount == 1 ? BackHandler.exitApp() : this.spring();
    else
      this.props.navigation.goBack(null);
    return true;
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  componentDidMount () {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    AsyncStorage.getItem('language')
      .then(language => {
          
          if(language != null ){
            this.setState({language:language})
            console.log(language)
          }
        });
  }
  onLoginPress = () => {

    if(this.state.email != null && this.state.password != null){

      if(this.state.icon == 'checkbox-blank-outline'){

        Caller.callServer("LoginManager","POST", [this.state.email,this.state.password])
              .then( response  => {
                return response.json();
              })
              .then ( data => {
                if(data.message == 'login successfuly'){

                  const manager=JSON.stringify(data.Data);

                  AsyncStorage.setItem('user', manager)
                  .catch(err => {
                    console.log(err);
                  })
                  AsyncStorage.setItem('userRole', 'manager')
                  .catch(err => {
                    console.log(err);
                  })

                  this.props.navigation.navigate('Home');

                }
                else
                  ToastAndroid.show(data.message, ToastAndroid.SHORT);

              });
      }
      else{
        Caller.callServer("LoginCook","POST", [this.state.email,this.state.password])
              .then( response  => {
                return response.json();
              })
              .then ( data => {
                if(data.message == 'login successfuly'){

                  const cook=JSON.stringify(data.Data);

                  AsyncStorage.setItem('user', cook)
                  .catch(err => {
                    console.log(err);
                  })
                  AsyncStorage.setItem('userRole', 'cook')
                  .catch(err => {
                    console.log(err);
                  })

                  this.props.navigation.navigate('CookHome');

                }
                else
                  ToastAndroid.show(data.message, ToastAndroid.SHORT);

              });
      }
    }
    else
      ToastAndroid.show("Enter Email and Password", ToastAndroid.SHORT);


  }

  checkBox(){


    if(this.state.icon == "checkbox-blank-outline")
      this.setState({icon:"checkbox-marked"});
    else
      this.setState({icon:"checkbox-blank-outline"});

  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView   keyboardShouldPersistTaps="always">
        <LinearGradient
          start={{x: 1.0, y: 0.60}} end={{x: 0.5, y: 1.9}}
          locations={[0,1,0.99]}
          colors={[LightBlue, LightBlue, LightBlue]}
        >
          <View style={{padding: 10, paddingTop: 10}}>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',justifyContent:'center'}}>
              
                {this.state.language=="eng" ? 
                  <Text style={{fontWeight: 'bold',color:'#fff'}} > Log In </Text>
                  :
                  <Text style={{fontWeight: 'bold',color:'#fff'}} > {Log} </Text>

                }
              <View style={{width: 22}} />
            </View>
          </View>
        </LinearGradient>


        <View style={{height: hp('55%'), alignItems: 'center', margin: 10, padding: 10}}>
          
          <View style={[{paddingVertical: 20}, styles.center]}>
            <Image
              style={{width: 100, height: 100, resizeMode: 'contain'}}
              source={require('../../images/icons/logo.png')}
            />
          </View>

          <View style={{paddingVertical: 10}}/>  
          <View style={{width: '100%',  flex: 1, justifyContent: 'center'}}>
          <View style={[styles.outline,{flexDirection: 'row', paddingHorizontal: 15, alignItems: 'center'}]}>
            <Icon 
              name={"email"}
              size={wp('5%')}
              color={Cream}
            />
            <TextInput
              style={{flex: 1, fontSize: 16, padding: 7}}
              placeholder= {this.state.language=="eng" ? "Email" : email}
              onChangeText={(val) => { this.setState({email: val}) }}
              placeholderTextColor={Cream}
              
            />
          </View>

          <View style={{paddingVertical: hp('2%')}}/>

          <View style={[styles.outline,{flexDirection: 'row', paddingHorizontal: 15, alignItems: 'center'}]}>
            <Icon 
              name={"lock"}
              size={wp('5%')}
              color={Cream}
            />
            <TextInput
              secureTextEntry={true}
              style={{flex: 1, fontSize: 16, padding: 7}}
              placeholder= {this.state.language=="eng" ? "Password" : password }
              onChangeText={(val) => { this.setState({password: val}) }}
              placeholderTextColor={Cream}
            />
          </View>
          </View>
          
        </View>

        <View style={{
          paddingHorizontal:wp('10%'),
          justifyContent:'flex-end',
          flexDirection:'row',
          marginBottom:hp('4%'),
          // alignItems:'center'
        }}>
          <Text style={{
            fontSize:wp('4%'),
            color:DarkGrey,
            marginRight:wp('4%'),
          }}>
            Login as a Cook
          </Text>

          <TouchableOpacity
            onPress={()=>{this.checkBox()}}
          >
            <Icon 
              name={this.state.icon}
              size={wp('6%')}
              color={LightBlue}
            />
          </TouchableOpacity>
        
        </View>

        <View style={{height: hp('7.5%'), paddingHorizontal: 30, paddingVertical: 0, justifyContent: 'center'}}>
          <LinearGradient
            start={{x: 0.0, y: 0.25}} end={{x: 1, y: 1.0}}
            locations={[0,0.5,0.9]}
            colors={[LightBlue, LightBlue, LightBlue]}
            style={{flex: 1, borderRadius: 10}}>
            <TouchableOpacity
              style={[{flex: 1}, styles.center]}
              onPress={() => {this.onLoginPress()}}
            >
              {this.state.language=="eng" ? 
                <Text style={{color: '#fff', fontSize: 16}} >Log In</Text>
                :
                <Text style={{color: '#fff', fontSize: 16}} >{Log}</Text>

              }

            </TouchableOpacity>
          </LinearGradient>
        </View>
        
        <TouchableOpacity
          style={[{marginTop: 20}, styles.center]}
          onPress={() => {this.props.navigation.navigate('SignUp')}}
        >
          {this.state.language=="eng" ? 
            <Text style={{color: '#8a8a8a', fontSize: 14}} >Doesn't have account ? Sign Up</Text>
            :
            <Text style={{color: '#8a8a8a', fontSize: 14}} >{dha}</Text>
          }
        </TouchableOpacity>

        </ScrollView>

        
         

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'

  },
  row: {
    width: wp('95%'),
    flexDirection: 'row',
    marginVertical: 5
  },
  text: {
    fontSize: 18,
    color: '#fff'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  outline: {
    borderWidth: 1,
    borderColor: Cream,
    borderRadius: 50
  }
})
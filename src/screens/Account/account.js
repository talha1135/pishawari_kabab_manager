import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Dimensions,
  StyleSheet,
  ScrollView,
  FlatList,
  BackHandler,
  ToastAndroid
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon1 from 'react-native-vector-icons/AntDesign';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Blue, Pink, Grey, LightGrey, Brown, Cream, Red, LightBlue, LightRed, DarkGrey} from '../../utils/Constants';
import {Log, Signin, name, email, password, phone,continueToPayementMode as ctp, Already_have_account_Login as ha, Dont_have_account_signup as dha} from '../../utils/Constants';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation'; 

var backClickCount=1;

export default class Account extends Component {

  constructor(props) {
    super(props);
    this.state = {
      language: 'eng',
      backClickCount: 0,
      user:[]
    };
    
  }
  logOut (){
    AsyncStorage.removeItem('user');
    AsyncStorage.removeItem('userRole');
    ToastAndroid.show("Log Out!", ToastAndroid.SHORT);

    this.props.navigation.navigate('Login');
  }


  setEnglish (){
    AsyncStorage.setItem('language', 'eng')
      .catch(err => {
        console.log(err);
      })
    this.setState({language:'eng'})

    
    AsyncStorage.getItem('userRole')
      .then(userRole => {
          
          if(userRole != null ){
            if(userRole == 'manager'){
              const resetAction = StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: 'Home' })],
              });
              this.props.navigation.dispatch(resetAction)
            }
            else{
              const resetAction = StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: 'CookHome' })],
              });
              this.props.navigation.dispatch(resetAction)
            }
            
          }
          
        });

  }

  setArabic (){
    AsyncStorage.setItem('language', 'arb')
      .catch(err => {
        console.log(err);
      })
    this.setState({language:'arb'})

    AsyncStorage.getItem('userRole')
      .then(userRole => {
          
          if(userRole != null ){
            if(userRole == 'manager'){
              const resetAction = StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: 'Home' })],
              });
              this.props.navigation.dispatch(resetAction)
            }
            else{
              const resetAction = StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: 'CookHome' })],
              });
              this.props.navigation.dispatch(resetAction)
            }
          }
        });


    
    
  }


  spring() {
    this.setState({backClickCount: 1}, () => {
      this.props.navigation.goBack(null);
      setTimeout(() => {this.setState({backClickCount: 0})}, 1000);
      });
    console.log(this.state.backClickCount);
  }

  handleBackPress = () => {
    console.log("Back Press1");

    this.state.backClickCount == 0 && this.spring();
    return true;
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  componentDidMount(){
    AsyncStorage.getItem('language')
      .then(language => {
          
          if(language != null ){
            this.setState({language:language})
          }
        });


      AsyncStorage.getItem('user')
      .then(user=>{
        return JSON.parse(user);
      })
      .then(user => {
          
          if(user != null ){
            console.log("login user ",user);
            this.setState({user:user})
            
          }
        });
      
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

   
    }
  
  

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <View style={{flexDirection:'row'}}>

            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                justifyContent:'center',
                marginRight:wp('1%')
               }} 
              onPress={() => {this.props.navigation.goBack()}}
            >
              <Icon1 
                name={"left"}
                size={18}
                color={'rgba(255,255,255,1)'}
              />
            </TouchableOpacity>

            <Icon 
              name={"account"}
              size={hp('4%')}
              color={'rgba(255,255,255,1)'}
            />
            {this.state.language == 'eng' ? 
              <Text style={{
                color:'#fff',
                fontSize:wp('5%'),
                marginLeft:wp('2%')
              }}>
                Account
              </Text>
            :
              <Text style={{
                color:'#fff',
                fontSize:wp('5%'),
                marginLeft:wp('2%')
              }}>
                الحساب
              </Text>
            }
          </View>
          
        </View>

        <View style={{
          // backgroundColor:'pink',
          height:400,
          paddingHorizontal:wp('3%')
        }}>
          <Text style={{
            fontSize:wp('7%'),
            color:DarkGrey,

          }}>
            {this.state.user.name}
          </Text>

          <Text style={{
            fontSize:wp('4%'),
            color:DarkGrey,

          }}>
            {this.state.user.email}
          </Text>

          <View style={{borderBottomWidth:1,borderColor:DarkGrey,paddingVertical:hp('1%'),marginBottom:hp('5%')}}/>
          


          <TouchableOpacity
              onPress={() => {this.props.navigation.navigate('AccountSettings')}}
              style={{
                alignItems:'center',
                flexDirection:'row',
                justifyContent:'space-between',
                paddingLeft:wp('5%'),
                paddingRight:wp('3%'),
                // backgroundColor:'rgba(39, 170, 225, 0.05)',
                paddingVertical:hp('2%'),
                marginTop:hp('1%')
              }}
            >
              {this.state.language == 'eng' ?
                <Text style={{
                  color:DarkGrey
                }}>
                  Account Settings
                </Text>
              :
                <Text style={{
                  color:DarkGrey
                }}>
                  إعدادت الحساب
                </Text>
              }
              <Icon1 
                name={"right"}
                size={hp('2%')}
                color={DarkGrey}
              />
          </TouchableOpacity>

          <View
              
              style={{
                alignItems:'center',
                justifyContent:'space-between',
                paddingLeft:wp('5%'),
                flexDirection:'row',
                paddingRight:wp('3%'),
                // backgroundColor:'rgba(39, 170, 225, 0.05)',
                paddingVertical:hp('3%'),
                marginVertical:hp('1%')
              }}
            >
            {this.state.language == 'eng' ?
              <Text style={{
                color:DarkGrey
              }}>
                Language
              </Text>
            :
              <Text style={{
                  color:DarkGrey
                }}>
                  لغة
                </Text>
              }

              <View style={{
                flexDirection:'row',
                // paddingVertical:hp('2%')
              }}>
                <TouchableOpacity style={{
                  paddingHorizontal:wp('4%'),
                  borderRightWidth:1,
                  borderColor:Grey
                }}
                  onPress = {()=>{this.setEnglish()}}

                >

                  <Text style={{
                    color:this.state.language == 'eng' ? Blue : DarkGrey

                  }}>
                    english
                  </Text>

                </TouchableOpacity>

                <TouchableOpacity style={{
                  paddingLeft:wp('4%')
                }}
                  onPress = {()=>{this.setArabic()}}

                >

                  <Text style={{
                    color:this.state.language == 'arb' ? Blue : DarkGrey
                  }}>
                  عربى</Text>

                </TouchableOpacity>
              </View>

          </View>

          <TouchableOpacity
              onPress={() => {this.logOut()}}
              style={{
                alignItems:'center',
                justifyContent:'space-between',
                flexDirection:'row',
                paddingLeft:wp('5%'),
                paddingRight:wp('3%'),
                backgroundColor:'rgba(255, 0, 0, 0.05)',
                paddingVertical:hp('2%'),
                marginTop:hp('2%')
              }}
            >
            {this.state.language == 'eng' ?
              <Text style={{
                color:DarkGrey
              }}>
                Logout
              </Text>
            :
              <Text style={{
                color:DarkGrey
              }}>
                تسجيل خروج
              </Text>
            }
              <Icon1 
                name={"logout"}
                size={hp('4%')}
                color={Red}
              />
            </TouchableOpacity>


        </View>

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    // justifyContent:'space-between'
    // paddingTop:80
  },
   cartItems: {
    flexDirection:'row',
    borderBottomWidth:1,
    borderColor:LightGrey,
    paddingVertical:hp('1%'),
    paddingHorizontal:wp('2%'),
    justifyContent:'space-between'
    // width:'100%',
   },
   header: {
    backgroundColor:LightBlue,
    // height:hp('9%'),
    borderBottomRightRadius:wp('10%'),
    borderBottomLeftRadius:wp('10%'),
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:wp('5%'),
    alignItems:'center',
    marginBottom:hp('2%'),
    paddingVertical:hp('1.5%')
  },
  footer: {
    backgroundColor:LightBlue,
    // height:hp('9%'),
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:wp('5%'),
    alignItems:'center',
    paddingBottom:hp('1%'),
    alignSelf:'flex-end',
    // marginTop:hp('32%')
  },

});
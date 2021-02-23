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
  BackHandler
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {Blue, Pink, Grey, LightGrey, Brown, Cream, Red, LightBlue, DarkGrey} from '../../utils/Constants';
import {Log, Signin, name, email, password, phone, Already_have_account_Login as ha, Dont_have_account_signup as dha} from '../../utils/Constants';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';

const pass="abc12345";

export default class AccountSettings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      language: 'eng',
      backClickCount:0
    };
    
  }

  spring() {
    this.setState({backClickCount: 1}, () => {
      this.props.navigation.goBack(null);
      setTimeout(() => {this.setState({backClickCount: 0})}, 1000);
      });
    console.log(this.state.backClickCount);
  }

  handleBackPress = () => {
    console.log("Back Press2");

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
      
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

   
    }

  
  componentWillUnmount() {
    this.backHandler.remove();
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
            {this.state.language == 'eng' ?
              <Text style={{
                color:'#fff',
                fontSize:wp('5%'),
                marginLeft:wp('2%')
              }}>
                Account Settings
              </Text>
            :
              <Text style={{
                color:'#fff',
                fontSize:wp('5%'),
                marginLeft:wp('2%')
              }}>
                إعدادت الحساب
              </Text>
            }
          </View>
          
        </View>

        <View style={styles.form}>

          <View style={{
            // borderWidth:1,
            backgroundColor:'#fff',
            padding:wp('2%'),
            paddingHorizontal:wp('4%'),
            borderRadius:5,
            flexDirection:'row',
            justifyContent:'space-between',
            borderColor:'#fff',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,

            elevation: 2,
          }}>

            <View>
              {this.state.language=='eng' ?
                <Text style={{
                  color:DarkGrey,
                  fontSize:wp('4.5%'),
                  fontWeight:"bold",
                  paddingRight:wp('4%'),
                }}>
                  User Name
                </Text>
              :
                <Text style={{
                    color:DarkGrey,
                    fontSize:wp('4.5%'),
                    fontWeight:"bold",
                    paddingRight:wp('4%'),
                  }}>
                    اسم المستخدم
                  </Text>
                
              }
              <Text style={{
                fontSize:wp('4%'),
                color:DarkGrey

              }}>
                john doe
              </Text>
            </View>

            <TouchableOpacity style={{
              justifyContent:'center'
            }}>
              <Icon1 
                name={"edit"}
                size={wp('5%')}
                color={LightBlue}
              />
            </TouchableOpacity>

          </View>

          <View style={{marginVertical:hp('1%')}}/>
          <View style={{
            // borderWidth:1,
            backgroundColor:'#fff',
            padding:wp('2%'),
            paddingHorizontal:wp('4%'),
            borderRadius:5,
            flexDirection:'row',
            justifyContent:'space-between',
            borderColor:'#fff',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,

            elevation: 2,
          }}>

            <View>
              {this.state.language == 'eng' ? 
                <Text style={{
                  color:DarkGrey,
                  fontSize:wp('4.5%'),
                  fontWeight:"bold",
                  paddingRight:wp('4%'),
                }}>
                  Email
                </Text>
              :
                <Text style={{
                  color:DarkGrey,
                  fontSize:wp('4.5%'),
                  fontWeight:"bold",
                  paddingRight:wp('4%'),
                }}>
                  البريد الإلكتروني
                </Text>
              }
              <Text style={{
                fontSize:wp('4%'),
                color:DarkGrey

              }}>
                example@gmail.com
              </Text>
            </View>

            

          </View>
          <View style={{marginVertical:hp('1%')}}/>
          <TouchableOpacity 
          onPress={()=>{this.props.navigation.navigate('ChangePassword')}}
            style={{
            // borderWidth:1,
            backgroundColor:'#fff',
            paddingVertical:wp('5%'),
            paddingHorizontal:wp('4%'),
            borderRadius:5,
            flexDirection:'row',
            justifyContent:'space-between',
            borderColor:'#fff',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,

            elevation: 2,
          }}>
            {this.state.language == 'eng' ? 
              <Text style={{
                fontSize:wp('4%'),
                fontWeight:'bold',
                color:DarkGrey

              }}>
                change password
              </Text>
            :
              <Text style={{
                fontSize:wp('4%'),
                fontWeight:'bold',
                color:DarkGrey

              }}>
                غير كلمة السر
              </Text>
            }

            <Icon1 
                name={"right"}
                size={wp('5%')}
                color={LightBlue}
            />
          
          </TouchableOpacity>
          <View style={{marginVertical:hp('1%')}}/>
          
        

        </View>

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    // paddingTop:80
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

  form: {
    // justifyContent:'center',
    // alignItems:'center',
    marginTop:hp('2%'),
    paddingHorizontal:wp('4%'),
    // borderWidth:1
  }

});
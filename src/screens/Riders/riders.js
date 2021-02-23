import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Dimensions,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  ScrollView,
  BackHandler,
  ToastAndroid
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {Green,DarkGrey,Blue, Pink, Grey, LightGrey, Brown, Cream, Orange,LightBlue} from '../../utils/Constants';
import {MyOrders, Signin, name, email, password, phone, Already_have_account_Login as ha, Dont_have_account_signup as dha} from '../../utils/Constants';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation'; 

import Caller from "../../configurations/Caller";

const riders = [
  // {
  //   rider_id:'123',
  //   name:'ahmed',
  //   phone:'03344556677'

  // },
  // {
  //   rider_id:'1233',
  //   name:'qasim',
  //   phone:'234212234'

  // }
];

  var orderID;

export default class Home extends Component {
  constructor(props) {
    var lan='';

    AsyncStorage.getItem('language')
      .then(language => {
          
          if(language != null ){
            lan=language;
          }
        });
      // console.log(lan);

    super(props);
    this.state = {
      language: 'eng',
      riders:riders,
      
    };
    
  }



 
  componentDidMount () {
    console.log('did mount');

    orderID = this.props.navigation.getParam('orderID');


    AsyncStorage.getItem('language')
      .then(language => {
          
          if(language != null ){
            this.setState({language:language})
            console.log(language)
          }
        });
    // this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);


    Caller.callServer("getRidersList","GET", [1])
      .then( response  => {
        return response.json()
      })
      .then ( data => {
        this.setState({riders:data});

        console.log("response-->",data);
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
    // this.backHandler.remove();
  }
  spring() {
    this.setState({backClickCount: 1}, () => {
      ToastAndroid.show('Back press twice to exit', ToastAndroid.SHORT);
      setTimeout(() => {this.setState({backClickCount: 0})}, 1000);
      });
  }
 

  bookRider(orderID,riderID){

      Caller.callServer("bookRider","POST", [orderID,riderID])
            .then( response  => {
              return response.json()
            })
            .then ( data => {
              console.log("response-->",data);
              ToastAndroid.show('Rider Assigned', ToastAndroid.LONG);


              const resetAction = StackActions.reset({
                      index: 0,
                      actions: [NavigationActions.navigate({ routeName: 'Home' })],
                  });
                  this.props.navigation.dispatch(resetAction)

            });
  }

  renderFields = ({ item, index }) => {
    return (

      <TouchableOpacity 
        onPress={()=>{this.bookRider(orderID,item.id)}}
        style={{
          paddingHorizontal:hp('1%'),
          flexDirection:'row',
          flexDirection:'row',
          borderBottomWidth:1,
          borderColor:LightGrey,
          paddingVertical:hp('1%'),
          paddingHorizontal:wp('2%'),
      }}>

        <View style={{
          padding:wp('2%'),
          borderWidth:1,
          borderColor:Grey,
          width:wp('16%'),
          borderRadius:5
        }}>
          <Icon 
            name={"car-hatchback"}
            size={wp('10%')}
            color={LightBlue}
          />
        </View>
        <View>
          <View style={{flexDirection:'row',marginHorizontal:wp('4%'),paddingVertical:wp('1%')}}>
            <Icon 
              name={"account"}
              size={wp('5%')}
              color={LightBlue}
              style={{alignSelf:'center'}}
            />

            <Text style={{color:DarkGrey, fontSize:wp('4.5%'),textAlign:'center',marginLeft:wp('1%')}}>
              {item.name}
            </Text>
          </View>

          <View style={{flexDirection:'row',marginHorizontal:wp('4%'),paddingVertical:wp('1%')}}>
            <Icon 
              name={"phone"}
              size={wp('5%')}
              color={Green}
              style={{alignSelf:'center'}}
            />

            <Text style={{color:DarkGrey, fontSize:wp('4.5%'),textAlign:'center',marginLeft:wp('1%')}}>
              {item.phone_number}
            </Text>
          </View>

        </View>
        <View style={{
          alignSelf:'flex-end',
          flex:1,
          justifyContent:'flex-end',
          alignItems:'flex-end',
          flexDirection:'row',
          marginRight:wp('3%')
        }}>
          {this.state.language == 'eng' ?
            <Text 
              style={{
                color:DarkGrey,
                fontSize:wp('4%'),
                marginRight:wp('2%')
              }}>
               Assign  
            </Text>
          :
            <Text 
              style={{
                color:DarkGrey,
                fontSize:wp('4%'),
                marginRight:wp('2%')
              }}>
               تعيين


            </Text>
          }
          <Icon1 
              name={"right"}
              size={wp('3%')}
              color={Cream}
              style={{alignSelf:'center'}}
            />
        
          
        </View>
      </TouchableOpacity>

    );
  };

  
  render() {
    return (
      <View style={styles.container}>
          <View style={{
            paddingHorizontal: wp('4%'),
            paddingVertical:wp('2%'),
            borderBottomRightRadius:wp('10%'),
            borderBottomLeftRadius:wp('10%'),
            backgroundColor:LightBlue,
            paddingHorizontal:wp('5%'),
            alignItems:'center',
            marginBottom:hp('2%'),

           }}>
           
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={()=>{this.props.navigation.goBack()}}
                  style={{
                    justifyContent:'center',
                    // backgroundColor:'pink',
                    // padding:wp('1%')
                  }}
                >
                  <Icon1 
                    style={{alignSelf:'center'}}
                    name={"left"}
                    size={wp('5%')}
                    color={"#fff"}
                  />
                </TouchableOpacity>
                {this.state.language=="eng" ? 
                  <Text style={{fontWeight: 'bold',color:'#fff',fontSize:wp('5%')}} >  Rider's List </Text>
                  :
                  <Text style={{fontWeight: 'bold',color:'#fff',fontSize:wp('5%')}} > قائمة رايدر </Text>

                }

                <TouchableOpacity
                  style={{
                    justifyContent:'center',
                    
                  }}
                >
                  <Icon 
                    style={{alignSelf:'center'}}
                    name={"refresh"}
                    size={wp('6.5%')}
                    color={"#fff"}
                  />
                </TouchableOpacity>

            </View>
          </View>
        

      
        <ScrollView style={{}}>
          <FlatList
            data={this.state.riders}
            extraData={this.state}
            keyExtracstor={(item, index) => `${index}`}
            renderItem={this.renderFields}
            ItemSeparatorComponent={() => {
              return ( <View style={{ marginVertical: hp('2%')}} /> )
            }}
          />
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

})
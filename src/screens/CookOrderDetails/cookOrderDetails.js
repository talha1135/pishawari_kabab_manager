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
  ToastAndroid,
  Linking
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Ionicons';
import {LightRed,Green,DarkGrey,Blue, Pink, Grey, LightGrey, Brown, Cream, Orange,LightBlue} from '../../utils/Constants';
import {MyOrders, Signin, name, email, password, phone, Already_have_account_Login as ha, Dont_have_account_signup as dha} from '../../utils/Constants';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import Caller from "../../configurations/Caller";

import { StackActions, NavigationActions } from 'react-navigation'; 

var items=null;
const details=
  {
    date:'06/04/20',
    time:'09:13',
    order_id:'2',
    name:'adnan',
    phone:'033644855',
    email:'example@gmail.com',
    location:'shamsabad murre road rwp',
    longitude:'',
    latitue:'',
    totalBill:'200',
    bill_status_eng:'payment on delivery',
    bill_status_arb:'دفع على تسليم',
    orderItems:[
      {
        name_eng:"karhai",
        name_arb:'كارهاي',
        quantity:'1',
        unit:'kg'
      },
      {
        name_eng:"kabab",
        name_arb:'كباب',
        quantity:'12',
        unit:'pc'
      },
      
    ]
  }
var orderID;

export default class OrderDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      language:'eng',
      data:details
    };
    
  }


  componentWillUnmount() {
    // this.backHandler.remove();
  }
 
  componentDidMount () {
    var order = this.props.navigation.getParam('item');
    orderID=order.id;
    items=order.orders_item;
    this.setState({data:order});
    AsyncStorage.getItem('language')
      .then(language => {
          
          if(language != null ){
            this.setState({language:language})
            // console.log(language)
          }
        });


  }




  renderFields = ({ item, index }) => {
    
    console.log("----->",item);
    
    return (

        <View style={{
            borderBottomWidth:1,
            paddingVertical:hp('1%'),
            borderColor:LightGrey,
            borderRightWidth:1,
            borderLeftWidth:1,
            paddingHorizontal:wp('1%')
          }}>
            {this.state.language == 'eng' ?
              <View style={{
                flexDirection:'row',
                paddingVertical:hp('1%'),
                paddingHorizontal:wp('2%'),
                justifyContent:'space-between'
              }}>

                <Text style={{
                  fontSize:wp('3.8%'),
                  color:DarkGrey
                }}>{item.name_eng}</Text>

                <Text style={{
                  fontSize:wp('3.8%'),
                  color:DarkGrey
                }}>{item.quantity_eng}</Text>

              </View> 
            :
              <View style={{
                flexDirection:'row',
                paddingVertical:hp('1%'),
                paddingHorizontal:wp('2%'),
                justifyContent:'space-between'
              }}>

                <Text style={{
                  fontSize:wp('3.8%'),
                  color:DarkGrey
                }}>{item.quantity_eng}</Text>


                <Text style={{
                  fontSize:wp('3.8%'),
                  color:DarkGrey
                }}>
                  {item.name_arb}
                </Text>
                

              </View> 
            }

            <View style={{
              paddingHorizontal:wp('5%')
            }}>
              {this.state.language == "eng" ? 
                <Text style={{
                  fontSize:wp('3.5%'),
                  color:DarkGrey
                }}>
                  {item.spice_eng}
                </Text>
              :
                <Text style={{
                  fontSize:wp('3.5%'),
                  color:DarkGrey
                }}>
                  {item.spice_arb}
                </Text>
              }
            </View>

        </View>

    );
  };
  cooked(){
    const id = this.state.data.id;
    console.log(id);
    Caller.callServer("orderCooked","POST", [id])
            .then( response  => {
              return response.json()
            })
            .then ( data => {
              console.log("response-->",data);
              ToastAndroid.show('Order Cooked', ToastAndroid.LONG);

              const resetAction = StackActions.reset({
                      index: 0,
                      actions: [NavigationActions.navigate({ routeName: 'CookHome' })],
                  });
                  this.props.navigation.dispatch(resetAction)

            });
  }

  cooking(){
    const id = this.state.data.id;
    console.log(id);
    Caller.callServer("orderCooking","POST", [id])
            .then( response  => {
              return response.json()
            })
            .then ( data => {
              console.log("response-->",data);
              ToastAndroid.show('Order Cooking', ToastAndroid.LONG);

              const resetAction = StackActions.reset({
                      index: 0,
                      actions: [NavigationActions.navigate({ routeName: 'CookHome' })],
                  });
                  this.props.navigation.dispatch(resetAction)

            });
  }
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          start={{x: 1.0, y: 0.60}} end={{x: 0.5, y: 1.9}}
          locations={[0,1,0.99]}
          colors={[LightBlue, LightBlue, LightBlue]}
        >
          <View style={{paddingHorizontal: wp('4%'), paddingVertical:wp('2%')}}>
           
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={()=>{this.props.navigation.goBack()}}
                  style={{
                    justifyContent:'center',
                  }}
                >
                  <Icon2 
                    style={{alignSelf:'center'}}
                    name={"left"}
                    size={wp('5%')}
                    color={"#fff"}
                  />
                </TouchableOpacity>
                {this.state.language=="eng" ? 
                  <View>
                    <Text style={{color:'#fff',fontSize:wp('4%'),textAlign:'center'}} >Order# {this.state.data.id} </Text>
                    <Text style={{color:'#fff',fontSize:wp('4%'),textAlign:'center'}} >{this.state.data.updated_at}</Text>
                  </View>
                  :
                  <View>
                    <Text style={{color:'#fff',fontSize:wp('4%'),textAlign:'center'}} >طلب# {this.state.data.id} </Text>
                    <Text style={{color:'#fff',fontSize:wp('4%'),textAlign:'center'}} >{this.state.data.updated_at}</Text>
                  </View>

                }
                <View/>

            </View>
          </View>
        </LinearGradient>

        <ScrollView>
          <View style={{
            marginHorizontal:wp('2%'),
            marginTop:hp('3%'),
            // borderWidth:1,
            borderColor:DarkGrey
          }}>
            

           


          </View>

          <View style={{
            marginHorizontal:wp('2%'),
            marginTop:hp('3%'),
            // borderWidth:1,
            borderColor:DarkGrey
          }}>
            <View style={{
              // borderBottomWidth:1,
              paddingHorizontal:wp('1%'),
              paddingVertical:hp('1%'),
              borderColor:Grey,
              backgroundColor:'rgba(95, 180, 250, 0.5)'

            }}>
              {this.state.language == 'eng' ? 
                <View style={{
                  flexDirection:'row',
                  justifyContent:'space-between'
                }}>
                  <Text style={{
                    color:DarkGrey,
                    fontSize:wp('4.5%'),
                    fontWeight:'bold'
                  }}>
                    Order Details
                  </Text>

                  

                </View>
              :
                <View style={{
                  flexDirection:'row',
                  justifyContent:'space-between'
                }}>
                  <Text style={{
                    color:DarkGrey,
                    fontSize:wp('4.5%'),
                    fontWeight:'bold'
                  }}>
                    تفاصيل الطلب
                  </Text>

                </View>
                
              }
            </View>

            
            <FlatList
              data={items}
              extraData={this.state}
              keyExtracstor={(item, index) => `${index}`}
              renderItem={this.renderFields}
              
            />



          </View>
        </ScrollView>


        <View style={{padding:hp('1%')}}/>
        <View style={{
          paddingVertical:hp('3%'),
          marginBottom:hp('2%')
        }}>
          {this.state.data.status == '6' ? 

            <TouchableOpacity
              onPress={()=>{this.cooking()}}
              style={{
                backgroundColor:LightBlue,
                alignItems:'center',
                paddingVertical:hp('1%'),
                borderRadius:5,
                marginHorizontal:wp('10%')
              }} 
            >
              {this.state.language == 'eng' ?
                <Text style={{
                  color:'#fff',
                  fontSize:wp('4%'),
                  fontWeight:"bold"
                }}>
                  Cooking
                </Text>
                :
                <Text style={{
                  color:'#fff',
                  fontSize:wp('4%'),
                  fontWeight:"bold"
                }}>
                طبخ
                </Text>
              }

            </TouchableOpacity>
          :
            <TouchableOpacity
                onPress={()=>{this.cooked()}}
                style={{
                  backgroundColor:LightBlue,
                  alignItems:'center',
                  paddingVertical:hp('1%'),
                  borderRadius:5,
                  marginHorizontal:wp('10%')
                }} 
            >
              {this.state.language == 'eng' ?
                <Text style={{
                  color:'#fff',
                  fontSize:wp('4%'),
                  fontWeight:"bold"
                }}>
                  Cooked
                </Text>
                :
                <Text style={{
                  color:'#fff',
                  fontSize:wp('4%'),
                  fontWeight:"bold"
                }}>
                  مطبوخ
                </Text>
              }

            </TouchableOpacity>
          }
        </View>

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
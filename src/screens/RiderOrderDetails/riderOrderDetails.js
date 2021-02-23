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

var orderItems=null;
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
    const order = this.props.navigation.getParam('item');
    console.log('item--->',order);
    this.setState({data:order});
    orderItems=order.orders_item;

    AsyncStorage.getItem('language')
      .then(language => {
          
          if(language != null ){
            this.setState({language:language})
            console.log(language)
          }
        });
  }

  call(number){

      if (Platform.OS === 'ios') {
      number = 'telprompt:${'+number+'}';
      }
      else {
      number = 'tel:${'+number+'}'; 
      }

      Linking.openURL(number);
  }

  message(number){
    Linking.openURL('sms:'+number);
  }

  // map(){
  //   var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
  //   var url = scheme + `${33.65017},${73.0777019}`;
  //   Linking.openURL(url);
  // }
  
  renderFields = ({ item, index }) => {
  
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


          </View>

    );
  };

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
            <View style={{
              // borderBottomWidth:1,
              paddingHorizontal:wp('1%'),
              paddingVertical:hp('1%'),
              borderColor:Grey,
              backgroundColor:'rgba(95, 180, 250, 0.5)'

            }}>
              {this.state.language == 'eng' ? 
                <Text style={{
                  color:DarkGrey,
                  fontSize:wp('4.5%'),
                  fontWeight:'bold'
                }}>
                  Delivery : Customer Details
                </Text>
              :
                <Text style={{
                  color:DarkGrey,
                  fontSize:wp('4.5%'),
                  fontWeight:'bold'
                }}>
                  توصيل : تفاصيل العميل
                </Text>
              }
            </View>

            <View style={{
              borderBottomWidth:1,
              paddingVertical:hp('1%'),
              borderColor:LightGrey,
              borderRightWidth:1,
              borderLeftWidth:1,
              paddingHorizontal:wp('1%')
            }}>
              {this.state.language == 'eng' ?
                <View 
                  style={{
                    flexDirection:'row',
                    paddingVertical:hp('1%'),
                  }}>

                  <Icon 
                    name={"account"}
                    size={wp('5%')}
                    color={LightBlue}
                  />

                  <Text style={{
                    color:DarkGrey,
                    fontSize:wp('4%'),
                    marginLeft:wp('3%')
                  }}>
                    {this.state.data.customer_name}
                  </Text>
                </View>
              :
                <View 
                  style={{
                    flexDirection:'row',
                    paddingVertical:hp('1%'),
                    justifyContent:'flex-end'

                  }}>

                  <Text style={{
                    color:DarkGrey,
                    fontSize:wp('4%'),
                    marginRight:wp('3%')
                  }}>
                    {this.state.data.customer_name}
                  </Text>

                  <Icon 
                    name={"account"}
                    size={wp('5%')}
                    color={LightBlue}
                  />
                </View>
              } 

              {this.state.language == 'eng' ?
                <View 
                  style={{
                    flexDirection:'row',
                    paddingVertical:hp('1%'),
                  }}>

                  <Icon 
                    name={"phone"}
                    size={wp('5%')}
                    color={Green}
                  />

                  <Text style={{
                    color:DarkGrey,
                    fontSize:wp('4%'),
                    marginLeft:wp('3%')
                  }}>
                    {this.state.data.customer_number}
                  </Text>
                </View>
              :
                <View 
                  style={{
                    flexDirection:'row',
                    paddingVertical:hp('1%'),
                    justifyContent:'flex-end'

                  }}>

                  <Text style={{
                    color:DarkGrey,
                    fontSize:wp('4%'),
                    marginRight:wp('3%')
                  }}>
                    {this.state.data.customer_number}
                  </Text>

                  <Icon 
                    name={"phone"}
                    size={wp('5%')}
                    color={Green}
                  />
                </View>
              } 

              {this.state.language == 'eng' ?
                <View 
                  style={{
                    flexDirection:'row',
                    paddingVertical:hp('1%'),
                  }}>

                  <Icon1 
                    name={"location-sharp"}
                    size={wp('5%')}
                    color={LightRed}
                  />

                  <Text style={{
                    color:DarkGrey,
                    fontSize:wp('4%'),
                    marginLeft:wp('3%')
                  }}>
                    {this.state.data.location}
                  </Text>
                </View>
              :
                <View 
                  style={{
                    flexDirection:'row',
                    paddingVertical:hp('1%'),
                    justifyContent:'flex-end'

                  }}>

                  <Text style={{
                    color:DarkGrey,
                    fontSize:wp('4%'),
                    marginRight:wp('3%')
                  }}>
                    {this.state.data.location}
                  </Text>

                  <Icon1 
                    name={"location-sharp"}
                    size={wp('5%')}
                    color={LightRed}
                  />
                </View>
              }

              {this.state.language == 'eng' ?
                <View 
                  style={{
                    flexDirection:'row',
                    paddingVertical:hp('1%'),
                  }}>

                  <Icon 
                    name={"cash"}
                    size={wp('5%')}
                    color={LightBlue}
                  />

                  <Text style={{
                    color:DarkGrey,
                    fontSize:wp('4%'),
                    marginLeft:wp('3%'),
                  }}>
                    {this.state.data.payment_method}
                  </Text>
                </View>
              :
                <View 
                  style={{
                    flexDirection:'row',
                    paddingVertical:hp('1%'),
                    justifyContent:'flex-end'

                  }}>

                  <Text style={{
                    color:DarkGrey,
                    fontSize:wp('4%'),
                    marginRight:wp('3%')
                  }}>
                    الدفع عند الاستلام                  </Text>

                  <Icon 
                    name={"cash"}
                    size={wp('5%')}
                    color={LightBlue}
                  />
                </View>
              }


              <View style={{flexDirection:'row',marginTop:hp('1%'),justifyContent:'space-around',marginBottom:hp('1%')}}>

                  <TouchableOpacity 
                    onPress={()=>{this.call(this.state.data.customer_number)}}
                    style={{
                      backgroundColor:'#fff',
                      padding:wp('1%'),
                      paddingHorizontal:wp('5%'),
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
                        color:DarkGrey,
                        marginRight:wp('4%')
                      }}>
                        call
                      </Text>
                    :
                      <Text style={{
                        color:DarkGrey,
                        marginRight:wp('4%')
                      }}>
                        مكالمة
                      </Text>
                    
                    }
                    <Icon 
                      name={"phone"}
                      size={wp('5%')}
                      color={'#74db0d'}
                    />

                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    onPress={()=>{this.message(this.state.data.customer_number)}}
                    style={{
                      marginLeft:wp('4%'),
                      backgroundColor:'#fff',
                      padding:wp('1%'),
                      paddingHorizontal:wp('5%'),
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
                        color:DarkGrey,
                        marginRight:wp('4%')
                      }}>
                        sms
                      </Text>
                    :
                      <Text style={{
                        color:DarkGrey,
                        marginRight:wp('4%')
                      }}>
                        رسالة
                      </Text>
                    }

                    <Icon 
                      name={"message-text"}
                      size={wp('5%')}
                      color={'#d1db0f'}
                    />

                  </TouchableOpacity>

              </View>
            </View>

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
                <Text style={{
                  color:DarkGrey,
                  fontSize:wp('4.5%'),
                  fontWeight:'bold'
                }}>
                  Rider Details
                </Text>
              :
                <Text style={{
                  color:DarkGrey,
                  fontSize:wp('4.5%'),
                  fontWeight:'bold'
                }}>
                تفاصيل رايدر
                </Text>
              }
            </View>

            <View style={{
              borderBottomWidth:1,
              paddingVertical:hp('1%'),
              borderColor:LightGrey,
              borderRightWidth:1,
              borderLeftWidth:1,
              paddingHorizontal:wp('1%')
            }}>
              {this.state.language == 'eng' ?
                <View 
                  style={{
                    flexDirection:'row',
                    paddingVertical:hp('1%'),
                  }}>

                  <Icon 
                    name={"account"}
                    size={wp('5%')}
                    color={LightBlue}
                  />

                  <Text style={{
                    color:DarkGrey,
                    fontSize:wp('4%'),
                    marginLeft:wp('3%')
                  }}>
                    {this.state.data.rider_name}
                  </Text>
                </View>
              :
                <View 
                  style={{
                    flexDirection:'row',
                    paddingVertical:hp('1%'),
                    justifyContent:'flex-end'

                  }}>

                  <Text style={{
                    color:DarkGrey,
                    fontSize:wp('4%'),
                    marginRight:wp('3%')
                  }}>
                    {this.state.data.rider_name}
                  </Text>

                  <Icon 
                    name={"account"}
                    size={wp('5%')}
                    color={LightBlue}
                  />
                </View>
              } 

              {this.state.language == 'eng' ?
                <View 
                  style={{
                    flexDirection:'row',
                    paddingVertical:hp('1%'),
                  }}>

                  <Icon 
                    name={"phone"}
                    size={wp('5%')}
                    color={Green}
                  />

                  <Text style={{
                    color:DarkGrey,
                    fontSize:wp('4%'),
                    marginLeft:wp('3%')
                  }}>
                    {this.state.data.rider_number}
                  </Text>
                </View>
              :
                <View 
                  style={{
                    flexDirection:'row',
                    paddingVertical:hp('1%'),
                    justifyContent:'flex-end'

                  }}>

                  <Text style={{
                    color:DarkGrey,
                    fontSize:wp('4%'),
                    marginRight:wp('3%')
                  }}>
                    {this.state.data.rider_number}
                  </Text>

                  <Icon 
                    name={"phone"}
                    size={wp('5%')}
                    color={Green}
                  />
                </View>
              } 

              

              <View style={{flexDirection:'row',marginTop:hp('1%'),justifyContent:'space-around',marginBottom:hp('1%')}}>

                  <TouchableOpacity 
                    onPress={()=>{this.call(this.state.data.rider_number)}}
                    style={{
                      backgroundColor:'#fff',
                      padding:wp('1%'),
                      paddingHorizontal:wp('5%'),
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
                        color:DarkGrey,
                        marginRight:wp('4%')
                      }}>
                        call
                      </Text>
                    :
                      <Text style={{
                        color:DarkGrey,
                        marginRight:wp('4%')
                      }}>
                        مكالمة
                      </Text>
                    
                    }
                    <Icon 
                      name={"phone"}
                      size={wp('5%')}
                      color={'#74db0d'}
                    />

                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    onPress={()=>{this.message(this.state.data.rider_number)}}
                    style={{
                      marginLeft:wp('4%'),
                      backgroundColor:'#fff',
                      padding:wp('1%'),
                      paddingHorizontal:wp('5%'),
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
                        color:DarkGrey,
                        marginRight:wp('4%')
                      }}>
                        sms
                      </Text>
                    :
                      <Text style={{
                        color:DarkGrey,
                        marginRight:wp('4%')
                      }}>
                        رسالة
                      </Text>
                    }

                    <Icon 
                      name={"message-text"}
                      size={wp('5%')}
                      color={'#d1db0f'}
                    />

                  </TouchableOpacity>

              </View>
            </View>

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

                  <Text style={{
                    color:DarkGrey,
                    fontSize:wp('3.5%'),
                  }}>
                    Total Bill:   {this.state.data.bill} SR
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

                  <Text style={{
                    color:DarkGrey,
                    fontSize:wp('3.5%'),
                  }}>
                    إجمالي الفاتورة:   {this.state.data.totalBill} SR
                  </Text>
                </View>
                
              }
            </View>

            
            <FlatList
              data={orderItems}
              extraData={this.state}
              keyExtracstor={(item, index) => `${index}`}
              renderItem={this.renderFields}
              
            />



          </View>
        </ScrollView>
        <View style={{padding:hp('1%')}}/>
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
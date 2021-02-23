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
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {LightRed,DarkGrey,Blue, Pink, Grey, LightGrey, Brown, Cream, Orange,LightBlue} from '../../utils/Constants';
import {MyOrders, Signin, name, email, password, phone, Already_have_account_Login as ha, Dont_have_account_signup as dha} from '../../utils/Constants';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';

import Caller from "../../configurations/Caller";

const orders = [
  // {
  //   id:'2',
  //   location:'shamsabad murre road rwp',
  //   price:'20',
  //   billStatus_eng:'pending',
  //   billStatus_arb:'قيد الانتظار',

  // },
  // {
  //   id:'3',
  //   location:'5th avnue',
  //   price:'30',
  //   billStatus_eng:'paid',
  //   billStatus_arb:'دفع',

  // }
];

const cooking = [
  // {
  //   id:'2',
  //   location:'shamsabad murre road rwp',
  //   price:'20',
  //   billStatus_eng:'pending',
  //   billStatus_arb:'قيد الانتظار',

  // },
  // {
  //   id:'5',
  //   location:'6th road',
  //   price:'20',
  //   billStatus_eng:'pending',
  //   billStatus_arb:'قيد الانتظار',

  // },
 
];

const ready = [
  {
    rider_name:'Ahsan',
    id:'2',
    location:'sadder',
    price:'20',
    billStatus_eng:'pending',
    billStatus_arb:'قيد الانتظار',

  },
 
];
export default class Home extends Component {

  constructor(props) {
    var lan='';

    AsyncStorage.getItem('language')
      .then(language => {
          
          if(language != null ){
            lan=language;
          }
        });
      console.log(lan);

    super(props);
    this.state = {
      language: 'eng',
      selectedTab:'new',
      orders:orders,
      waitingorders:orders,
      cooking:cooking,
      ready:ready,
      cooked:[]
    };
    
  }



 
  componentDidMount () {
    console.log('did mount');


    AsyncStorage.getItem('language')
      .then(language => {
          
          if(language != null ){
            this.setState({language:language})
            console.log(language)
          }
        });
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);


    Caller.callServer("getNewOrders","GET", [1])
      .then( response  => {
        return response.json()
      })
      .then ( data => {
        this.setState({orders:data});

        console.log("response-->",data[0].orders_item[0]);
      });

      Caller.callServer("getWaitingOrders","GET", [1])
      .then( response  => {
        return response.json()
      })
      .then ( data => {
        this.setState({waitingorders:data});

      });


      Caller.callServer("getCookingOrders","GET", [1,1])
      .then( response  => {
        return response.json()
      })
      .then ( data => {
        this.setState({cooking:data});

        console.log("thisresponse-->",data);
      });

      Caller.callServer("getCookedOrders","GET", [1,1])
      .then( response  => {
        return response.json()
      })
      .then ( data => {
        this.setState({cooked:data});

        // console.log("response-->",data);
      });

      Caller.callServer("getRiderAssignedOrders","GET", [1,1])
      .then( response  => {
        return response.json()
      })
      .then ( data => {
        this.setState({ready:data});

        // console.log("response-->",data);
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
  spring() {
    this.setState({backClickCount: 1}, () => {
      ToastAndroid.show('Back press twice to exit', ToastAndroid.SHORT);
      setTimeout(() => {this.setState({backClickCount: 0})}, 1000);
      });
  }
 
  renderFields = ({ item, index }) => {
    const id=item.id;
    const location=item.location;
    console.log("location---->",location);
    return (

      <TouchableOpacity 
        onPress={()=>this.props.navigation.navigate('OrderDetails',{location,location})}
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
            <Icon1 
              name={"location-on"}
              size={wp('4.5%')}
              color={Cream}
            />

            <Text style={{color:DarkGrey, fontSize:wp('3.5%'),textAlign:'center',marginLeft:wp('1%')}}>
              {item.location}
            </Text>
          </View>

          {this.state.language == 'eng' ? 
          <View style={{flexDirection:'row',marginHorizontal:wp('4%'),paddingVertical:wp('1%')}}>


            <Text 
              style={{color:DarkGrey,
               fontSize:wp('3.5%'),
               textAlign:'center',
               marginLeft:wp('1%'),
               borderRightWidth:1,
               borderColor:LightGrey,
               paddingRight:wp('1%')
             }}>
              Bill Status
            </Text>

            <Text style={{color:DarkGrey, fontSize:wp('3.5%'),textAlign:'center',marginLeft:wp('1%')}}>
              {item.billStatus_eng}
            </Text>
          </View>
          :
          <View style={{flexDirection:'row',marginHorizontal:wp('4%'),paddingVertical:wp('1%')}}>

            <Text style={{color:DarkGrey, fontSize:wp('3.5%'),textAlign:'center',marginLeft:wp('1%')}}>
              {item.billStatus_arb}
            </Text>
            <Text 
              style={{color:DarkGrey,
               fontSize:wp('3.5%'),
               textAlign:'center',
               marginLeft:wp('1%'),
               borderLeftWidth:1,
               borderColor:LightGrey,
               paddingLeft:wp('1%')
             }}>
              حالة الفاتورة
            </Text>

          </View>
          }

        </View>
        <View style={{
          alignSelf:'flex-end',
          flex:1,
          justifyContent:'flex-end',
          alignItems:'flex-end'
        }}> 
          <Text 
            style={{
              color:DarkGrey,
              fontSize:wp('4%')
            }}>
            {item.price} SR
          </Text>
        </View>
      </TouchableOpacity>

    );
  };

  rendercooking = ({ item, index }) => {
    return (

      <TouchableOpacity 
        onPress={()=>this.props.navigation.navigate('OrderDetails',{item,item})}
        style={{
          paddingHorizontal:hp('1%'),
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
          // width:wp('16%'),
          borderRadius:5
        }}>
          <Icon 
            name={"chef-hat"}
            size={wp('10%')}
            color={LightBlue}
          />
        </View>

        <View style={{
          marginLeft:wp('5%')
        }}>
          {this.state.language == 'eng' ?
            <Text style={{
              fontSize:wp('4%'),
              color:DarkGrey
            }}>
              Order # {item.id}
            </Text>
          :
            <Text style={{
              fontSize:wp('4%'),
              color:DarkGrey
            }}>
              طلب # {item.id}
            </Text>
          }

          <View style={{
            flexDirection:'row',
            marginTop:hp('1%')
          }}>
            <Icon1 
              name={"location-on"}
              size={wp('5%')}
              color={LightRed}
            />
            <Text style={{
              fontSize:wp('4%'),
              color:DarkGrey,
              marginLeft:wp('1%')
            }}>
              {item.location}
            </Text>

          </View>
        </View>

        <View style={{
          flexDirection:'row-reverse',
          flex:1,
          paddingLeft:wp('2%'),
          alignItems:'center'
        }}>
        <Icon2 
              name={"right"}
              size={wp('4%')}
              color={Cream}
            />
        </View>
      </TouchableOpacity>

    );
  };

  renderready = ({ item, index }) => {
    return (

      <TouchableOpacity 
        onPress={()=>this.props.navigation.navigate('RiderOrderDetails',{item,item})}
        style={{
          paddingHorizontal:hp('1%'),
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
          // width:wp('16%'),
          borderRadius:5
        }}>
          <Icon 
            name={"car-hatchback"}
            size={wp('10%')}
            color={LightBlue}
          />
        </View>

        <View style={{
          marginLeft:wp('5%')
        }}>
          {this.state.language == 'eng' ?
            <Text style={{
              fontSize:wp('4%'),
              color:DarkGrey
            }}>
              Order # {item.id}
            </Text>
          :
            <Text style={{
              fontSize:wp('4%'),
              color:DarkGrey
            }}>
              طلب # {item.id}
            </Text>
          }

          {this.state.language == 'eng' ?
            <View style={{
              flexDirection:'row',
              marginTop:hp('1%')
            }}>
             
              <Text style={{
                fontSize:wp('4%'),
                color:DarkGrey,
                marginLeft:wp('1%'),
                paddingRight:wp('2%'),
                borderRightWidth:1,
                borderColor:LightGrey
              }}>
                Rider
              </Text>

              <Text style={{
                fontSize:wp('4%'),
                color:DarkGrey,
                marginLeft:wp('1%'),
                
              }}>
                {item.rider_name}
              </Text>

            </View>
          :
            <View style={{
              flexDirection:'row-reverse',
              marginTop:hp('1%')
            }}>
             
              <Text style={{
                fontSize:wp('4%'),
                color:DarkGrey,
                marginLeft:wp('1%'),
                paddingLeft:wp('2%'),
                borderLeftWidth:1,
                borderColor:LightGrey
              }}>
                رايدر
              </Text>

              <Text style={{
                fontSize:wp('4%'),
                color:DarkGrey,
                marginLeft:wp('1%'),
                
              }}>
                {item.rider_name}
              </Text>

            </View>
          }

        </View>

        <View style={{
          flexDirection:'row-reverse',
          flex:1,
          paddingLeft:wp('2%'),
          alignItems:'center'
        }}>
        <Icon2 
              name={"right"}
              size={wp('4%')}
              color={Cream}
            />
        </View>
      </TouchableOpacity>

    );
  };

  render() {
    return (
      <View style={styles.container}>
          <NavigationEvents onDidFocus={() => this.componentDidMount()} />
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
                  onPress={()=>{this.props.navigation.navigate('Account')}}
                  style={{
                    justifyContent:'center',
                    // backgroundColor:'pink',
                    // padding:wp('1%')
                  }}
                >
                  <Icon 
                    style={{alignSelf:'center'}}
                    name={"account"}
                    size={wp('6.5%')}
                    color={"#fff"}
                  />
                </TouchableOpacity>
                {this.state.language=="eng" ? 
                  <Text style={{fontWeight: 'bold',color:'#fff',fontSize:wp('5%')}} >  Orders </Text>
                  :
                  <Text style={{fontWeight: 'bold',color:'#fff',fontSize:wp('5%')}} > {MyOrders} </Text>

                }

                <TouchableOpacity
                  style={{
                    justifyContent:'center',
                    
                  }}
                  onPress={()=>{this.componentDidMount()}}
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
        

        <View style={{flexDirection:'row',marginVertical:hp('1.5%')}}>

          <TouchableOpacity 
            onPress={()=>{this.setState({selectedTab:'new'})}}

            style={{
              flex:1,
              alignItems:'center',
              paddingVertical:hp('1%'),
              borderBottomWidth:this.state.selectedTab == 'new' ? 3 : 1,
              borderColor:this.state.selectedTab == 'new' ? Blue : Cream
          }}>
            {this.state.language == 'eng' ?
            <Text style={{fontSize:wp('5%'),color:Cream}}>New</Text>
            :
            <Text style={{fontSize:wp('5%'),color:Cream}}>جديد</Text>
            }
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={()=>{this.setState({selectedTab:'waiting'})}}

            style={{
              flex:1,
              alignItems:'center',
              paddingVertical:hp('1%'),
              borderBottomWidth:this.state.selectedTab == 'waiting' ? 3 : 1,
              borderColor:this.state.selectedTab == 'waiting' ? Blue : Cream
          }}>
            {this.state.language == 'eng' ?
            <Text style={{fontSize:wp('5%'),color:Cream}}>Waiting</Text>
            :
            <Text style={{fontSize:wp('5%'),color:Cream}}>انتظار</Text>
            }
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={()=>{this.setState({selectedTab:'cooking'})}}

          style={{
            flex:1,
            alignItems:'center',
            paddingVertical:hp('1%'),
            borderBottomWidth:this.state.selectedTab == 'cooking' ? 3 : 1,
            borderColor:this.state.selectedTab == 'cooking' ? Blue : Cream

          }}>
            {this.state.language == 'eng' ?
            <Text style={{fontSize:wp('5%'),color:Cream}}>Cooking</Text>
            :
            <Text style={{fontSize:wp('5%'),color:Cream}}>طبخ</Text>
            }
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={()=>{this.setState({selectedTab:'cooked'})}}

          style={{
            flex:1,
            alignItems:'center',
            paddingVertical:hp('1%'),
            borderBottomWidth:this.state.selectedTab == 'cooked' ? 3 : 1,
            borderColor:this.state.selectedTab == 'cooked' ? Blue : Cream
          }}>
            {this.state.language == 'eng' ?
            <Text style={{fontSize:wp('5%'),color:Cream}}>Cooked</Text>
            :
            <Text style={{fontSize:wp('5%'),color:Cream}}>جديد</Text>
            }
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={()=>{this.setState({selectedTab:'Ready'})}}

            style={{
            flex:1,
            alignItems:'center',
            paddingVertical:hp('1%'),
            borderBottomWidth:this.state.selectedTab == 'Ready' ? 3 : 1,
            borderColor:this.state.selectedTab == 'Ready' ? Blue : Cream
          }}>
            {this.state.language == 'eng' ?
            <Text style={{fontSize:wp('5%'),color:Cream}}>Rider</Text>
            :
            <Text style={{fontSize:wp('5%'),color:Cream}}>رايدر</Text>

            }
          </TouchableOpacity>

        </View>
      
        <ScrollView style={{}}>
          <FlatList
            data={this.state.selectedTab == 'new' ? this.state.orders : this.state.selectedTab == 'waiting' ? this.state.waitingorders : 
              this.state.selectedTab == 'cooking' ? this.state.cooking :  this.state.selectedTab == 'cooked' ? this.state.cooked :  this.state.ready}
            extraData={this.state}
            keyExtracstor={(item, index) => `${index}`}
            renderItem={this.state.selectedTab == 'Ready' ? 
              this.renderready : this.rendercooking}
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
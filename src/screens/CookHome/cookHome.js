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
 
];



const newOrders = [
  
 
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
      newOrders:newOrders,
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


    // Caller.callServer("getNewOrders","GET", [1])
    //   .then( response  => {
    //     return response.json()
    //   })
    //   .then ( data => {
    //     this.setState({orders:data});

    //     console.log("response-->",data);
    //   });

    //   Caller.callServer("getMyOrders","GET", [1])
    //   .then( response  => {
    //     return response.json()
    //   })
    //   .then ( data => {
    //     this.setState({cooking:data});

    //     // console.log("response-->",data);
    //   });

      Caller.callServer("getCookOrders","GET", [1])
      .then( response  => {
        return response.json()
      })
      .then ( data => {
        this.setState({orders:data});

        console.log("response-->",data);
      });

      Caller.callServer("getWaitingOrders","GET", [1])
      .then( response  => {
        return response.json()
      })
      .then ( data => {
        this.setState({newOrders:data});
        

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
 
 

  rendercooking = ({ item, index }) => {

    return (

      <TouchableOpacity 
        onPress={()=>this.props.navigation.navigate('CookOrderDetails',{item,item})}
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
              name={"access-time"}
              size={wp('4%')}
              color={DarkGrey}
              style={{alignSelf:'center'}}
            />
            <Text style={{
              fontSize:wp('4%'),
              color:DarkGrey,
              marginLeft:wp('1%'),
              textAlign:'center'
            }}>
              {item.updated_at}
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
                  <Text style={{fontWeight: 'bold',color:'#fff',fontSize:wp('5%')}} >  Kitchen </Text>
                  :
                  <Text style={{fontWeight: 'bold',color:'#fff',fontSize:wp('5%')}} > مطبخ </Text>

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


          

        </View>
      
        <ScrollView style={{}}>
          <FlatList
            data={this.state.selectedTab == 'new' ? this.state.newOrders : this.state.orders}
            extraData={this.state}
            keyExtracstor={(item, index) => `${index}`}
            renderItem={this.rendercooking}
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
import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	SafeAreaView,
	TouchableOpacity,
	FlatList
} from 'react-native';
import { Button,Icon } from 'react-native-elements';
import MyBookingIsLogin from '../../components/MyBookingIsLogin';


const booking = [
	{
		idBooking:1,
		package_name:'Trip Wisata Yogyakarta',
		package_description:'blakbkawakoskawoadkwokdaowdkaowdkwadk;awdoanawodaowdawd',
		package_price:'500.000',
		package_image:'https://lh4.googleusercontent.com/proxy/OYnKWLpVEjrt4BtPlG1IJ1BFCqPCs4ONcJrfrb9jfWNaXnSBgwm61-x9L52LMsD6yhwk0jpmuQ2KzI88o4qWfzkAdP7xga5lPcSq4GwlLBWOvjCTBG48htyAu8qLUato79vB4iYrPkggALQ4Z9BSTMcdyUo=w357-h238-k-no',
		date_start:'07/08/2019'
	}
]


class Booking extends Component {
	constructor(props){
		super(props);
		this.state={
			isLogin:true,
			//bookingData:booking
			bookingData:[]
		}
	}

	BookedList = ({item,index}) => (
		
			<View style	={{flex:1,backgroundColor:'#000',flexDirection:'row'}}>
			<Image
			source={{uri:item.package_image}}
			style={{height:100,width:50}}
			/>
			<Text>{item.package_name}</Text>
			

			</View>
		
	)

	render () {
		//    console.warn(this.state.bookingData)
		return (
			<View style={{flex:1}}>
			<View style={{ width: '100%', height: '10%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					 <View style={{margin: 10,flexDirection:'row'}}>
					 <TouchableOpacity
					 onPress={() => alert('goBack')}
					 >
					 <Icon
						 name='arrowleft'
						 type='antdesign'
						 color='#808080'
						 size={25} />
						 </TouchableOpacity>
					 </View>
					 <View>
					 <Text>My Bookings</Text>
					 </View>
					 <View style={{margin: 10,flexDirection:'row'}}>
					 <Icon 
						 name='shoppingcart'
						 type='antdesign'
						 color='#808080'
						 size={25} />
						 </View>
				 </View>
			<View style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center'
			}}>
			{this.state.isLogin === false ? 
				<MyBookingIsLogin
				title={'My Bookings'}
				description={'Login to your check orders'}/>
				:
				this.state.bookingData.length == 0 ?
				<View>
				<Image
				source={require('../../assets/list.png')}
				style={{alignSelf:'center',width:80,height:80,marginBottom:15}}
				/>
				 <Text
				 style={{fontSize:17,alignSelf:'center'}}
				 >No booking..yet</Text>
				<Button
				containerStyle={{alignSelf:'center'}}
				buttonStyle={{backgroundColor:'#EF4453',width:120,marginTop:10}}
				title='Explore Now'
				/>
				</View>
				:
				
				<View style={{flex:1}}>
				 <FlatList
				 keyExtractor={(item) => {item.idBooking.toString()}}
				 data={this.state.bookingData}
				 renderItem={this.BookedList}
				/>
				</View>

				}
			
			</View>
			</View>
		)
	}
}



export default Booking;
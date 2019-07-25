import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image
}
from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
const width = Dimensions.get('window').width
const widthImg = width * 0.94

export default class Testimonial extends Component {
    constructor(props){
        super(props);
        this.state={
            testimonial:[
                {
                    id : 1,
                    image_url:'https://cdn.popbela.com/content-images/post/20181118/pantai-nglambor-gunung-kidul-3-f248daf01f0a25c8f3e28da518e293c3_750x500.jpg',
                    name:'Annonimous1',
                    title:'Amazin Rafting',
                    caption:'Gila parah Liburan Terbaik bersama Nomadic'
                },
                {
                    id : 2,
                    image_url:'https://cdn.popbela.com/content-images/post/20181118/pantai-nglambor-gunung-kidul-3-f248daf01f0a25c8f3e28da518e293c3_750x500.jpg',
                    name:'Annonimous2',
                    title:'Amazin Rafting',
                    caption:'Gila parah Liburan Terbaik bersama Nomadic'
                },
                {
                    id : 3,
                    image_url:'https://cdn.popbela.com/content-images/post/20181118/pantai-nglambor-gunung-kidul-3-f248daf01f0a25c8f3e28da518e293c3_750x500.jpg',
                    name:'Annonimous3',
                    title:'Amazin Rafting',
                    caption:'Gila parah Liburan Terbaik bersamabersamabersamabersama Nomadic'
                },
                {
                    id : 4,
                    image_url:'https://cdn.popbela.com/content-images/post/20181118/pantai-nglambor-gunung-kidul-3-f248daf01f0a25c8f3e28da518e293c3_750x500.jpg',
                    name:'Annonimous2',
                    title:'Amazin Rafting',
                    caption:'Gila parah Liburan Terbaik bersama Nomadic'
                },
                {
                    id : 5,
                    image_url:'https://cdn.popbela.com/content-images/post/20181118/pantai-nglambor-gunung-kidul-3-f248daf01f0a25c8f3e28da518e293c3_750x500.jpg',
                    name:'Annonimous3',
                    title:'Amazin Rafting',
                    caption:'Gila parah Liburan Terbaik bersamabersamabersamabersama Nomadic'
                },
            ]
        }
    }

    renderTestimoni(item) {
		return (
			<View style={styles.card}>
                <Image style={styles.image} source={{uri: item.image_url}}/>
                <Text style={styles.title} numberOfLines={1}> {item.title} </Text>
				<Text style={styles.caption} numberOfLines={2}> {item.caption} </Text>
                <View style={styles.cardDecoration}>
                    <View style={styles.tape}/>
                    <View style={{height:width*0.64}}/>
                    <View style={styles.tape}/>
                </View>
			</View>
		);
	}
    render(){
        return(
            <View style={styles.container}>
                <View style={{flex:3, justifyContent:'center', backgroundColor:'#FAFAFA'}}>
                    <Text style={{marginLeft: 20, marginTop:20,fontSize:20, color:'#666', fontWeight:'500'}}>Experiences</Text>
                        <Carousel
                            ref={ ref => this.carouselRef = ref }
                            data={ this.state.testimonial }
                            renderItem={ ({ item }) => this.renderTestimoni(item) }
                            onSnapToItem={ i => this.setState({ activeTab : i }) }
                            sliderWidth={ width }
                            itemWidth={ width*0.6 }
                            slideStyle={{paddingHorizontal:10}}
                            inactiveSlideOpacity={ 0.6 }
                            inactiveSlideScale={ 1 }
                        />
                </View>   
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:15,
        height:width+30,
        justifyContent:'center'
    },
    card: {
        margin:50,
        height: width * 0.6,
        width: width * 0.5,
        borderRadius: 3,
        backgroundColor:'#FFF',
        padding:10,
        alignSelf: 'center',
        elevation:4,
        alignItems:'center',
        justifyContent:'center',
        transform: [{ rotate: '10deg' }]
    },
    image:{
        height:'80%',
        width:'100%',
    },
    title:{
        fontSize:13,
        alignSelf:'flex-start',
    },
    caption:{
        fontSize:10,
        marginRight:10
    },
    cardDecoration:{
        position:'absolute',
        transform: [{ rotate: '-37deg' }]
    },
    tape:{
        backgroundColor:'#f6ffba',
        height:(width/5)/5,
        width:width/5,
        elevation:1

    }
});
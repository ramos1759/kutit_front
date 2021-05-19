import React, { useState } from 'react'
import { StyleSheet, Text, View , ScrollView, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import { Button, Card, ListItem } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

{/* <View style={{ width: vw(100), height: vh(100) }}>
  ...
<View></View> */}


function HairdresserList(props) {

    const [review, setReview] = useState(0);

    const stars = [1,2,3,4,5].map((star, i) => {
        if(review > i) {
            return(
                <FontAwesome 
                    name="star" 
                    size={24}
                    value={i} 
                    onPress={() => {
                        setReview(i+1); 
                    }} 
                    color="black"
                    style={review > i ? { color: '#f1c40f' } : null} 
                    key={i}
                />)
        } else {
            return(
                <FontAwesome 
                        name="star-o" 
                        size={24} 
                        color="black" 
                        value={i} 
                        onPress={() => {
                            setReview(i+1); 
                        }}
                        key={i} 
                />)
        }    
    })

    const ratings = [1,2,3,4,5].map((star, i) => {
        return(
            <FontAwesome 
                name="star" 
                size={16} 
                color="black"
                style={{ color: '#f1c40f' }} 
                key={i}
            />)
    })

    const hairdressers = props.professionnels.map((pro, i) => {
        return(
            <TouchableOpacity
                key={i}
                onPress={() => {
                    props.getDetails(pro);
                    props.navigation.navigate('HairdresserDetails', { screen: 'HairdresserDetails' });
                }}   
            >
            <View 
                key={i} 
                style={styles.user}
            >
                <Ionicons 
                    name="person-circle-sharp" 
                    size={24} color="black" 
                    style={styles.avatar}
                />
                <View>
                    <Text>{`${pro.prenom} ${pro.nom}`}</Text>
                    <Text>{pro.statut}</Text>
                </View>
                <View style={styles.rating}>
                    {ratings}
                </View>
            </View> 
            </TouchableOpacity>
        );
    });

    console.log(props.professionnels);
    
    return (
        
            <ScrollView 
                style={styles.scrollview}
                contentContainerStyle={{ alignItems: 'center' }}
            > 
            <Text style={{ textAlign: 'center' }}>HairdresserList</Text>
            <View style={{ flex: 1 }}>
                { hairdressers }
            </View>
            <View style={{ flexDirection: 'row', margin: 40 }}>
                { stars }
            </View>
            <Button
                title='Details'
                onPress={() => {
                    props.navigation.navigate('HairdresserDetails', { screen: 'HairdresserDetails' });
                }}
            />
            </ScrollView>
        
        
    )
}

function mapStateToProps(state) {
    return { 
        professionnels : state.professionnels
    }
}

function mapDispatchToProps(dispatch){
    return {
      getDetails: (proDetails) => {
        dispatch({ type:'get-details', proDetails: proDetails });
      }
    }
}
  
  export default connect(
    mapStateToProps, 
    mapDispatchToProps
  )(HairdresserList);


const styles = StyleSheet.create({
    scrollview: {
        flex: 1,
        marginTop: 80
    },
    user: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: vw(90),
        backgroundColor: "#FFF",
        margin: 5,
        borderRadius: 5,
        height: 50
    },
    avatar: {
        marginHorizontal: 50
    },
    rating: {
        flexDirection: 'row',
        margin: 'auto'
    }
});






// stars models

// const stars = [1,2,3,4,5].map((star, i) => {
//     return(
//     <FontAwesome 
//         name="star" 
//         size={24}
//         value={i} 
//         onPress={() => {
//             setReview(i+1); 
//         }} 
//         color="black"
//         style={review > i ? { color: '#f1c40f' } : null} 
//          />)
//     })
// const stars2 = [1,2,3,4,5].map((star, i) => {
//     return(<FontAwesome 
//         name="star-o" 
//         size={24} 
//         color="black" 
//         value={i} 
//         onPress={() => {
//             setReview(i+1); 
//         }} 
//         style={review > i ? { color: '#f1c40f' } : null}
//         />)
//     })

 //the best Model
// const stars3 = [1,2,3,4,5].map((star, i) => {
// if(review > i) {
// return(
// <FontAwesome 
//     name="star" 
//     size={24}
//     value={i} 
//     onPress={() => {
//         setReview(i+1); 
//     }} 
//     color="black"
//     style={review > i ? { color: '#f1c40f' } : null} 
// />)
// } else {
// return(
// <FontAwesome 
//         name="star-o" 
//         size={24} 
//         color="black" 
//         value={i} 
//         onPress={() => {
//             setReview(i+1); 
//         }} 
// />)
// }    
// })
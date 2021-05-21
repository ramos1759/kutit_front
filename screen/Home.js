import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView, DatePickerIOS } from 'react-native';
import { Button, CheckBox, Slider } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons'; 
import DatePicker from 'react-native-datepicker'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Feather } from '@expo/vector-icons';
import {connect} from 'react-redux';



import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const customer = <FontAwesome name="user" size={24} color="black"/>;

function Home(props) {
    const [currentLatitude, setCurrentLatitude] = useState(0);
    const [currentLongitude, setCurrentLongitude] = useState(0);
    const [date, setDate] = useState(new Date())
    const [barbershop, setBarbershop] = useState(false);
    const [distance, setDistance] = useState(5);
    const [proList, setProList] = useState([]);
    

// Geoloc Enabled
    useEffect(() => {
        async function askPermissions() {
            let {status} = await Permissions.askAsync(Permissions.LOCATION);
            if (status === 'granted') {
                Location.watchPositionAsync({distanceInterval: 10},
                    (location) => {
                        setCurrentLatitude(location.coords.latitude)
                        setCurrentLongitude(location.coords.longitude);
                    }
                );
            }
        }

        askPermissions();
    }, []);


// Fetch all Professionnels from db
    useEffect(() => {
        const call = async() => {

           // const response = await fetch('http://172.16.189.138:3000/search', {
                 const response = await fetch('http://192.168.1.3:3000/search', {

            //const response = await fetch('http://172.17.188.11:3000/search', {
            //const response = await fetch('http://172.17.188.11:3000/search', {

                method: 'POST',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                body: `latitude=${currentLatitude}&longitude=${currentLongitude}`
            });
            const data = await response.json();
            props.getHairdressers(data.professionnels);
        }
        call();
    }, []);

// Get independant or salon
    useEffect(() => {

        if(!barbershop){
            const freelanceCopy = props.professionnels.filter(e => e.statut != "independant");
            setProList(freelanceCopy);
            // getFreelance(freelanceCopy);
            props.getStatus("independant")
        } else {
            const barbershopCopy = props.professionnels.filter(e => e.statut != "salon");
            setProList(barbershopCopy);
            props.getStatus("salon");
            // getBarbershop(barbershopCopy);
        }
    }, [barbershop]);

    let markerPro = proList.map((pro, i) => {
        return <Marker key={i} pinColor="blue" coordinate={{ latitude: pro.latitude, longitude: pro.longitude }}
          prenom={pro.prenom}
          nom={pro.nom}
        />
      });

    // console.log('test', proList)


    return (
        <View style={{ flex: 1  }}>
            {/* <ScrollView 
                style={{flex: 1}}
            > */}
            <View style={{ margin: 40, marginTop: 75 }}>
                <Text style={{ textAlign: 'center', fontSize: 20}}
            >Bonjour Cantin, de quoi avez-vous envie aujourd'hui?</Text>
            </View>
            <View style={{ marginBottom: 40, alignItems: 'center'}}>
                <Text style={{ textAlign: 'center', marginBottom: 20 }}>vos disponibilites</Text>
                <DatePicker
                    customStyles={{
                       // dateTouchBody: {borderColor:"red", borderWidth:3},
                        //dateInput: {borderColor:"green", borderWidth:1},
                        //dateTouchBody:{ borderColor:"geen" }
                    }}
                    style={{width: 200}}
                    date={date}
                    mode="date"
                    placeholder="select date"
                    minDate="01-05-2021"
                    maxDate="01-05-2022"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(value) => {setDate(value)}}
                    // style={{ color: '#52796F' }}
                    format='DD-MM-YYYY'
                    // onPressDate={}
                    // onPressCancel={}
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <CheckBox
                    center
                    title='coiffeur a domicile'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={!barbershop}
                    onPress={() => {
                        setBarbershop(!barbershop);
                    }}
                    containerStyle={{ backgroundColor: 'transparent', border: 'none', width: '40%' }}
                    checkedColor='#52796F'
                />
                <CheckBox
                    center
                    title='au salon'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={barbershop}
                    onPress={() => {
                        setBarbershop(!barbershop);
                    }}
                    containerStyle={{ backgroundColor: 'transparent', border: 'none', width: '40%' }}
                    checkedColor='#52796F'
                />    
            </View>
            <View style={{ height: '35%' }}>
            <MapView
                style={{ height: '100%' }}
                region={{
                  latitude: currentLatitude,
                  longitude: currentLongitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                customMapStyle={{ alignself: 'center'}}
                scrollEnabled={true}
            >
                <Marker
                    key={"currentPos"}
                    pinColor="red"
                    title=""
                    description="I am here"
                    coordinate={{latitude: currentLatitude, longitude: currentLongitude}}
                />
                {markerPro}
            </MapView>
            </View>
            <View style={{ alignItems: 'center', marginTop: 40 }}>
                <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', width: '40%' }}>
                <Slider
                    value={distance}
                    onValueChange={(value) => setDistance(value)}
                    maximumValue={20}
                    minimumValue={0}
                    step={1}
                    thumbStyle={{ backgroundColor: '#52796F', width: 20, height: 20 }}
                    thumbTouchSize={{ width: 10, height: 10 }}
                />
                    <Text style={{ textAlign: 'center' }}>Distance: {distance}km</Text>
                </View>
                <Button
                    buttonStyle={{ backgroundColor: '#52796F', marginTop: 50 }}
                    containerStyle={{ width: 80 }}
                    title='trouver'
                    onPress={() => {
                        // handleSearch();
                        props.navigation.navigate('HairdresserList', { screen: 'HairdresserList' });
                    }}
                />
            </View>

            {/* <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae itaque vero iusto corporis ab tempore autem facere vitae recusandae voluptate reiciendis eum, totam esse dolor quaerat laboriosam, voluptas, praesentium omnis consequuntur modi ratione? Mollitia eos natus a quidem laudantium. Reiciendis excepturi omnis alias facilis enim cum accusamus aliquam doloribus dicta, dolorum exercitationem at commodi quae laboriosam consectetur repellendus minima, quisquam tempora eum facere praesentium. Tempora corrupti similique, facere ipsa assumenda, ipsam atque totam illo, provident sed non? Eveniet, sapiente quis vero assumenda recusandae libero similique cupiditate asperiores perferendis ipsum odit nostrum itaque! Aliquam velit ratione delectus dignissimos laudantium, nam similique iusto corrupti porro molestias magni? Saepe quas quibusdam voluptatum animi doloremque explicabo, in adipisci voluptates reprehenderit est! Rem, possimus sit deleniti illo fugit error est laboriosam ipsum maxime suscipit unde labore consectetur accusamus sapiente repudiandae cum distinctio eaque. Omnis, eligendi magnam? Commodi itaque dignissimos unde eius vero ipsam facilis repudiandae dolorem accusantium veritatis. Tempora tempore, temporibus aperiam iste rem consectetur molestiae deleniti delectus obcaecati? Molestias, cum. Tenetur quaerat saepe esse adipisci. Consequatur facilis debitis iste beatae ex ad temporibus. Distinctio molestiae hic consequuntur alias temporibus, quia recusandae modi odit accusamus iste quos provident nihil dicta id aliquid odio eligendi, earum vero! Beatae neque rerum esse dolores adipisci nostrum impedit reprehenderit necessitatibus nobis sint aspernatur facere rem consectetur ut, laudantium vitae totam, voluptas voluptates! Id aliquam pariatur nesciunt consectetur facere error, blanditiis corporis, sequi consequuntur ullam doloribus? Magnam, ad distinctio alias officia labore est nesciunt ex! Dignissimos incidunt eaque veniam provident possimus natus consequuntur quas molestiae minima deserunt tempore ea voluptatem magni consequatur alias, similique nobis sint. Commodi alias fuga optio sed amet recusandae ducimus, quae eaque quia nemo sit nam dolorem quidem debitis temporibus excepturi! Pariatur expedita ex nulla hic, placeat maiores voluptates tempore facilis sit harum laudantium, corrupti laborum?</Text> */}
            {/* </ScrollView> */}
        </View>

    )
}

function mapStateToProps(state) {
    return { 
        professionnels : state.professionnels
    }
}

function mapDispatchToProps(dispatch){
    return {
      getHairdressers: (pro) => {
        dispatch({ type: 'get-hairdressers', professionnels: pro });
      },
      getStatus: (status) => {
          dispatch({ type: 'get-status', statut: status })
      }
    //   getFreelance: (freelance) => {
    //       dispatch({ type: 'get-freelance', independants: freelance })
    //   },
    //   getBarbershop: (bs) => {
    //       dispatch({ type: 'get-barbershop', salons: bs })
    //   }
      
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home);


import React from 'react';
import {
    View, 
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
import {Avatar, Title, Caption, TouchableRipple} from 'react-native-paper';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Login = ({navigation}) => {
    return(
        <View style={styles.container}>
{/*             <Text>Login</Text>
            <Button
                title= "Click Here"
                onPress={() => console.log('button Login clicked')}
                /> */}
          <View style={styles.header}>
            <Image
            source={require('../assets/man-beard.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
          </View>
          <Animatable.View 
            style={styles.footer}
            animation="fadeInUpBig"

          >
            <Text style={styles.text}>Déjà membre?</Text>
            <Text style={styles.text2}>Connecte-toi :</Text>

            <TouchableOpacity style={styles.commandButton}
              onPress={()=> console.log('SignIn button Clicked!')}
              onPress={()=> navigation.navigate('SignInScreen')}>
                    <Text style={styles.panelButtonTitle}>Editer mon Profil</Text>
            </TouchableOpacity>  
           {/*  <Button style={styles.buttonSign}
              type="clear"
              title= "Log Me In"
              //onPress={()=> console.log('SignIn button Clicked!')}
              onPress={()=> navigation.navigate('SignInScreen')}
            /> */}
            
{/*             <Icon.Button 
              name="facebook" 
              backgroundColor="#3b5998">
              <Text style={{ fontFamily: 'Arial', fontSize: 20, textAlign: 'center' }}>Login with Facebook</Text>
            </Icon.Button> */}

          </Animatable.View>
        </View>
    );

};

export default Login;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.38;
const width_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#354F52',
        
    },
    header:{
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    footer:{
      flex: 1,
      backgroundColor:'#CAD2C5',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
    },
    logo: {
      width: width_logo,
      height: height_logo
    },
    text: {
      marginBottom: 30,
      fontSize: 40,
      fontWeight: 'bold',

    },
    text2: {
      marginTop: -20,
      marginLeft: 50,
      marginBottom: 30,
      fontSize: 35,
      fontWeight: 'bold',

    },
    buttonSign: {
      flexDirection: 'row', 
      height: 50,
      width: 200,
      borderRadius: 20,
      backgroundColor: '#354F52',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 80,
      marginTop: 40,
      elevation:3,
    }, 
    commandButton: {
      padding: 15,
      borderRadius: 10,
      backgroundColor: '#354F52',
      alignItems: 'center',
      marginTop: 15,
      marginHorizontal: 20,
      },
      panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        },

});

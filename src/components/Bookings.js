import React from "react";
import {StyleSheet, Image, FlatList, TouchableOpacity} from "react-native";
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import ContainerTop from "./shared/ContainerTop";
import * as firebase from "firebase";
require('firebase/auth')
import {
   Button,
   Row,
   Grid,
   Text,
   Card,
   CardItem,
   StyleProvider,
   Col,
   Icon,
   Left,
   Body,
   Right,
   Thumbnail,
   View,
   Item,
   Label,
   Input,
   Form, Picker,
} from "native-base";
 

class Bookings extends React.PureComponent {
   
   state = {
      Bookings: []
   };

   componentDidMount() {

      var user = firebase.auth().currentUser;
      var email;
      
      if (user != null) {
         email = user.email;
      }

      this._subscribe = this.props.navigation.addListener('didFocus', () => {

         let Bookings = [];
         firebase.firestore().collection("bookings").where("guestEmail", "==", email).onSnapshot(querySnapShot => {
            querySnapShot.forEach(doc => {
               // console.log(doc.data());
               Bookings.push(doc.data());
            });
            this.setState({ bookings: Bookings });
         });
      });
   }

   render() {
      return (
         <StyleProvider style={getTheme(platform)}>
            <ContainerTop>
               <Grid>
                  <Row>
                     <Text style={styles.textHeader}>My Bookings</Text>
                  </Row>
                  <Row style={{marginTop:20}}>
                     <FlatList
                        data = {this.state.bookings}
                        renderItem = {({item, index}) =>
                           <TouchableOpacity onPress={() => this.props.navigation.navigate("Details", item)}>
                              <Card style={{borderRadius:20, width: 335, height: 300}}>
                                 <Grid>
                                    <Row style={{marginBottom: 100, justifyContent:"center"}}>
                                       <Image style={{marginTop: 5, borderRadius:20, width: 320, height: 180,resizeMode: 'cover'}} source={{uri: item.imgUrl}}/>
                                    </Row>
                                    <Row>
                                       <Col>
                                          <Text style={styles.textCard}>{item.title}</Text>
                                          <Text style={styles.textCardChild}>₹{item.price}/night</Text>
                                          <Text style={styles.textCardChild}>{item.location}</Text>
                                          <Text style={styles.textCardChild}>From ({item.checkIn}) to ({item.checkOut})</Text>
                                       </Col>
                                    </Row>
                                 </Grid>
                              </Card>
                           </TouchableOpacity>
                        }
                     />
                  </Row>
               </Grid>
            </ContainerTop>
         </StyleProvider>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginVertical: 20,
    },
   textCard: {
      marginLeft: 20,
      marginBottom: 5,
      fontFamily: "Montserrat-Bold",
      color: "black"
   },
   textdetail: {
      fontFamily: "Montserrat-Medium",
      fontSize: 8
   },
   btnBook: {
     backgroundColor:'#5cb85c',
      padding:10,
      borderRadius:10
   },
   txtBtn : {
      fontFamily: "Montserrat-Medium",
      color: 'white'
   },
   textListRoom: {
      fontFamily: "Montserrat-Medium",
      color: 'white',
      fontSize:12
   },
   textCardChild: {
      marginLeft: 20,
      fontFamily: "Montserrat-Medium"
   },
   textSearch: {
      fontFamily: "Montserrat-Medium",
      color: "white"
   },
   textCardItem: {
      fontFamily: "Montserrat-Medium",
      color: "black",
      fontSize: 12
   },
   textHeader: {
      color: "white",
      fontFamily: 'Montserrat-Medium',
      fontSize: 25,
      textAlign: "center"

   }
});


export default (Bookings);

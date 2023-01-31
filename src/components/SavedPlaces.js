import React from "react";
import {StyleSheet, Image, TouchableOpacity, FlatList, Alert} from "react-native";
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
import companyLogo from '../../assets/hotel-icon.png';

class SavedPlaces extends React.PureComponent {
   state = {
      Places: []
   };

   doHost= () =>{
      this.props.navigation.navigate("Host")
   };

   componentWillUnmount() {
      // fix Warning: Can't perform a React state update on an unmounted component
      this.setState = (state,callback)=>{
          return;
      };
   }

   componentDidMount() {

      var user = firebase.auth().currentUser;
      var email;
      
      if (user != null) {
         email = user.email;
      }

      this._subscribe = this.props.navigation.addListener('didFocus', () => {

         let Places = [];
         firebase.firestore().collection("savedPlaces").where("guestEmail", "==", email).onSnapshot(querySnapShot => {
            querySnapShot.forEach(doc => {
               // console.log(doc.data());
               Places.push(doc.data());
            });
            this.setState({ places: Places });
         });
      });
   }

   doDelete(item){
      console.log(item.title);
      firebase.firestore().collection('savedPlaces/').doc(item.title).delete().then(() => {
         Alert.alert("Removed listing successfully!");
         console.log("Document successfully deleted!");
      }).catch((error) => {
         console.error("Error removing document: ", error);
      });
   };

   render() {
      return (
         <StyleProvider style={getTheme(platform)}>
            <ContainerTop>
               <Grid>
                  <Row>
                     <Col>
                        <Text style={styles.textHeader}>Saved Places</Text>
                     </Col>
                  </Row>
                  <Row style={{marginTop:20}}>
                     <FlatList
                        data = {this.state.places}
                        renderItem = {({item}) =>
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
                                       </Col>
                                       <Col>
                                          <Button style={styles.buttonLogin} full rounded iconLeft light onPress={() =>this.doDelete(item)}>
                                             <Text style={styles.buttonTxt}>Delete</Text>
                                          </Button>
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
   textCard: {
      marginLeft: 20,
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

   },
   buttonLogin: {
      marginTop: -10,
      marginLeft: 30,
      width: 135
   },
   buttonTxt: {
      fontSize: 10,
      fontFamily: 'Montserrat-Medium'
   },
});


export default (SavedPlaces);

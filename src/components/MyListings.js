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

class MyListings extends React.PureComponent {
   state = {
      Listings: [],
      selectedItem: null,
   };

   doHost= () =>{
      this.props.navigation.navigate("Host")
   };

   doDelete(item){
      console.log(item.title);
      firebase.firestore().collection('listings/').doc(item.title).delete().then(() => {
         Alert.alert("Deleted listing successfully!");
         console.log("Document successfully deleted!");
      }).catch((error) => {
         console.error("Error removing document: ", error);
      });
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

         let Listings = [];
         firebase.firestore().collection("listings").where("email", "==", email).onSnapshot(querySnapShot => {
            querySnapShot.forEach(doc => {
               // console.log(doc.data());
               Listings.push(doc.data());
            });
            this.setState({ listings: Listings });
         });
      });
   }

   render() {
      return (
         <StyleProvider style={getTheme(platform)}>
            <ContainerTop>
               <Grid>
                  <Row>
                     <Col>
                        <Text style={styles.textHeader}>My Listings</Text>
                     </Col>
                     <Col style={{ margin: 4 }}>
                        <Button style={styles.buttonLogin} full rounded iconLeft light onPress={this.doHost}>
                           <Text style={styles.buttonTxt}>Host your Place</Text>
                        </Button>
                     </Col>
                  </Row>
                  <Row style={{marginTop:20}}>
                     <FlatList
                        data = {this.state.listings}
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


export default (MyListings);

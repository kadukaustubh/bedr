import React from "react";
import {StyleSheet, Image, FlatList, TouchableOpacity, Alert} from "react-native";
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
 

class Details extends React.PureComponent {
   
   state = {
      Listings: [],
      // checkIn:"04-03-2021",
      // checkOut:"04-03-2026"
   };

   // constructor(props){
   //    super(props)
   //    this.state = {checkIn:"04-03-2021"}
   //    this.state = {checkOut:"04-03-2026"}
   // }

   componentDidMount() {

      var user = firebase.auth().currentUser;
      var email;
      
      if (user != null) {
         email = user.email;
      }


      // this._subscribe = this.props.navigation.addListener('didFocus', () => {

      //    let Listings = [];
      //    firebase.firestore().collection("listings").where("title", "==", 'Ligma Villa').onSnapshot(querySnapShot => {
      //       querySnapShot.forEach(doc => {
      //          // console.log(doc.data());
      //          Listings.push(doc.data());
      //       });
      //       this.setState({ listings: Listings });
      //    });
      // });
   }
   writeuserdata = async() => {
      const { checkIn, checkOut } = this.state;
      var user = firebase.auth().currentUser;
      var email, uid;
      
      if (user != null) {
         email = user.email;
         uid = user.uid;
      }
      
      var docRef = firebase.firestore().collection('requests/').doc();

      docRef.set({
         title: this.props.navigation.getParam('title'),
         about: this.props.navigation.getParam('about'),
         location: this.props.navigation.getParam('location'),
         amenities: this.props.navigation.getParam('amenities'),
         price: this.props.navigation.getParam('price'),
         imgUrl: this.props.navigation.getParam('imgUrl'),
         guestEmail: email,
         hostEmail: this.props.navigation.getParam('email'),
         checkIn: checkIn,
         checkOut: checkOut,
         uid: docRef.id
      }).then(() => {
         //console.log("Document successfully written!");
         Alert.alert("Your request has been sent!");
         this.props.navigation.navigate("Home");
      }).catch((error) => {
         console.error("Error writing document: ", error);
      });
   }

   savePlace = () => {
      var user = firebase.auth().currentUser;
      var email = user.email;
      var uid = user.uid;

      firebase.firestore().collection('savedPlaces/').doc(this.props.navigation.getParam('title')).set({
         title: this.props.navigation.getParam('title'),
         about: this.props.navigation.getParam('about'),
         location: this.props.navigation.getParam('location'),
         amenities: this.props.navigation.getParam('amenities'),
         price: this.props.navigation.getParam('price'),
         hostEmail: this.props.navigation.getParam('email'),
         guestEmail: email,
         uid: uid,
         imgUrl: this.props.navigation.getParam('imgUrl')
      }).then(() => {
         //console.log("Document successfully written!");
         Alert.alert("Listing Saved!");
      }).catch((error) => {
         console.error("Error writing document: ", error);
      });
   };

   render() {
      return (
         <StyleProvider style={getTheme(platform)}>
            <ContainerTop>
               <Grid>
                  <Row>
                     <Image style={{borderRadius: 10 ,width: '100%', height: 200}} source={{uri: this.props.navigation.getParam('imgUrl')}}/>
                  </Row>
                  <Row style={{marginTop: 50, marginBottom: 20}}>
                     <Text style={styles.textCard}>{ this.props.navigation.getParam('title')}</Text>
                  </Row>
                  
                  <Row style={{marginBottom: 5}}>
                     <Text style={styles.textCardChild}>₹{ this.props.navigation.getParam('price')}/night</Text>
                  </Row>
                  <Row style={{marginBottom: 20}}>
                     <Text style={styles.textCardChild}>{ this.props.navigation.getParam('location')}</Text>
                  </Row>
                  <Row style={{marginBottom: 20}}>
                     <Col>
                        <Text style={styles.textCardChildBold}>About</Text>
                        <Text style={styles.textCardChild}>{ this.props.navigation.getParam('about')}</Text>
                     </Col>
                  </Row>
                  <Row style={{marginBottom: 20}}>
                     <Col>
                        <Text style={styles.textCardChildBold}>Amenities</Text>
                        <Text style={styles.textCardChild}>{ this.props.navigation.getParam('amenities')}</Text>
                     </Col>
                  </Row>
                  <Row style={{marginBottom: 20}}>
                     <Text style={styles.textCardChild}>Contact: { this.props.navigation.getParam('email')}</Text>
                  </Row>
                  <Row>
                     <Button style={styles.buttonSave} full rounded iconLeft light onPress={this.savePlace}>
                        <Text style={styles.buttonTxt}>Save</Text>
                     </Button>
                  </Row>
                  <Row>
                     <Form>
                        <Item floatingLabel>
                           <Label style={styles.textLabel}>Check In</Label>
                           <Input maxLength={20} onChangeText={(checkIn) => { this.setState({checkIn : checkIn }) }} />
                        </Item>
                        <Item floatingLabel>
                           <Label style={styles.textLabel}>Check Out</Label>
                           <Input maxLength={20} onChangeText={(checkOut) => { this.setState({checkOut : checkOut }) }} />
                        </Item>
                        <Row>
                           <Button style={styles.buttonLogin} full rounded iconLeft light onPress={this.writeuserdata}>
                              <Text style={styles.buttonTxt}>Request to book</Text>
                           </Button>
                        </Row>
                     </Form>
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
      fontSize: 30,
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
   textCardChildBold: {
    marginLeft: 20,
    fontFamily: "Montserrat-Bold",
    color: "black"
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
      marginTop: 20,
      marginLeft: 10,
      width: 200
   },
   buttonSave: {
      marginLeft: 20,
      marginBottom: 15,
      width: 100
   },
   buttonTxt: {
      fontSize: 15,
      fontFamily: 'Montserrat-Medium'
   },
});


export default (Details);

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
 

class Notifications extends React.PureComponent {
    
    state = {
        Requests: []
    };
    
    componentDidMount() {
        
        var user = firebase.auth().currentUser;
        var email;
        
        if (user != null) {
            email = user.email;
        }
        
        this._subscribe = this.props.navigation.addListener('didFocus', () => {
            
            let Requests = [];
            firebase.firestore().collection("requests").where("hostEmail", "==", email).onSnapshot(querySnapShot => {
                querySnapShot.forEach(doc => {
                    // console.log(doc.data());
                    Requests.push(doc.data());
                });
                this.setState({ requests: Requests });
            });
        });
    }

    confirmRequest = (item) =>{
            //console.log(item.title);

            var docRef = firebase.firestore().collection('bookings/').doc();

            docRef.set({
                title: item.title,
                about: item.about,
                location: item.location,
                amenities: item.amenities,
                price: item.price,
                guestEmail: item.guestEmail,
                hostEmail: item.hostEmail,
                checkIn: item.checkIn,
                checkOut: item.checkOut,
                uid: docRef.id,
                imgUrl: item.imgUrl
            }).then(() => {
                //console.log("Document successfully written!");
                Alert.alert("Confirmed the request!");
            }).catch((error) => {
                console.error("Error writing document: ", error);
            });

            firebase.firestore().collection('requests/').doc(item.uid).delete().then(() => {
                console.log("Request successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        

            
    };
    rejectRequest = (item) =>{
            firebase.firestore().collection('requests/').doc(item.uid).delete().then(() => {
                Alert.alert("Rejected the request!");
                console.log("Request successfully deleted!");
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
                            <Text style={styles.textHeader}>Notifications</Text>
                        </Row>
                        <Row style={{marginTop:20}}>
                            <FlatList
                                data = {this.state.requests}
                                renderItem = {({item, index}) =>
                                        <Card style={{borderRadius:20, height: 250}}>
                                            <Grid>
                                                <Row>
                                                    <Text style={styles.textCardChild}>Request for your property</Text>
                                                </Row>
                                                <Row>
                                                    <Text style={styles.textCard}>{item.title}</Text>
                                                </Row>
                                                <Row>
                                                    <Text style={styles.textCardChild}>Requested by: {item.guestEmail}</Text>
                                                </Row>
                                                <Row>
                                                    <Text style={styles.textCardChild}>From {item.checkIn}</Text>
                                                </Row>
                                                <Row>
                                                    <Text style={styles.textCardChild}>to {item.checkOut}</Text>
                                                </Row>
                                                <Row>
                                                    <Button style={styles.buttonLogin} full rounded iconLeft light onPress={() => this.confirmRequest(item)}>
                                                        <Text style={styles.buttonTxt}>Confirm</Text>
                                                    </Button>
                                                    <Button style={styles.buttonLogin} full rounded iconLeft light onPress={() => this.rejectRequest(item)}>
                                                        <Text style={styles.buttonTxt}>Reject</Text>
                                                    </Button>
                                                </Row>
                                            </Grid>
                                        </Card>
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
        marginLeft: 20,
        width: 135
    },
    buttonTxt: {
        fontSize: 10,
        fontFamily: 'Montserrat-Medium'
    },
});

export default (Notifications);

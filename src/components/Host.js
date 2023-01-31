import React, { Component } from 'react';
import {ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Alert, TouchableOpacity} from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Icon, Grid, Col, Row, Text, Button, Thumbnail, Body, Right, Left } from 'native-base';
import * as firebase from "firebase";
require('firebase/auth')
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

class Host extends Component {

    getPermissionAsync = async () => {
        if (Constants.platform.android) {
            const { status } = await Permissions.askAsync(Permissions.READ_EXTERNAL_STORAGE);
            if (status !== 'granted') {
                alert('Sorry, we need storage permissions to make this work!');
            }
        }
    };

    _pickImage = async () => {
         let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3 ],
            quality: 1,
            maxWidth:40,
            maxHeight:40
        });

        if (!result.cancelled) {
            this.uploadImage( result.uri, this.state.title )
            .then(() => {
                Alert.alert("Picture uploaded.");
            }).catch((error) => {
               console.log(error.message);
                Alert.alert(error.message);
            });
        }
    };

    uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        var ref = firebase.storage().ref().child("images/" + imageName);
        return ref.put(blob);
    }

   doBack = () => {
      this.props.navigation.navigate('MyListings');
   };

   writeuserdata = async() => {
      const { title, about, location, amenities, price } = this.state;
      var user = firebase.auth().currentUser;
      var email, uid;
      
      if (user != null) {
         email = user.email;
         uid = user.uid;
      }

      const ref = firebase.storage().ref("images/" + title);
      const url = await ref.getDownloadURL();

   firebase.firestore().collection('listings/').doc(title).set({
      title: title,
      about: about,
      location: location,
      amenities: amenities,
      price: price,
      email: email,
      uid: uid,
      imgUrl: url
   }).then(() => {
      //console.log("Document successfully written!");
      Alert.alert("Your place has been listed!");
      this.props.navigation.navigate("MyListings");
   }).catch((error) => {
      console.error("Error writing document: ", error);
   });
}

   render() {
      return (
         <Container>
               <Header transparent>
                  <Left>
                     <TouchableOpacity onPress={this.doBack}>
                        <Icon style={{color:'black', fontSize:25}} type="Feather" name='arrow-left-circle' />
                     </TouchableOpacity>
                  </Left>
                  <Body>
                     <Text style={styles.textHeader}>Bedr</Text>
                  </Body>
                  <Right />
               </Header>
               <Content>
                  <KeyboardAvoidingView behavior={"height"} enabled>
                     <ScrollView>
                        <Grid>
                           <Row style={styles.layoutForm} size={3}>
                              <Thumbnail style={{ alignSelf: "center", width: 200, height: 120 }}  source={require("../../assets/hotel-icon.png")} />
                              <Text style={styles.textJudul}>Host your Place</Text>
                              <Form>
                                 <Item floatingLabel>
                                    <Label style={styles.textLabel}>Title</Label>
                                    <Input maxLength={20} onChangeText={(title) => { this.setState({title : title }) }} />
                                 </Item>
                                 <Item floatingLabel>
                                    <Label style={styles.textLabel}>About Place</Label>
                                    <Input multiline maxLength={100} onChangeText={(about) => { this.setState({ about: about }) }} />
                                 </Item>
                                 <Item floatingLabel>
                                    <Label style={styles.textLabel}>Location</Label>
                                    <Input multiline maxLength={200} onChangeText={(location) => { this.setState({ location: location }) }} />
                                 </Item>
                                 <Item floatingLabel>
                                    <Label style={styles.textLabel}>Amenities</Label>
                                    <Input multiline maxLength={100} onChangeText={(amenities) => { this.setState({ amenities: amenities }) }} />
                                 </Item>
                                 <Item floatingLabel>
                                    <Label style={styles.textLabel}>Pricing (in ₹ per night)</Label>
                                    <Input maxLength={10} onChangeText={(price) => { this.setState({ price: price }) }} />
                                 </Item>
                                 <Row>
                                 <Button style={styles.imgPicker} onPress={this._pickImage} transparent >
                                    <Icon iconleft type="Feather" name="camera"/>
                                    <Text style={styles.buttonTxt}>Choose Photos</Text>
                                 </Button>
                                 </Row>
                                 <Row>
                                    <Col style={{ margin: 4 }}>
                                       <Button style={styles.buttonLogin} full rounded iconLeft primary onPress={this.writeuserdata} >
                                          <Icon type='AntDesign' name='like2' />
                                          <Text style={styles.buttonTxt}>Confirm</Text>
                                       </Button>
                                    </Col>
                                 </Row>
                              </Form>
                           </Row>
                        </Grid>
                     </ScrollView>
                  </KeyboardAvoidingView>
               </Content>
         </Container>
      );
   }
}

const styles = StyleSheet.create({
   textJudul: {
      fontSize: 20,
      fontFamily: 'Montserrat-Bold',
      textAlign: "center"
   },
   textLabel: {
      paddingLeft: 10,
      fontSize: 14,
      fontFamily: 'Montserrat-Medium'
   },
   layoutForm: {
      flexDirection: 'column',
      width: '100%',
      padding: 30,
   },

   buttonLogin: {
      marginTop: 30
   },
   buttonTxt: {
      fontSize: 14,
      fontFamily: 'Montserrat-Medium'
   },
   textHeader: {
      color: "white",
      fontFamily: 'Montserrat-Medium',
      fontSize: 20,
      textAlign: "center"

   },
   imgPicker: {
       marginTop: 20
   }
});
export default Host;
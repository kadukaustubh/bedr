import React, { Component } from 'react';
import {ImageBackground, StyleSheet, Image, FlatList} from 'react-native';
import {Container, Header, Content, Icon, Grid, Row, Text, Button, Body, Right, Left, View, Card, Col} from 'native-base';
import FooterSegment from "./shared/FooterSegment";
import {connect} from "react-redux";
import * as firebase from "firebase";
require('firebase/auth')


class Profile extends Component {

    state = {
        Users: []
    };

    componentDidMount() {
        
        var user = firebase.auth().currentUser;
        var email;
        
        if (user != null) {
            email = user.email;
        }

        this._subscribe = this.props.navigation.addListener('didFocus', () => {

            let Users = [];
            firebase.firestore().collection("users").where("email", "==", email).onSnapshot(querySnapShot => {
               querySnapShot.forEach(doc => {
                  //console.log(doc.data());
                  Users.push(doc.data());
               });
               this.setState({ users: Users });
            });
        });

    }

    doBack = () => {
        this.props.navigation.navigate('Home');
    };

    doEditProfile = () =>{
        this.props.navigation.navigate('EditProfile');
    };

    render() {
        let fotoUSer = `data:image/png;base64,${this.props.userActive.sourcePhotoProfile}`;
        let foto = this.props.userActive.sourcePhotoProfile ? {uri :fotoUSer} : require('../../assets/profile.png');
        return (
            <Container>
                <FlatList
                    data = {this.state.users}
                    renderItem = {({item}) =>
                <ImageBackground source={require("../../assets/bg.png")} style={{width:"100%", height:"100%"}}>
                    <Header transparent>
                        <Left>
                            <Button transparent onPress={this.doBack}>
                                <Icon type="Feather" name='arrow-left-circle' />
                            </Button>
                        </Left>
                        <Body>
                            <Text style={styles.textHeader}>Profile</Text>
                        </Body>
                        <Right />
                    </Header>
                    <Content padder>
                        <Grid>
                            <Row>
                                <View style={styles.lyImage}>
                                    <Image source={foto} style={styles.imgUser}/>
                                    <Text style={styles.textName}>{item.name}</Text>
                                    <Text style={styles.textProfile}>@{item.username}</Text>
                                </View>
                            </Row>
                            <Row style={{ marginTop:20, marginLeft:10}}>
                                <Button full rounded iconLeft primary onPress={this.doEditProfile}>
                                    <Icon type='Feather' name='edit' />
                                    <Text>Edit Profile</Text>
                                </Button>
                            </Row>
                            <Row style={{flexDirection:"column", marginTop:10}}>
                                <Card style={{borderRadius: 20, marginBottom: 111, paddingHorizontal:10, paddingVertical:10}} >
                                    <Row style={{paddingVertical:5}}>
                                        <Col size={2}>
                                            <Text style={styles.textProfile}>Address </Text>
                                        </Col>
                                        <Col size={2}>
                                           <Text style={styles.textProfile}>{this.props.userActive.addressUser?this.props.userActive.addressUser:'-'}</Text>
                                        </Col>
                                    </Row>
                                    <Row  style={{paddingVertical:5}}>
                                        <Col size={2}>
                                            <Text style={styles.textProfile}>Phone Number </Text>
                                        </Col>
                                        <Col size={2}>
                                            <Text style={styles.textProfile}>{this.props.userActive.noPhoneUser?this.props.userActive.noPhoneUser:'-'}</Text>
                                        </Col>
                                    </Row>
                                    <Row  style={{paddingVertical:5}}>
                                        <Col size={2}>
                                            <Text style={styles.textProfile}>Email </Text>
                                        </Col>
                                        <Col size={2}>
                                            <Text style={styles.textProfile}>{item.email}</Text>
                                        </Col>
                                    </Row>
                                    <Row  style={{paddingVertical:5}}>
                                        <Col size={2}>
                                            <Text style={styles.textProfile}>Gender </Text>
                                        </Col>
                                        <Col size={2}>
                                            <Text style={styles.textProfile}>
                                                {this.props.userActive.genderId === 1?'Male':null}
                                                {this.props.userActive.genderId === 2?'Female':null}
                                                {!this.props.userActive.genderId?'-':null}
                                            </Text>
                                        </Col>
                                    </Row>
                                </Card>
                            </Row>
                        </Grid>
                    </Content>
                    <FooterSegment/>
                </ImageBackground>
            }
            />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    lyImage:{
        flex:1,
      alignItems:"center"
    },
    textHeader: {
        color: "white",
        fontFamily: 'Montserrat-Medium',
        fontSize: 20,
        textAlign: "center"
    },
    imgUser:{
        width:150,
        height:150,
        borderRadius:100,
        alignSelf:"center"
    },
    textName :{
        fontFamily: 'Montserrat-Medium',
        fontSize: 20,
    },
    textProfile :{
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
    }
});
const mapStateToProps = (state) => {
    return { userActive: state.userActive };
};
export default connect(mapStateToProps)(Profile);

import React from 'react';
import {Body, Container, Content, Header, Text, Thumbnail, Title, Grid, Row, Icon, Button, Right, Left, StyleProvider, FlatList} from "native-base";
import {Platform, StatusBar, StyleSheet} from "react-native";
import getTheme from "../../../native-base-theme/components";
import {withNavigation} from "react-navigation";
import {logout} from "../../actions/user";
import {connect} from "react-redux";
import * as firebase from "firebase";
require('firebase/auth')


class Sidebar extends React.Component {

    state = {
        Users: [],
        users: []
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
            //console.log(this.state.users);
            
        }); 

    }

    doLogout = () =>{
        logout();
        this.props.navigation.navigate('Login');
    };

    doMyListings= () =>{
        this.props.navigation.navigate("MyListings")
    };

    doSavedPlaces= () =>{
        this.props.navigation.navigate("SavedPlaces")
    };

    doNotifications= () =>{
        this.props.navigation.navigate("Notifications")
    };

    // {this.state.requests.map((item, key) => {
    //     this.setState({ name: item.name });
    //     this.setState({ username: username });
    //  })}
    
    // var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANS...';
    // <Image style={{width: 50, height: 50}} source={{uri: base64Icon}}/>

    render() {
        //console.log(this.state.users);
        let fotoUSer = `data:image/png;base64,${this.props.userActive.sourcePhotoProfile}`;
        let foto = this.props.userActive.sourcePhotoProfile ? {uri :fotoUSer} : require('../../../assets/profile.png');
        
        return (
            <StyleProvider style={getTheme(Platform)}>
                <Container>
                    <Header transparent>
                        <Left>
                            <Icon type='AntDesign' style={{color: "black", fontSize:30}} name="home"/>
                        </Left>
                        <Body>
                            <Title style={styles.TextHeader}>Bedr</Title>
                        </Body>
                        <Right />
                    </Header>
                    {this.state.users.map((item, key) => 
                    <Content padder>
                        <Grid>
                            <Row style={{flex:1, justifyContent:"center"}}>
                                <Thumbnail small style={{ width: 150, height: 150, borderRadius:100 }}
                                           source={foto}
                                />
                            </Row>
                            
                            <Text style={styles.TextUser}>{item.name}</Text>
                            <Text style={styles.TextUsername}>@{item.username}</Text>
                            
                            <Row style={{flexDirection:"column", marginTop:20}}>
                                <Button full iconLeft transparent onPress={this.doMyListings} >
                                    <Text style={styles.buttonSideText}>My Listings</Text>
                                    <Body/>
                                    <Right/>
                                </Button>
                                <Button full iconLeft transparent onPress={this.doSavedPlaces} >
                                    <Text style={styles.buttonSideText}>Saved Places</Text>
                                    <Body/>
                                    <Right/>
                                </Button>
                                <Button full iconLeft transparent onPress={this.doNotifications}>
                                    <Text style={styles.buttonSideText}>Notifications</Text>
                                    <Body/>
                                    <Right/>
                                </Button>
                                <Button full iconLeft transparent onPress={this.doLogout}>
                                    <Left>
                                        <Icon type="Feather" style={{color:"black", fontSize:25, marginLeft:20}} name='log-out'/>
                                    </Left>
                                    <Text style={styles.buttonSideText}>Logout</Text>
                                    <Body/>
                                    <Right/>
                                </Button>
                            </Row>
                        </Grid>
                    </Content>
                    )}
                </Container>
            </StyleProvider>
        )
    }
}
const styles = StyleSheet.create({
    buttonSideText: {
        fontFamily: 'Montserrat-Medium',
        fontSize:15,
        color: 'black',
    },
    TextHeader: {
        fontFamily: 'Montserrat-Medium',
        color: 'black',
        fontSize:18,
    },
    TextUser: {
        fontFamily: 'Montserrat-Medium',
        fontSize:20,
        textAlign:"center"
    },
    TextUsername:{
        fontFamily: 'Montserrat-Medium',
        fontSize:12,
        textAlign:"center"
    }
});
const mapStateToProps = (state) => {
    console.log(state);
    return { userActive: state.userActive };
};

const mapDispatchToProps = {
    logout: logout
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Sidebar));

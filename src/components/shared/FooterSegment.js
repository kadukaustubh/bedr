import React from 'react';
import {Button, Footer, FooterTab, Icon, Text} from "native-base";
import {withNavigation} from 'react-navigation';
import {StyleSheet} from "react-native";

class FooterSegment extends React.Component {
    render() {
        return (
            <Footer>
                <FooterTab style={styles.footer}>
                    <Button onPress={() => {
                        this.props.navigation.navigate('Home')
                    }}>
                        <Icon type='AntDesign' style={styles.buttonFooterText} name="home"/>
                        <Text style={styles.buttonFooterText}>Home</Text>
                    </Button>
                    <Button onPress={() => {
                        this.props.navigation.navigate('Bookings')
                    }}>
                        <Text style={styles.buttonFooterText}>Bookings</Text>
                    </Button>
                    <Button onPress={() => {
                        this.props.navigation.navigate('Profile')
                    }}>
                        <Icon type='AntDesign' style={styles.buttonFooterText} name="user"/>
                        <Text style={styles.buttonFooterText}>Profile</Text>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }
}

const styles = StyleSheet.create({
        buttonFooterText: {
            fontFamily: 'Montserrat-Medium',
            color: '#ffffff',
        },
        footer : {
            backgroundColor:"#3F51B5"
        }
    });
export default withNavigation(FooterSegment);
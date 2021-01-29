import React from 'react'
import {View, StyleSheet} from 'react-native';


const Card = (props) => {
    return (
        <View style={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    )
}
const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 7,
        shadowOpacity: 0.27,
        elevation: 8,
        backgroundColor: 'white',
        padding: 21,
        borderRadius: 9
    }
})
export default Card

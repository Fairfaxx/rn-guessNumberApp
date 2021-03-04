import React, {useState, useRef, } from 'react';
import {View, StyleSheet, Text, Button, Alert,} from 'react-native';
import NumberComponent from '../components/NumberComponent';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if(rndNum === exclude){
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum;
    }
}


const GameScreen = (props) => {

    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoise))

    const nextGuessHandler = (direction) => {
        if(
            (direction === 'lower' && currentGuess < props.userChoise) || 
            (direction === 'greater' && currentGuess > props.userChoise)
            ) {
            Alert.alert("Please don't cheat!", "you know that this is wrong...", [{text: 'Sorry', style: 'cancel'}]);
            return;
        };
        if(direction === 'lower'){
            currentHigh.current = currentGuess;
        } else{
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber)
    }

    

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberComponent>{currentGuess}</NumberComponent>
            <Card>
                <Button title="LOWER" onPress={() => {nextGuessHandler('lower')}} />
                <Button title="GREATER" onPress={() => {nextGuessHandler('greater')}} />
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
})

export default GameScreen;

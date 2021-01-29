import React, {useState} from 'react';
import {View, StyleSheet, Text,  Button, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import Input from '../components/Input';
import NumberComponent from '../components/NumberComponent';

const StartGameScreen = (props) => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const handlerInputNumber = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g, '')); 
    }

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
            Alert.alert('Invalid Number', 'Number should be between 1 and 99', [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]);
            return;
        }
        setConfirmed(true);
        setSelectedNumber(enteredValue);
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let confirmedOutput;

    if(confirmed){
        confirmedOutput =  (
            <Card style={styles.confirmedOutput}>
                <Text>Chosen number: </Text>
                <NumberComponent>{selectedNumber}</NumberComponent>
                <Button title="START THE GAME" onPress={() => props.onStartGame(selectedNumber)}/>
            </Card>)
    }

    

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={styles.screen}>
            <Text style={styles.title}>Start a new Game!</Text>
            <Card style={styles.inputContainer}>
                <Text>Select a number</Text>
                <Input style={styles.input} 
                    placeholder="Enter a Number"
                    BlurOnSubmit 
                    autoCorrect={false} 
                    autoCapitalize="none"
                    keyboardType="number-pad" 
                    maxLength={2} 
                    onChangeText={handlerInputNumber}
                    value={enteredValue}
                    />
                <View style={styles.buttonContainer}>
                    <View style={styles.playBtn}>
                        <Button color='white' style={styles.playBtn} title="Reset" onPress={() => {resetInputHandler()}} />
                    </View>
                    <View style={styles.playBtn}>
                        <Button color='white' style={styles.playBtn} title="Confirm" onPress={() => {confirmInputHandler()}} />
                    </View>
                </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    playBtn: {
        backgroundColor: 'purple',
        borderRadius: 11,
        width: 100,
        marginTop: 17,
    },
    input: {
        width: 90,
        textAlign: 'center',
    },
    confirmedOutput: {
        marginTop: 17,
        color: 'white',
        padding: 21,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default StartGameScreen;

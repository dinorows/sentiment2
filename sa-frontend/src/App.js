import React, {Component} from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Polarity from "./components/Polarity";

const style = {
    marginLeft: 12,
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sentence: '',
            polarity: undefined
        };
    };
    analyzeSentenceLocal() {
        fetch('http://localhost:8080/sentiment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({sentence: this.textField.getValue()})
        })
            //.then(response => response.text())
            //.then(data => alert(data));
			.then(response => response.json())
            .then(data => this.setState(data));
    }
	
    analyzeSentence() {
        fetch('http://192.168.99.106:8080/sentiment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({sentence: this.textField.getValue()})
        })
            .then(response => response.json())
            .then(data => this.setState(data));
    }
	
	// testCommSpringboot() {
        // fetch('http://localhost:8080/testHealth')
            // .then(response => response.text())
            // .then(data => alert(data));
    // }
	
	// testCommSpringbootFlask() {
        // fetch('http://localhost:8080/testComms')
            // .then(response => response.text())
            // .then(data => alert(data));
    // }
	
	// testCommFlask() {
        // fetch('http://localhost:5000/testHealth')
            // .then(response => response.text())
            // .then(data => alert(data));
    // }
	
	// testCommFlaskSpringboot() {
        // fetch('http://localhost:5000/testCommsLocal')
            // .then(response => response.text())
            // .then(data => alert(data));
    // }
	
	testCommSpringboot() {
        fetch('http://192.168.99.106:8080/testHealth')
            .then(response => response.text())
            .then(data => alert(data));
    }
	
	testCommSpringbootFlask() {
        fetch('http://192.168.99.106:8080/testComms')
            .then(response => response.text())
            .then(data => alert(data));
    }
	
	testCommFlask() {
        fetch('http://192.168.99.106:5050/testHealth')
            .then(response => response.text())
            .then(data => alert(data));
    }
	
	testCommFlaskSpringboot() {
        fetch('http://192.168.99.106:5050/testComms')
            .then(response => response.text())
            .then(data => alert(data));
    }

    onEnterPress = e => {
        if (e.key === 'Enter') {
            this.analyzeSentence();
        }
    };

    render() {
        const polarityComponent = this.state.polarity !== undefined ?
            <Polarity sentence={this.state.sentence} polarity={this.state.polarity}/> :
            null;

        return (
            <MuiThemeProvider>
                <div className="centerize">
                    <Paper zDepth={1} className="content">
                        <h2>Sentiment Analyser</h2>
                        <TextField ref={ref => this.textField = ref} onKeyUp={this.onEnterPress.bind(this)}
                                   hintText="Type your sentence."/>
                        <RaisedButton  label="Send" style={style} onClick={this.analyzeSentence.bind(this)}/>
                        <RaisedButton  label="SendLocal" style={style} onClick={this.analyzeSentenceLocal.bind(this)}/>
						<RaisedButton  label="testSb" style={style} onClick={this.testCommSpringboot.bind(this)}/>
						<RaisedButton  label="testFl" style={style} onClick={this.testCommFlask.bind(this)}/>
						<RaisedButton  label="testSbFl" style={style} onClick={this.testCommSpringbootFlask.bind(this)}/>
						<RaisedButton  label="testFlSb" style={style} onClick={this.testCommFlaskSpringboot.bind(this)}/>
                        {polarityComponent}
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
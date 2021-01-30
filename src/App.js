import React, {Component} from 'react';
import queryString from 'query-string'
import Popup from 'react-popup';
import './App.css';
import OAuthButton from './OAuthButton';
import Amplify, {API, graphqlOperation} from 'aws-amplify';
import {Auth} from '@aws-amplify/auth'
import {Hub} from '@aws-amplify/core';
import * as mutations from './graphql/mutations';
import * as subscriptions from './graphql/subscriptions';
import {withAuthenticator} from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';

let urlsIn = awsconfig.oauth.redirectSignIn.split(",");
let urlsOut = awsconfig.oauth.redirectSignOut.split(",");
const oauth = {
    domain: awsconfig.oauth.domain,
    scope: awsconfig.oauth.scope,
    redirectSignIn: awsconfig.oauth.redirectSignIn,
    redirectSignOut: awsconfig.oauth.redirectSignOut,
    responseType: awsconfig.oauth.responseType
};
let hasLocalhost = (hostname) => Boolean(hostname.match(/localhost/) || hostname.match(/127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/));
let hasHostname = (hostname) => Boolean(hostname.includes(window.location.hostname));
let isLocalhost = hasLocalhost(window.location.hostname);
if (isLocalhost) {
    urlsIn.forEach((e) => {
        if (hasLocalhost(e)) {
            oauth.redirectSignIn = e;
        }
    });
    urlsOut.forEach((e) => {
        if (hasLocalhost(e)) {
            oauth.redirectSignOut = e;
        }
    });
} else {
    urlsIn.forEach((e) => {
        if (hasHostname(e)) {
            oauth.redirectSignIn = e;
        }
    });
    urlsOut.forEach((e) => {
        if (hasHostname(e)) {
            oauth.redirectSignOut = e;
        }
    });
}
let configUpdate = awsconfig;
configUpdate.oauth = oauth;

if (window.location.host.startsWith('www')) {
    Amplify.Logger.LOG_LEVEL = 'WARN';
} else {
    console.log("Not production, going INFO");
    Amplify.Logger.LOG_LEVEL = 'INFO'
}
Amplify.configure(configUpdate);

/** The prompt content component */
class Prompt extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.defaultValue
        };

        this.onChange = (e) => this._onChange(e);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.value !== this.state.value) {
            this.props.onChange(this.state.value);
        }
    }

    _onChange(e) {
        let value = e.target.value;

        this.setState({value: value});
    }

    render() {
        return <input type="text" placeholder={this.props.placeholder} className="mm-popup__input"
                      value={this.state.value} onChange={this.onChange}/>;
    }
}

/** Prompt plugin */
Popup.registerPlugin('prompt', function (defaultValue, placeholder, callback) {
    let promptValue = null;
    let promptChange = function (value) {
        promptValue = value;
    };

    this.create({
        title: 'What\'s your name?',
        content: <Prompt onChange={promptChange} placeholder={placeholder} value={defaultValue}/>,
        buttons: {
            left: ['cancel'],
            right: [{
                text: 'Save',
                key: '⌘+s',
                className: 'success',
                action: function () {
                    callback(promptValue);
                    Popup.close();
                }
            }]
        }
    });
});

class ChangeCognitoAttributeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {attributeName: '', attributeValue: ''};

        this.handleChangeA = this.handleChangeA.bind(this);
        this.handleChangeB = this.handleChangeB.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeA(event) {
        this.setState({attributeName: event.target.value});
    }

    handleChangeB(event) {
        this.setState({attributeValue: event.target.value});
    }

    handleSubmit(event) {
        Auth.currentAuthenticatedUser()
            .then(user => {
                let data = {};
                data[this.state.attributeName] = this.state.attributeValue;
                return Auth.updateUserAttributes(user, data)
            });
    }

    render() {
        return (
            <div>
                <label>
                    Cognito Attribute Name:
                    <input type="text" onChange={this.handleChangeA} value={this.state.attributeName}/>
                </label><br/>
                <label>
                    Cognito Attribute Value:
                    <input type="text" onChange={this.handleChangeB} value={this.state.attributeValue}/>
                </label><br/>
                <button onClick={this.handleSubmit}>Change Attribute</button>
            </div>
        );
    }
}

class RunCognitoAttributeVerificationButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {verificationState: ''};
    }

    componentDidMount() {
        console.log('on component mount (RunCognitoAttributeVerificationButton)');
        const values = queryString.parse(window.location.href.replace(window.origin + '/?', ''));

        if (typeof values.verifyAttribute !== 'undefined') {
            return Auth.currentAuthenticatedUser({
                bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
            }).then(user => Auth.verifyUserAttributeSubmit(user, values.verifyAttribute, values.code))
                .then(() => {
                    this.setState({verificationState: 'Verified!!!'});
                })
                .catch(err => {
                    console.log(err);
                    this.setState({verificationState: 'Verification failed'});
                });
        }
        this.setState({verificationState: 'Verification not attempted'});
        return Promise.resolve(true);
    }

    render() {
        return (
            <div>
                <label>
                    {this.state.verificationState}
                </label>
            </div>
        );
    }
}

const handleClickObserveInbox = () => {
    const subscription = API.graphql(
        graphqlOperation(subscriptions.onSendMessage, {owner: prompt("Who am I?")})
    ).subscribe({
        next: ({provider, value}) => console.log("Received:", {provider, value})
    });

    console.log("Subscription id", subscription);
}

const handleClickSendMessage = () => {
    API.graphql(graphqlOperation(mutations.sendMessage, {
            input: prompt("Type in the message"),
            recipientSub: prompt("Type in the other user's sub ID")
        })
    );
}

const handleClickSendMessageBeast = () => {
    const recipient = prompt("Recipient");
    const myIdentity = prompt("Who am I?");
    const message = prompt("Message");
    API.graphql(graphqlOperation(mutations.createMessage, {
            input: {
                id: myIdentity + "#" + recipient,
                inboxId: "IX#" + myIdentity,
                senderSub: myIdentity,
                recipientSub: recipient,
                owner: myIdentity,
                s: "D",
                t: message
            }
        })
    );
    API.graphql(graphqlOperation(mutations.createMessage, {
            input: {
                id: recipient + "#" + myIdentity,
                inboxId: "IX#" + recipient,
                senderSub: myIdentity,
                recipientSub: recipient,
                owner: recipient,
                s: "U",
                t: message
            }
        })
    );
}

class App extends Component {

    handleClickCurrentSession = () => {
        return Auth.currentAuthenticatedUser({
            bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        }).then(user => console.log(user))
            .catch(err => console.log(err));
    }

    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this);
        // let the Hub module listen on Auth events
        Hub.listen('auth', (data) => {
            switch (data.payload.event) {
                case 'signIn':
                    this.setState({
                        authState: 'signedIn',
                        authData: data.payload.data,
                        packageBody: this.getState().packageBody || {}
                    });
                    break;
                case 'signIn_failure':
                    this.setState({
                        authState: 'signIn',
                        authData: null,
                        authError: data.payload.data,
                        packageBody: this.getState().packageBody || {}
                    });
                    break;
                default:
                    break;
            }
        });
        this.state = {
            authState: 'loading',
            authData: null,
            authError: null
        }
    }

    componentDidMount() {
        console.log('on component mount');
        // check the current user when the App component is loaded
        Auth.currentAuthenticatedUser().then(user => {
            console.log(user);
            this.setState({authState: 'signedIn'});
        }).catch(e => {
            console.log(e);
            this.setState({authState: 'signIn'});
        });
    }

    signOut() {
        Auth.signOut().then(() => {
            this.setState({authState: 'signIn'});
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        const {authState} = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <div>
                        <ChangeCognitoAttributeForm/>
                        <button onClick={handleClickObserveInbox}>Observe Inbox</button>
                        <button onClick={handleClickSendMessage}>Send Message</button>
                        <button onClick={handleClickSendMessageBeast}>Send Message (Beast Mode)</button>
                        <RunCognitoAttributeVerificationButton/>
                    </div>
                </header>
                {authState === 'loading' && (<div>loading...</div>)}
                {authState === 'signIn' && <OAuthButton/>}
                {authState === 'signedIn' && <button onClick={this.signOut}>Sign out</button>}
            </div>
        );
    }
}

export default withAuthenticator(App);

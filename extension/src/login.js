function validate() {
    console.log('validating...')
    const message = document.getElementById('message');
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    console.log([username, password]);
    
    // Send login details to server
    let requestOptions = {
        method: 'POST',
        body: JSON.stringify({'username': username, 'password': password}),
        headers: {'Content-Type': 'application/json'},
    };
    fetch('https://unihack-meta.herokuapp.com/api/v1/login', requestOptions)
        .then(response => { 
            // TODO: Store session key into browser storage
            if (response.status === 200) {
                response.json()
                    .then(response => {
                        console.log(response)
                        const user = JSON.stringify(response.username)
                        
                        // AuthService.authenticate(() => {
                            const formattedUser = (user.startsWith("\"") && user.endsWith("\"")? user.substring(1, user.length-1): user)
                            chrome.storage.sync.set({'username': formattedUser, 'session': JSON.stringify(response.session)}, function() {
                                console.log('username is set to ' + formattedUser);
                                console.log('session set to ' + JSON.stringify(response.session))
                            });
                            
                            // sessionStorage.setItem('session', JSON.stringify(response.session))
                            // sessionStorage.setItem('username', (user.startsWith("\"") && user.endsWith("\"")? user.substring(1, user.length-1): user))
                            // this.setState({ successfulLogIn: true });
                            chrome.storage.sync.get(['username'], function(result) {
                                console.log('usernameee currently is ' + result.username);
                              })
                            message.innerText = 'Successful sign in!'
                            console.log("Successful sign in");
                        // });
                    })
            } else if (response.status === 401) {
                console.log(response);
                message.innerText = "Incorrect Password";
                // this.setState({
                //     logInError: true,
                //     errorMessage: "Incorrect Password"
                // });
            }
        })
        .catch(error => {
            console.error(`Error: ${error}`);
            message.innerText = `Error: ${error}`;
            // this.setState({logInError: true});
        });
}

function main() {
    const login = document.getElementById('login');
    console.log('attaching to main')
    login.addEventListener(
        'click', validate
    )
}

document.addEventListener('DOMContentLoaded', main);

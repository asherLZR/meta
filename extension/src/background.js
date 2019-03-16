chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const theURL = tabs[0].url
    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:5000/api/v1/upload", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({user: 'hpat0003', url: theURL}));
    console.log(JSON.stringify({user: 'hpat0003', url: theURL}))
});
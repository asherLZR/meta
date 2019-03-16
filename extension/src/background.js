const topNews = [
    "abc.net.au",
    "9news.com.au",
    "dailytelegraph.com.au",
    "smh.com.au",
    "news.com.au",
    "theaustralian.com.au",
    "theage.com.au",
    "sbs.com.au",
    "heraldsun.com.au",
    "huffingtonpost.com.au",
    "couriermail.com.au",
    "brisbanetimes.com.au",
    "perthnow.com.au",
    "watoday.com.au",
    "canberratimes.com.au",
    "ibtimes.com.au",
    "goldcoastbulletin.com.au",
    "crikey.com.au",
    "themercury.com.au",
    "ntnews.com.au",
    "northernstar.com.au",
    "independentaustralia.net",
    "theshovel.com.au",
    "indaily.com.au",
    "townsvillebulletin.com.au",
    "businessnews.com.au",
    "coffscoastadvocate.com.au",
    "dailyexaminer.com.au",
    "newsagencyblog.com.au",
    "whitsundaytimes.com.au",
    "jewishnews.net.au",
    "tasmaniantimes.com",
    "goulburnpost.com.au",
    "ballinaadvocate.com.au",
    "alicespringsnews.com.au",
    "sydneysun.com",
    "perthherald.com",
    "theconservative.com.au"
  ]

function myListener(tabId, changeInfo, tab) {
    const theURL = tab.url;
    if (changeInfo.status == 'complete' && !(/^chrome/.test(tab.url)) && topNews.some((n) => theURL.includes(n))) {
            // alert(theURL);

            var request = new XMLHttpRequest();
            request.open("POST", "https://unihack-meta.herokuapp.com/api/v1/upload", true);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify({user: 'hpat0003', url: theURL}));
            console.log(JSON.stringify({user: 'hpat0003', url: theURL}))
    }
}

chrome.tabs.onUpdated.addListener(myListener);

chrome.browserAction.onClicked.addListener(function(tab) { chrome.tabs.create({ url: "https://unihack-meta.herokuapp.com/" });});

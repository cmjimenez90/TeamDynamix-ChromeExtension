    chrome.alarms.onAlarm.addListener(function(alarm){
        if(alarm.name == "tdRefreshAlarm"){
          console.log("alarm triggered");
          alert("alarm triggered");
          console.log("refresh button clicked");
        }
    });
  
  chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([
        {
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { urlMatches: "https://rcgc.teamdynamix.com/TDNext/Home/Desktop/Default.aspx"},
              css:["table#grdTickets"]
            })
          ],
          actions: [ new chrome.declarativeContent.ShowPageAction() ]
        }
      ]);
    });
  });
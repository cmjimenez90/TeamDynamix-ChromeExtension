const TEAMDYNAMIX_URL = "https://rcgc.teamdynamix.com/TDNext/Home/Desktop/Default.aspx";
  chrome.alarms.onAlarm.addListener(function(alarm){
      if(alarm.name == "tdRefreshAlarm"){
        console.log("alarm triggered");
        chrome.tabs.query({active: true, url: TEAMDYNAMIX_URL}, function(tabs){
          console.log(tabs[0]);
          chrome.tabs.sendMessage(tabs[0].id,{action: "refreshTickets"});
          console.log("message sent");
        });
      }
  });

  chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([
        {
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { urlMatches: TEAMDYNAMIX_URL},
            })
          ],
          actions: [ new chrome.declarativeContent.ShowPageAction() ]
        }
      ]);
    });
  });
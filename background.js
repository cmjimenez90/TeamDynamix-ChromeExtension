 //Sends a message to the content script injected into the Team Dynamix page with a "action" of refreshTickets
chrome.alarms.onAlarm.addListener(function(alarm){
      if(alarm.name == ALARM_NAME){
        console.log("alarm triggered");
        chrome.tabs.query({active: true, url: TEAMDYNAMIX_URL}, function(tabs){
          console.log(tabs[0]);
          chrome.tabs.sendMessage(tabs[0].id,{action: REFRESH_ACTION});
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
              pageUrl: { 
                hostContains: '.teamdynamix.com',
                pathContains: '/TDNext/',
                schemes: ['https']
              },
            })
          ],
          actions: [ new chrome.declarativeContent.ShowPageAction() ]
        }
      ]);
    });
  });
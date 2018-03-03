const ICON_OFF = 'icon/TDIcon_1919.png';
const ICON_1MIN = 'icon/TDIcon_1min_1919.png';
const ICON_2MIN = 'icon/TDIcon_2min_1919.png';
const ICON_5MIN = 'icon/TDIcon_5min_1919.png';

function alarmModification(value){
    console.log(value);
    console.log("Alarm Modification: clearing alarm");
    chrome.alarms.clear(ALARM_NAME);
    console.log("Alarm Modification: alarm cleared");
    if(value){
            console.log("Alarm Modification: creating alarm");
            chrome.alarms.create(ALARM_NAME,{periodInMinutes : value});
            console.log("Alarm Modification: alarm created");  
    }  
};
//Resets alarm if not available based on previous state.
function loadConfiguration(selector){
    chrome.storage.sync.get('selected',function(selected){
        if(selected.selected){
            console.log("Load Configuration: persistence found");
            for(var option, current = 0; option = selector.options[current]; current++) {
                if(option.value == selected.selected) {
                    console.log("Load Configuration: setting choice to value: "+ selector.value);
                    selector.selectedIndex = current;
                    break;
                }
            }
            console.log("Load Configuration: looking for active alarm");
            chrome.alarms.get(ALARM_NAME,function (alarm) {
                if(!alarm){
                    console.log("Load Configuration: no alarm found, creating alarm based on persistence.");
                    alarmModification(parseInt(selected));
                    console.log("Load Configuration: alarm created.");
                }
            });
            console.log("Load Configuration: loading icon state");
            setIconToCurrentState(parseInt(selector.value));
            console.log("Load Configuration: icon state loaded");      
        }
    });
}

function setIconToCurrentState(value){
    function setIcon(tab,value){
        switch(value){
            case 1:
                chrome.pageAction.setIcon({tabId: tab.id,path: ICON_1MIN});
                break;
            case 2:
                chrome.pageAction.setIcon({tabId: tab.id,path: ICON_2MIN});
                break;
            case 5:
                chrome.pageAction.setIcon({tabId: tab.id,path: ICON_5MIN});
                break;
            default:
                chrome.pageAction.setIcon({tabId: tab.id,path: ICON_OFF});
        }
    }
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        console.log("Set Icon State: changing Icon to match selector");
        setIcon(tabs[0],value);
    });   
}

//Runs whenever the extension Page action is opened.
document.addEventListener("DOMContentLoaded", function() {
    var selector = document.getElementById('interval-select');
    loadConfiguration(selector);
    selector.addEventListener('change', function(){
        console.log("Selector Changed Event: selector changed");
        console.log("Selector Changed Event: changing alarm");
        alarmModification(parseInt(selector.value));
        console.log("Selector Changed Event: chaning icon");
        setIconToCurrentState(parseInt(selector.value));
        console.log("Selector Changed Event: storing selector value");
        chrome.storage.sync.set({'selected': selector.value});
    });
  });






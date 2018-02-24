const ICON_OFF = 'icon/TDIcon_1919.png';
const ICON_1MIN = 'icon/TDIcon_1min_1919.png';
const ICON_2MIN = 'icon/TDIcon_2min_1919.png';
const ICON_3MIN = 'icon/TDIcon_3min_1919.png';
const ICON_5MIN = 'icon/TDIcon_5min_1919.png';

function alarmModification(value){
    console.log(value);
    var alarmName = "tdRefreshAlarm";
    console.log("clearing alarm");
    chrome.alarms.clear(alarmName);
    console.log("alarm cleared");
    if(value){
        if(value !== -1){
            console.log("creating alarm");
            chrome.alarms.create(alarmName,{periodInMinutes : value});
            console.log("alarm created");
        }else{
            console.log("creating test alarm");
            chrome.alarms.create(alarmName,{periodInMinutes : .5});
            console.log("alarm test created");
        }   
    }  
};
//Resets alarm if not available based on previous state.
function loadConfiguration(selector){
    chrome.storage.sync.get('selected',function(selected){
        if(selected.selected){
            console.log("persistence found");
            for(var option, current = 0; option = selector.options[current]; current++) {
                if(option.value == selected.selected) {
                    console.log("setting choice to value: "+ selector.value);
                    selector.selectedIndex = current;
                    break;
                }
            }
            console.log("looking for active alarm");
            chrome.alarms.get('tdRefreshAlarm',function (alarm) {
                if(!alarm){
                    console.log("no alarm found, creating alarm based on persistence.");
                    alarmModification(parseInt(selected));
                    console.log("loadconfiguration complete: alarm created.");
                }
            });
            setIconToCurrentState(selected.selected);
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
            case 3:
                chrome.pageAction.setIcon({tabId: tab.id,path: ICON_3MIN});
                break;
            case 5:
                chrome.pageAction.setIcon({tabId: tab.id,path: ICON_5MIN});
                break;
            default:
                chrome.pageAction.setIcon({tabId: tab.id,path: ICON_OFF});
        }
    }
    chrome.tabs.query({active: true}, function(tabs){
        console.log("changing Icon to match selector");
        setIcon(tabs[0],parseInt(value));
    });   
}
//Runs whenever the extension Page action is opened.
document.addEventListener("DOMContentLoaded", function() {
    var selector = document.getElementById('interval-select');
    loadConfiguration(selector);
    selector.addEventListener('change', function(){
        console.log("selector changed");
        alarmModification(parseInt(selector.value));
        setIconToCurrentState(selector.value);
        chrome.storage.sync.set({'selected' : selector.value});
    });
  });





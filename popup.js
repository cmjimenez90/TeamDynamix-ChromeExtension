
function alarmModification(value){
    console.log(value);
    var alarmName = "tdRefreshAlarm";
    console.log("clearing alarm");
    chrome.alarms.clear(alarmName);
    console.log("alarm cleared");
    if(value !== 0){
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

function loadConfiguration(selector){
    chrome.storage.sync.get('selected',function(selected){
        if(selected.selected){
            for(var option, current = 0; option = selector.options[current]; current++) {
                if(option.value == selected.selected) {
                    selector.selectedIndex = current;
                    break;
                }
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    
    var selector = document.getElementById('interval-select');
 
    loadConfiguration(selector);

    selector.addEventListener('change', function(){
        console.log("selector changed");
        alarmModification(parseInt(selector.value));
        chrome.storage.sync.set({'selected' : selector.value});
    })
  });




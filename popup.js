
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

document.addEventListener("DOMContentLoaded", function() {
    var selector = document.getElementById('interval-select');
    console.log(selector);

    selector.addEventListener('change', function(){
        console.log("selector changed");
        alarmModification(parseInt(selector.value));
    })
  });


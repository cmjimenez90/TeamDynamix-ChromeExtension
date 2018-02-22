console.log("tdtickets_cs.js is running");

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    console.log("message recieved");
    if(request.action == "refreshTickets"){
        console.log("action was refresh tickets");
        var refreshButton = document.getElementById('btnRefresh');
        if(refreshButton){
            console.log("button found, initiating click");
            refreshButton.click();
            console.log("button clicked successfully");
        }
    }
});
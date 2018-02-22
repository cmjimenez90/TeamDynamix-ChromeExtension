console.log("tdtickets_cs.js is running");
//waits for refreshTickets message, if received processes refresh.
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    console.log("message recieved");
    if(request.action == "refreshTickets"){
        var iframeDoc = document.getElementsByTagName("iframe")[0].contentWindow.document;
        var rightIframeDoc = iframeDoc.getElementById("RightFrame").contentWindow.document;
        console.log(iframeDoc);
        console.log(rightIframeDoc);
        var refreshButton = rightIframeDoc.getElementById("btnRefresh");
        console.log(refreshButton);
        refreshButton.click();
        console.log("refresh button clicked");
        } 
});
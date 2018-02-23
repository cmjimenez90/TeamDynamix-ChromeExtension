console.log("tdtickets_cs.js is running");
/* ******************************************************************************************************************
*Waits for refreshTickets message, if received processes refresh under the following critia.
*Detects the selected tab on the main document page. Looks for Ticket tab, if not selected action ends.
*If ticket tab is selected, refreshes tickets based on view. Refresh logic is different if the Desktop view is active.
*WARNING: Potentially very volatile. 
*Since it relies on the current design of the TeamDynamix webpage, updates applied by the TeamDynamix team can potentially break this plug in.
********************************************************************************************************************/
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    console.log("message recieved");
    if(request.action == "refreshTickets"){
        if(shouldProcessRequest()){
            console.log("valid tab selected: performing refreshTicketsAction");
            var iframeDoc = document.getElementsByTagName("iframe")[0].contentWindow.document;
            var rightIframeDoc = iframeDoc.getElementById("RightFrame").contentWindow.document;
            console.log(iframeDoc);
            console.log(rightIframeDoc);
            //Process desktop view logic
            if(getSelectedNavItem(iframeDoc) == "divDesktopHdr"){
                console.log("Desktop view is selected; getting refresh links");
                var refreshLinks = rightIframeDoc.getElementsByClassName("fa-refresh");
                console.log(refreshLinks);
                for (let link of refreshLinks){
                    console.log("calling onClick on "+link);
                    link.click();
                    console.log("success");
               }
            }
            //Process any other view
            else{
                var refreshButton = rightIframeDoc.getElementById("btnRefresh");
                console.log(refreshButton);
                refreshButton.click();
                console.log("refresh button clicked");
            }  
        }      
    } 
});

function shouldProcessRequest(){
    return (document.getElementsByClassName("ui-state-active")[0].getAttribute("tabindex") == "0") ? true : false;
}

function getSelectedNavItem(iframe){
    return iframe.getElementsByClassName("selected")[0].getAttribute("id");
}


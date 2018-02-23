const REFRESH_ACTION = "refreshTickets";
const IFRAME_TAG_NAME = "iframe";
const RIGHTIFRAME_TAG_NAME = "RightFrame";
const DESKTOP_NAV_ID = "divDesktopHdr";
const REFRESH_ICON_CLASS = "fa-refresh";
const REFRESH_BUTTON_ID = "btnRefresh";
const ACTIVE_UI_CLASS = "ui-state-active";
const SELECT_CLASS = "selected";

console.log("tdtickets_cs.js is running");
/* ******************************************************************************************************************
*Waits for refreshTickets message, if received processes refresh under the following critia.
*Detects the selected tab on the main document page. Looks for Ticket tab, if not selected action ends.
*If ticket tab is selected, refreshes tickets based on view. Refresh logic is different if the Desktop view is active.
*WARNING: Potentially very volatile. 
*Since it relies on the current design of the TeamDynamix webpage, updates applied by the TeamDynamix team
* can potentially break this plug in.
********************************************************************************************************************/
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    console.log("message recieved");
    if(request.action == REFRESH_ACTION){
        if(shouldProcessRequest()){
            console.log("valid tab selected: performing refreshTicketsAction");
            var iframeDocument = document.getElementsByTagName(IFRAME_TAG_NAME)[0].contentWindow.document;
            var rightIframeDocument = iframeDocument.getElementById(RIGHTIFRAME_TAG_NAME).contentWindow.document;
            console.log(iframeDocument);
            console.log(rightIframeDocument);
            if(getSelectedNavItem(iframeDocument) == DESKTOP_NAV_ID){
                refreshDesktopView(rightIframeDocument);
            }
            else{
                clickRefreshButton(rightIframeDocument);
            }  
        }      
    } 
});

function shouldProcessRequest(){
    return (document.getElementsByClassName(ACTIVE_UI_CLASS)[0].getAttribute("tabindex") == "0") ? true : false;
}

function getSelectedNavItem(iframe){
    return iframe.getElementsByClassName(SELECT_CLASS)[0].getAttribute("id");
}

function clickRefreshButton(iframe){
    var refreshButton = iframe.getElementById(REFRESH_BUTTON_ID);
    console.log(refreshButton);
    if(refreshButton){
        refreshButton.click();
        console.log("refresh button clicked");
    }   
} 

function refreshDesktopView(iframe){
    console.log("Desktop view is selected; getting refresh links");
    var refreshLinks = iframe.getElementsByClassName(REFRESH_ICON_CLASS);
    console.log(refreshLinks);
    for (let link of refreshLinks){
        console.log("calling onClick on "+link);
        link.click();
        console.log("success");
    }
}


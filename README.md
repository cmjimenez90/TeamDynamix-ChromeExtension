#TeamDyanmix Extension for Google Chrome
##Version 0.9.0
all features implemented for testing. Bug phase catching and design issues before official version 1 release.

###Purpose:
Automattically refreshes the user's ticket queue. Can refresh both the desktop view and global ticket views.
* Desktop
* Tickets
    1. Assigned To Me
    2. Awaiting My Review
    3. Awaiting My Approval
    4. Incidents
    5. Problems
    6. Changes
    7. Super Tickets
    8. Service Request
### Page Action Activates when the following are met:
1. URL: https://rcgc.teamdynamix.com/TDNext/Home/Desktop/Default.aspx
2. Selected tab is Ticket
3. Detects refresh link or refresh button on page

##PERMISSIONS:
Tabs: Prompts for read browsing history. Is not utilized.
Modify "RCGC.TEAMDYNAMIX.COM": for clicking of the button and reading the DOM.


chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  chrome.extension.getBackgroundPage().console.log('foo');
});

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
      chrome.browserAction.setBadgeText({text: "NEW"})
    }
);

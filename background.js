chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "pause") {
        chrome.storage.local.set({
            isPaused: true
        });
        chrome.alarms.create("resumeGrayscale",
            {
                delayInMinutes: 5
            });

        chrome.tabs.query({
            url: [
                "*://*.instagram.com/*",
                "*://*.twitter.com/*",
                "*://*.x.com/*"
            ]
        }, function (tabs) {
            tabs.forEach(tab => chrome.tabs.reload(tab.id));
        });
    }
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "resumeGrayscale") {
        chrome.storage.local.set({
            isPaused: false
        });
    }
});
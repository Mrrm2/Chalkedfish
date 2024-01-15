chrome.action.onClicked.addListener((tab) => {
	chrome.tabs.sendMessage(tab.id, { action: 'extensionClicked' });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'loadLichess') {
		chrome.tabs.create({ url: 'https://www.lichess.org/paste', active: true });
		chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
			if (changeInfo.status == 'complete') {
				chrome.tabs.sendMessage(tabId, {
					action: 'pastePgn',
					pgn: message.pgn,
				});
			}
		});
	}
});

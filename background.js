let pgn = '';

chrome.action.onClicked.addListener((tab) => {
	chrome.tabs.sendMessage(tab.id, { action: 'extensionClicked' });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	pgn = message.pgn;
	if (message.action === 'loadLichess') {
		chrome.tabs.create({ url: 'https://www.lichess.org/paste', active: true });
		chrome.tabs.onUpdated.addListener(tabListener);
	}
});

const tabListener = (tabId, changeInfo, tab) => {
	if (changeInfo.status == 'complete') {
		chrome.tabs.onUpdated.removeListener(tabListener);
		chrome.tabs.sendMessage(tabId, {
			pgn,
			action: 'pastePgn',
		});
	}
};

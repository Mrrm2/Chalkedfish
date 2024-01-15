const pgnButtonSelector =
	'#share-modal > div > div.ui_modal-body.ui_modal-rounded-lg.ui_modal-lg > div > header > div.share-menu-tab-selector-component > div:nth-child(1)';
const pgnSelector =
	'#share-modal > div > div.ui_modal-body.ui_modal-rounded-lg.ui_modal-lg > div > section > div.share-menu-tab-pgn-component.share-menu-tab > div:nth-child(2) > textarea';
const shareButtonSelector =
	'#board-layout-sidebar > div > div.tab-content-component > div.live-game-buttons-component > button.icon-font-chess.share.live-game-buttons-button';
const exitMenuSelector =
	'#share-modal > div > div.ui_modal-body.ui_modal-rounded-lg.ui_modal-lg > button > div';

clickShare = () => {
	const targetDiv = document.querySelector('#share-modal');

	const observer = new MutationObserver((mutations) => {
		if (mutations.length > 0) {
			const pgnButton = document.querySelector(pgnButtonSelector);
			if (pgnButton) {
				pgnButton.click();
				chrome.runtime.sendMessage({
					pgn: document.querySelector(pgnSelector).value,
					action: 'loadLichess',
				});
				document.querySelector(exitMenuSelector).click();
				observer.disconnect();
			}
		}
	});

	const config = { childList: true };

	const shareButton = document.querySelector(shareButtonSelector);
	shareButton.click();
	observer.observe(targetDiv, config);
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action === 'extensionClicked') {
		clickShare();
	}
	if (request.action === 'pastePgn') {
		document.querySelector('#form3-pgn').innerHTML = request.pgn;
		let analyzeButton = document.querySelector('#form3-analyse');
		analyzeButton.addEventListener('click', () => {
			document
				.querySelector(
					'#main-wrap > main > form > div.form-actions.single > button'
				)
				.click();
		});
		document.querySelector('#form3-analyse').click();
	}
});

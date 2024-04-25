const bgmTitleSelector = ".MuiButton-textSizeSmall";

const renderElementCheckInterval = 3000;
const renderElementCheckLimit = 10;
waitForElementToRender(0);

function waitForElementToRender(renderElementCheckCount) {
	if (document.querySelector(bgmTitleSelector) != null) {
		const targetElement = document.getElementsByTagName("body")[0];
		const insertElement = document.createElement("script");
		insertElement.setAttribute("type", "text/javascript");
		insertElement.setAttribute("src", chrome.runtime.getURL("scripts/insertScript.js"));
		targetElement.appendChild(insertElement);
	}
	else{
		if (renderElementCheckCount < renderElementCheckLimit){
			setTimeout(function(){
				renderElementCheckCount++;
				waitForElementToRender(renderElementCheckCount);
			},renderElementCheckInterval);
		}
	}
}
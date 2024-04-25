const bgmTitleSelector = ".MuiButton-textSizeSmall";
const chatTabsSelector = "div[role='tablist'] button";
const targetChatTabSelector = "div[role='tablist'] button:nth-child(2)";
const selectedChatTabSelector = "div[role='tablist'] button[aria-selected='true']";
const nameSelector = "input[name='name']";
const texareaId = "downshift-:rl:-input";
const submitButtonSelector = "button[type='submit']";
const stopBgmTitle = "NOTITLE";

const bgm01DisplayName = "Bgm01";
const bgm02DisplayName = "Bgm02";
const bgmTitleAttribute = "aria-label";
const bgmPlayMessagePrefix = "♪「";
const bgmPlayMessageSuffix = "」が流れ出した♪";
const bgmStopMessagePrefix = "…「";
const bgmStopMessageSuffix = "」が止まった…";
const event = new Event("input", { bubbles: true });
event.simulated = true;

const texareaElement = document.getElementById(texareaId);
const bgm01TitleElement = document.querySelectorAll(bgmTitleSelector)[0];
const bgm02TitleElement = document.querySelectorAll(bgmTitleSelector)[1];
const nameElement = document.querySelector(nameSelector);
const submitButtonElement = document.querySelector(submitButtonSelector);

let lastBgm01 = "";
let nowBgm01 = "";
let lastBgm02 = "";
let nowBgm02 = "";

const observerConfig = { 
	attributes: true, 
	childList: false, 
	characterData: false,
	subtree: false,
	attributeFilter: [bgmTitleAttribute]
};

let bgm01Observer = new MutationObserver(function(){
	if(bgm01TitleElement.hasAttribute(bgmTitleAttribute)){
		nowBgm01 = bgm01TitleElement.getAttribute(bgmTitleAttribute).split("\n")[0];
		if(lastBgm01 != nowBgm01){
			let chatTabsElements = document.querySelectorAll(chatTabsSelector);
			let selectedChatTabElement = document.querySelector(selectedChatTabSelector);
			let index = [].slice.call(chatTabsElements).indexOf(selectedChatTabElement);
			if(index != 1){
				document.querySelector(targetChatTabSelector).click();
			}
			let tempText = texareaElement.value;
			let tempName = nameElement.value;
			if(nowBgm01 == stopBgmTitle){
				inputTextIntoElement(texareaElement, bgmStopMessagePrefix + lastBgm01 + bgmStopMessageSuffix);
			}
			else{
				inputTextIntoElement(texareaElement, bgmPlayMessagePrefix + nowBgm01 + bgmPlayMessageSuffix);
			}
			inputTextIntoElement(nameElement, bgm01DisplayName);
			submitButtonElement.click();
			lastBgm01 = nowBgm01;
			if(index != 1){
				document.querySelectorAll(chatTabsSelector)[index].click();
			}
			inputTextIntoElement(texareaElement, tempText);
			inputTextIntoElement(nameElement, tempName);
		}
	}
});

let bgm02Observer = new MutationObserver(function(){
	if(bgm02TitleElement.hasAttribute(bgmTitleAttribute)){
		nowBgm02 = bgm02TitleElement.getAttribute(bgmTitleAttribute).split("\n")[0];
		if(lastBgm02 != nowBgm02){
			let chatTabsElements = document.querySelectorAll(chatTabsSelector);
			let selectedChatTabElement = document.querySelector(selectedChatTabSelector);
			let index = [].slice.call(chatTabsElements).indexOf(selectedChatTabElement);
			if(index != 1){
				document.querySelector(targetChatTabSelector).click();
			}
			let tempText = texareaElement.value;
			let tempName = nameElement.value;
			if(nowBgm02 == stopBgmTitle){
				inputTextIntoElement(texareaElement, bgmStopMessagePrefix + lastBgm02 + bgmStopMessageSuffix);
			}
			else{
				inputTextIntoElement(texareaElement, bgmPlayMessagePrefix + nowBgm02 + bgmPlayMessageSuffix);
			}
			inputTextIntoElement(nameElement, bgm02DisplayName);
			submitButtonElement.click();
			lastBgm02 = nowBgm02;
			if(index != 1){
				document.querySelectorAll(chatTabsSelector)[index].click();
			}
			inputTextIntoElement(texareaElement, tempText);
			inputTextIntoElement(nameElement, tempName);
		}
	}
});

lastBgm01 = bgm01TitleElement.getAttribute(bgmTitleAttribute).split("\n")[0];
lastBgm02 = bgm02TitleElement.getAttribute(bgmTitleAttribute).split("\n")[0];
bgm01Observer.observe(bgm01TitleElement, observerConfig);
bgm02Observer.observe(bgm02TitleElement, observerConfig);

function inputTextIntoElement(targetElement ,inputText){
	targetElement.value = inputText;
	targetElement._valueTracker.setValue("");
	targetElement.dispatchEvent(event);
}
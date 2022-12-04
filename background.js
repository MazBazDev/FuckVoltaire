function reddenPage() {
    let sentence = "";
    document.querySelectorAll("span.pointAndClickSpan").forEach(element => {
        if(element.innerHTML == ' ') {
            sentence += " "
        } else {
            sentence += element.innerText
        }
    });
    
    document.querySelector('.sentenceOuter').style.display = "block";
    document.querySelector(".sentence").insertAdjacentHTML('afterend', `</br><textarea autofocus style="text-align: center; width: 100%;" rows="1">${sentence}</textarea>`);
}
  
chrome.action.onClicked.addListener((tab) => {
    if(!tab.url.includes("chrome://")) {
        chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: reddenPage
        });
    }
});
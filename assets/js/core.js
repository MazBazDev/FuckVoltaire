var notifContainer = document.getElementById("notif");
var defaultPrompt = `Réponds à la consigne : $question en mettant en évidence les fautes avec des [] autour et dis moi pourquoi il y a une erreur = $sentence`

function notif(level, msg) {
    notifContainer.innerHTML = '';
    notifContainer.insertAdjacentHTML('beforebegin', `<div class="alert alert-${level} alert-dismissible fade show" role="alert">${msg}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
}
  
if (document.getElementById('settings-form') != null) {
    const settingsForm = document.getElementById('settings-form');
    const input2 = document.getElementById('apiKey')
    const input3 = document.getElementById('prompt')
    
    chrome.storage.sync.get(['param2', 'param3'], (result) => {
        input2.value = result.param2;
        input3.value = result.param3 == null ? defaultPrompt : result.param3;
    });
    
    
    settingsForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const iparam2 = input2.value;
        const iparam3 = input3.value;
    
        chrome.storage.sync.set({
            param2: iparam2,
            param3: iparam3
        }, notif("success", "Paramètres mis à jour !"));
    });
}

document.getElementById("basicMode").onclick = async function (e) {
    startFck("basic")
};

document.getElementById("advandcedmode").onclick = async function (e) {
    startFck("advanced")
};

function startFck(ftype) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (ftype == "basic") {
        chrome.tabs.sendMessage(tabs[0].id, { fuckType: ftype });
    } else if (ftype == "advanced") {
        chrome.storage.sync.get(['param2', 'param3'], (result) => {
            chrome.tabs.sendMessage(tabs[0].id, { fuckType: ftype, prompt: result.param3, apikey : result.param2});
        });
    }
  });
}
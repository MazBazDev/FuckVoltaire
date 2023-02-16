chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.fuckType === "basic") {
        basic();
    } else if (request.fuckType === "advanced") {
        advanced(request.prompt, request.apikey);
    }

    document.querySelector('.sentenceOuter').style.display = "block";
});

function basic() {
    if(document.getElementById("fkv-area") == null) { 
        document.querySelector(".sentence").insertAdjacentHTML('afterend', `</br><textarea id="fkv-area" autofocus style="text-align: center; width: 100%; font-size: 17px; padding: 10px;" rows="1">${getSentence()}</textarea>`);
    }
}

function advanced(prompt, apikey) {
    prompt = prompt.replaceAll('$question', document.getElementsByClassName("instructions")[0].innerText)
    prompt = prompt.replace('$sentence', getSentence())

    const key = apikey;
    const requestUrl = 'https://api.openai.com/v1/completions';
    const requestData = {
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 0.4,
        max_tokens: 60,
        frequency_penalty: 0.0,
        presence_penalty: 0.0
    };

    fetch(requestUrl, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => setGptSentence(data.choices[0].text))
    .catch(error => setGptSentence(error));

}

function setGptSentence(msg) {
    document.querySelector(".sentence").insertAdjacentHTML('afterend', `</br><p style="margin-top: 25px; border: solid 1px; border-radius: 10px; padding: 15px;font-size: 19px;">Réponse de ChatGPT : </br></br> ${msg}</p>`);
}

function getSentence() {
    let sentence = "";

    document.querySelectorAll("span.pointAndClickSpan").forEach(element => {
        if(element.innerHTML == ' ') {
            sentence += " "
        } else {
            sentence += element.innerText
        }
    });

    return sentence
}
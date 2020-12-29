chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    const data = document.querySelectorAll("div.a-col-right div")
    var ret = []
    
    for (var i = 0; i < data.length; i++){
        if (i%3==1){
            ret.push(data[i].innerText)
        }
    }
    sendResponse({items: ret})
})
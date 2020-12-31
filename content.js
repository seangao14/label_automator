chrome.runtime.onMessage.addListener(function(request, sender){
    const data = document.querySelectorAll("div.a-col-right div")
    var items = []
    var qty = []
    
    for (var i = 0; i < data.length; i++){
        if (i%3==1){
            items.push(data[i].innerText)
            qty.push(data[i+1].innerText)
        }
    }
    chrome.runtime.sendMessage({
        items: items,
        qty: qty
    })

})
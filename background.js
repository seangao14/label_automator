window.items = []
window.qty = []

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    window.items = request.items
    window.qty = request.qty
})
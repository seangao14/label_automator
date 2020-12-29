var items
const {PDFDocument} = PDFLib

document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#fetch').addEventListener('click', fetch, false)
    document.querySelector('#apply').addEventListener('click', apply, false)


    function fetch(){
        chrome.tabs.query({currentWindow: true, active: true},
            function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, 'hi', setItems)
            })
    }

    function setItems(res){
        items = res.items
        
    }

    function apply(){
        /*items.forEach(item => {

            const div = document.createElement('div')
            div.textContent = `${item}`
            document.body.appendChild(div)
        })*/

        var filename = document.getElementById("filename").value

        alert(browser.downloads.showDefaultFolder())
    }

},false)
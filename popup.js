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

    async function apply(){
        /*items.forEach(item => {

            const div = document.createElement('div')
            div.textContent = `${item}`
            document.body.appendChild(div)
        })*/
        
        const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
        const pdfbytes = await fetch(url).then(res => res.arrayBuffer())

        //const pdfbytes = new Response("USPSlabel.pdf").arrayBuffer()

        const pdfDoc = PDFDocument.load(pdfbytes)
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]
        const {width, height} = firstPage.getSize()

        for (i = 0; i < pages.length; i++) {
            pages[i].drawText(`GEORGE IS A GAY MAN ${i}`, {
                x: 100,
                y: height/2 - 300,
                size: 20,
            })
        }
        
    }

},false)
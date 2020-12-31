var items
const {PDFDocument} = PDFLib


document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#fetch').addEventListener('click', retrieve, false)
    document.querySelector('#apply').addEventListener('click', apply, false)


    function retrieve(){
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
        
        //const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
        const url = "USPSlabel.pdf"
        const pdfbytes = await fetch(url).then(res => res.arrayBuffer())

        //const pdfbytes = new Response("USPSlabel.pdf").arrayBuffer()

        const pdfDoc = await PDFDocument.load(pdfbytes)
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]
        const {width, height} = firstPage.getSize()

        for (let i = 0; i < pages.length; i++) {
            pages[i].drawText(`GEORGE IS A GAY MAN ${i}`, {
                x: 100,
                y: height/2 - 300,
                size: 20,
            })
        }

        const pdfBytes = await pdfDoc.save()

        /*
        var sample = base64ToArrayBuffer(pdfBytes)
        var url_ = URL.createObjectURL(sample)
        */

        var bytes = new Uint8Array(pdfBytes); // pass your byte response to this constructor 
        var blob=new Blob([bytes], {type: "application/pdf"});// change resultByte to bytes
        var url_ = URL.createObjectURL(blob)
    
        
        chrome.downloads.download({
            url: url_, 
            filename: "fun_with_js.pdf"
        })
    }

},false)
const {PDFDocument} = PDFLib


document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#fetch').addEventListener('click', retrieve, false)
    document.querySelector('#apply').addEventListener('click', apply, false)


    function retrieve(){
        chrome.tabs.query({currentWindow: true, active: true},
            function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, 'hi')
            })
    }

    async function apply(){
        const fname = document.getElementById("fname").value

        const url = `./../${fname}.pdf`
        const pdfbytes = await fetch(url).then(res => res.arrayBuffer())


        const pdfDoc = await PDFDocument.load(pdfbytes)
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]
        const {width, height} = firstPage.getSize()

        const bg = chrome.extension.getBackgroundPage()

        for (let i = 0; i < bg.items.length; i++) {
            pages[i].drawText(`${bg.items[i]}`, {
                x: 20,
                y: height/2 - 300,
                size: 8,
            })

            pages[i].drawText(`${bg.qty[i]}`, {
                x: 20,
                y: height/2 - 320,
                size: 8,
            })
        }

        const pdfBytes = await pdfDoc.save()

        var bytes = new Uint8Array(pdfBytes); // pass your byte response to this constructor 
        var blob=new Blob([bytes], {type: "application/pdf"});// change resultByte to bytes
        var url_ = URL.createObjectURL(blob)
    
        
        chrome.downloads.download({
            url: url_, 
            filename: "new_label.pdf"
        })
    }

},false)
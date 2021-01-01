const {PDFDocument} = PDFLib


document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#fetch').addEventListener('click', retrieve, false)
    document.querySelector('#fileUpload').addEventListener('change', event => {
        handleUpload(event)
    })


    function retrieve(){
        chrome.tabs.query({currentWindow: true, active: true},
            function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, 'hi')
            })
    }

    async function handleUpload(event)  {
        const files = event.target.files

        console.log(files[0])

        //const pdfBytes = files[0].arrayBuffer()
        //console.log(pdfBytes)

        let fr = new FileReader()

        fr.onload = async function(e){
            let file_ = fr.result
 
            console.log(file_)
            const pdfDoc = await PDFDocument.load(file_)
            console.log('AFTER AWAIT')

            
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

            const newBytes = await pdfDoc.save()
            console.log(newBytes)

            var bytes = new Uint8Array(newBytes); // pass your byte response to this constructor 
            var blob=new Blob([bytes], {type: "application/pdf"});// change resultByte to bytes
            var url_ = URL.createObjectURL(blob)
        
            
            chrome.downloads.download({
                url: url_, 
                filename: "new_label.pdf"
            })

        }

        fr.readAsArrayBuffer(files[0]) 

        /*
        const pdfDoc = await PDFDocument.load(pdfBytes)
        console.log('AFTER AWAIT')

        
        
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

        const newBytes = await pdfDoc.save()
        console.log(newBytes)

        var bytes = new Uint8Array(newBytes); // pass your byte response to this constructor 
        var blob=new Blob([bytes], {type: "application/pdf"});// change resultByte to bytes
        var url_ = URL.createObjectURL(blob)
    
        
        chrome.downloads.download({
            url: url_, 
            filename: "new_label.pdf"
        })
        */
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
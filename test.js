const {PDFDocument} = require('pdf-lib');
const fs = require('fs');



editPDF().catch(err => console.log(err));

async function editPDF() {
    label = await PDFDocument.load(fs.readFileSync('C:/Users/yang/Downloads/UPSlabel.pdf'));

    const pages = label.getPages();
    const firstPage = pages[0];
    const {width, height} = firstPage.getSize();

    for (i = 0; i < pages.length; i++) {
        firstPage.drawText(`GEORGE IS A GAY MAN ${i}`, {
            x: 100,
            y: height/2 - 300,
            size: 20,
        })
    }

    //const pdfBytes = await pdfBytes.save()
    fs.writeFileSync('./test.pdf', await label.save());

}

export const pdfjsLib = window.pdfjsLib;
export function getPageText(pageNum, PDFDocumentInstance) {
  console.log("inside getPageText")
  return new Promise(function (resolve, reject) {
      PDFDocumentInstance.getPage(pageNum).then(function (pdfPage) {
          // The main trick to obtain the text of the PDF page, use the getTextContent method
          pdfPage.getTextContent().then(function (textContent) {
              var textItems = textContent.items;
              var finalString = "";

              // Concatenate the string of the item to the final string
              for (var i = 0; i < textItems.length; i++) {
                  var item = textItems[i];
                  finalString += item.str + " ";
              }

              resolve(finalString);
          });
      });
  });
}



export function geturl(e){
console.log("inside geturl")
var binaryData = [];
binaryData.push(e.target.files[0])


    var url = window.URL.createObjectURL(new Blob(binaryData, {type: 'application/pdf'}))
    console.log("url inside of geturl promise",url)
return url

}

export function makepdf(url){
  console.log("inside makepdf")
  let promise = new Promise(function(resolve, reject) {
    if (url){
      resolve('url present')
    }
}).then((url)=>{
   //target an instance of the pdf reader in the browser
  pdfjsLib.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
  pdfjsLib.getDocument(url).then(function (pdf) {
      var pdfDocument = pdf;
      var pagesPromises = [];

      for (var i = 0; i < pdf.numPages; i++) {
          // Required to prevent that i is always the total of pages
          (function (pageNumber) {
              pagesPromises.push(getPageText(pageNumber, pdfDocument));
          })(i + 1);
      }

      Promise.all(pagesPromises).then(function (pagesText) {
      		// Remove loading
          document.getElementById("loading-info").remove();

          // Render text
          for(var i = 0;i < pagesText.length;i++){
          	document.getElementById("finaltext").append( (i + 1) +pagesText[i])
          }
      });

  }, function (reason) {
      // PDF loading error
      console.error(reason);
  });
})

}

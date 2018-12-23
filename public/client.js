var btn = document.getElementById('textform');
var txtArea = document.getElementById('textArea1');
var resultssection = document.getElementById('results');
var loader = document.getElementById("loader");
var errormessage = document.getElementById("errormessage");
var pdfAnalyse = document.getElementById('pdf-form')
var WordExtractor = require('word-extractor');
//var textract = require('textract');
// var myFile = document.getElementById('myFile1');

if(window.location.hash ) window.location.href = window.location.href.replace('#results', '')

btn.onsubmit = function(e)
{
    getPersonality();
    loader.style.display = "block";
    errormessage.style.display = "none";
    e.preventDefault()
}

pdfAnalyse.onsubmit = function(e){
    //alert('clicked');
    // getPersonality1(e);
    e.preventDefault();
}
function getPersonality()
{
    resultssection.style.display = "none";
    var text = JSON.stringify(txtArea.value);
    fetch('/api/getProfile',{
        method:'POST',
        body:text
    }).then(function(response){
        return response.json()
    }).then(function(datas){
        if( datas.error ){
            loader.style.display = "none";
            errormessage.style.display = "block";
            errormessage.style.color = "Red";
            errormessage.innerText = datas.error;
        } else{
            resultssection.style.display = "block";
            loader.style.display = "none";

        datas.personality.map( ( data, index ) => {
            var elem = document.getElementById( data.name.replace(/\s/g,''))
            elem.childNodes[3].childNodes[1].style.width = Math.round( data.percentile * 100 ) + '%'
            elem.childNodes[3].childNodes[1].innerText = Math.round( data.percentile * 100 ) + '%'
        })
        datas.needs.map( ( data, index ) => {
            var elem = document.getElementById( data.name.replace(/\s/g,''))
            elem.childNodes[3].childNodes[1].style.width = Math.round( data.percentile * 100 ) + '%'
            elem.childNodes[3].childNodes[1].innerText = Math.round( data.percentile * 100 ) + '%'
        })
        datas.values.map( ( data, index ) => {
            var elem = document.getElementById( data.name.replace(/\s/g,''))
            elem.childNodes[3].childNodes[1].style.width = Math.round( data.percentile * 100 ) + '%'
            elem.childNodes[3].childNodes[1].innerText = Math.round( data.percentile * 100 ) + '%'
        })
        // datas.personality.openness.Authority-challenging.map( ( data, index ) => {
        //     var elem = document.getElementById( data.name.replace(/\s/g,''))
        //     elem.childNodes[3].childNodes[1].style.width = Math.round( data.percentile * 100 ) + '%'
        //     elem.childNodes[3].childNodes[1].innerText = Math.round( data.percentile * 100 ) + '%'
        // })
        // datas.personality.Conscientiousness.Achievement striving.map( ( data, index ) => {
        //     var elem = document.getElementById( data.name.replace(/\s/g,''))
        //     elem.childNodes[3].childNodes[1].style.width = Math.round( data.percentile * 100 ) + '%'
        //     elem.childNodes[3].childNodes[1].innerText = Math.round( data.percentile * 100 ) + '%'
        // })
        // datas.personality.Agreeableness.Trust.map( ( data, index ) => {
        //     var elem = document.getElementById( data.name.replace(/\s/g,''))
        //     elem.childNodes[3].childNodes[1].style.width = Math.round( data.percentile * 100 ) + '%'
        //     elem.childNodes[3].childNodes[1].innerText = Math.round( data.percentile * 100 ) + '%'
        // })
        
        }
        
        if(window.location.hash){
            window.location.href = window.location.href
        } else {
            window.location.href += "#results"
        }
    })
}

function getPersonality1(e){
    //resultssection.style.display = "none";
    var fileupload = document.getElementById('myFile1').value;
    console.log(fileupload);
    var extractor = new WordExtractor();
    var extracted = extractor.extract('C:/Users/sandeep.murugadas/Desktop/resume1.docx');
    extracted.then(function(doc) {
        console.log(doc.getBody());
       // getPersonality(extracted);
      });
    //console.log(extracted)
   // getPersonality(extracted);
    var resumefile = JSON.stringify(myFile.value);
    fetch('/api/getProfile',{
        method:'POST',
        body:text
    }).then(function(response){
        return response.json()
    }).then(function(datas){
        if( datas.error ){
            loader.style.display = "none";
            errormessage.style.display = "block";
            errormessage.style.color = "Red";
            errormessage.innerText = datas.error;
        } else{
            resultssection.style.display = "block";
            loader.style.display = "none";

        datas.personality.map( ( data, index ) => {
            var elem = document.getElementById( data.name.replace(/\s/g,''))
            elem.childNodes[3].childNodes[1].style.width = Math.round( data.percentile * 100 ) + '%'
            elem.childNodes[3].childNodes[1].innerText = Math.round( data.percentile * 100 ) + '%'
        })
        datas.needs.map( ( data, index ) => {
            var elem = document.getElementById( data.name.replace(/\s/g,''))
            elem.childNodes[3].childNodes[1].style.width = Math.round( data.percentile * 100 ) + '%'
            elem.childNodes[3].childNodes[1].innerText = Math.round( data.percentile * 100 ) + '%'
        })
        datas.values.map( ( data, index ) => {
            var elem = document.getElementById( data.name.replace(/\s/g,''))
            elem.childNodes[3].childNodes[1].style.width = Math.round( data.percentile * 100 ) + '%'
            elem.childNodes[3].childNodes[1].innerText = Math.round( data.percentile * 100 ) + '%'
        })
        
        }
        
        if(window.location.hash){
            window.location.href = window.location.href
        } else {
            window.location.href += "#results"
        }
    })
}

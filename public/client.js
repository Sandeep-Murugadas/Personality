var btn = document.getElementById('textform');
var txtArea = document.getElementById('textArea1');
var resultssection = document.getElementById('results');
var loader = document.getElementById("loader");
var errormessage = document.getElementById("errormessage");

if(window.location.hash ) window.location.href = window.location.href.replace('#results', '')

btn.onsubmit = function(e)
{
    getPersonality();
    loader.style.display = "block";
    errormessage.style.display = "none";
    e.preventDefault()
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
        
        }
        
        if(window.location.hash){
            window.location.href = window.location.href
        } else {
            window.location.href += "#results"
        }
    })
}


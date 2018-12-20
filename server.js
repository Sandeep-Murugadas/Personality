//Importing required packages
var express = require('express');
var dotenv = require('dotenv');
var bodyParser = require('body-parser');
var app = express();

//Bundling the code
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

var compiler = webpack(webpackConfig);

//webpack configuration
app.use(
    webpackDevMiddleware(compiler, {
        publicPath: '/'
    })
)

app.use(bodyParser.text({type: 'text/plain'}))

//To serve static files in the public folder
app.use(express.static('public/'));

//To load env variable
dotenv.load({silent: true});

//Port and listener config
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('server running at http://localhost:%s/',port);
});

var personalityv3 = require('watson-developer-cloud/personality-insights/v3');
var personalityinsights = new personalityv3({
    version_date: '2017-10-13',
    iam_apikey: 'dxImrPBgTGuXNIAhHdaihSMrZxX1vj8lyTeyoUu-oNM_',
    url: 'https://gateway-lon.watsonplatform.net/personality-insights/api'
})
app.post('/api/getProfile', function(req,res){ 
    if(req.body){
        personalityinsights.profile({
            content: req.body,
            content_type: 'text/plain;charset=utf-8',
            consumption_preferences: true,
            raw_scores: true
        },
        function(error,profile){
            if(error){
                return res.status(200).send(error)
            } else {
                return res.status(200).send(JSON.stringify(profile))
            }
        })
    }
})
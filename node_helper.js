/* Magic Mirror
 * Module: MMM-YourComic
 *
 * By Cowboysdude
 *
 */
const NodeHelper = require('node_helper');
const cheerio = require('cheerio');
const request = require('request');

module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting module: " + this.name); 
    },
      
     getComic: function() {
     
        url = "https://www.iltalehti.fi/fingerpori"
        
        request(
          url, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(body); 
                var returning =  $('img').map(function(){ return $(this).attr('src'); })  
                var image = returning[0]; 
                this.sendSocketNotification("COMIC_RESULT", image);
            }
        });
    }, 
	  
	  
    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_COMIC') {
			this.getComic(payload);

        } 
    }
}); 
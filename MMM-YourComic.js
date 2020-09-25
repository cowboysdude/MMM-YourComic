/* Magic Mirror
 * Module: MMM-YourComic
 *
 * By Cowboysdude
 * MIT Licensed.
 */
Module.register("MMM-YourComic", {

    // Module config defaults.
    defaults: {
        updateInterval: 60 * 60 * 1000, // every 10 minutes
        animationSpeed: 2500,
        initialLoadDelay: 5, // 0 seconds delay
        retryDelay: 2500,
        rotateInterval: 15 * 1000, 
		image: true,
		source_color: 'teal',
		date_color: 'white',
		timevor_color: 'red'
    },

    getScripts: function() {
        return ["moment.js"];
    },

    getStyles: function() {
        return ["MMM-YourComic.css"];
    },

    // Define start sequence.
    start: function() {
        Log.info("Starting module: " + this.name);
        this.config.lang = this.config.lang || config.language;
		this.scheduleUpdate(); 
    },

    getDom: function() { 
        
		var wrapper = document.createElement("div");
         
		var comic = this.comic; 
		 
		var shownet = document.createElement("div");
			shownet.classList.add("fixed");
        
	if (comic) {
	    var NetIcon = document.createElement("img");
            NetIcon.classList.add("image");
            NetIcon.src = comic; 
            shownet.appendChild(NetIcon);
            wrapper.appendChild(shownet); 
        }   
        return wrapper;
    },
	
    processComic: function(data) {
        this.today = data.Today;
        this.comic = data;
        this.loaded = true; 
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getComic();
        }, this.config.updateInterval);

        this.getComic(this.config.initialLoadDelay);
    },

    getComic: function() {
        this.sendSocketNotification('GET_COMIC'); 
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "COMIC_RESULT") {
            this.processComic(payload);
           console.log("Got comic");
            this.updateDom(this.config.animationSpeed);
        }
    }

});

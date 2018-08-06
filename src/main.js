/* 
 * Cursor
 * 
 * A class that allows you to chnage the default cursor in your website
 * 
 * @param String base64Image The image to use as the cursors
 */

/* notes: 
 * 
 * TODO: cursor needs to be completed for drag and drop operations 
 * */

function Cursor(base64Image){
    /* init */
    var self = this;
    
    self.loading = false;

    /* holds the timers for fade on and off of the ajax spinners */
    self.fadeOnTimer = new Array(100).fill(false);
    self.fadeOffTimer = new Array(100).fill(false);
    self.loading = new Array(100).fill(false);
    self.loadingImage = new Array(100).fill(false);
    
    /* create empty style sheet to add cursor rules */
    this.style = (function() {
        // Create the <style> tag
        var style = document.createElement("style");

        // WebKit hack
        style.appendChild(document.createTextNode(""));

        // Add the <style> element to the page
        document.head.appendChild(style);

        console.log(style.sheet.cssRules); // length is 0, and no rules

        return style;
    })();
    
    /* insertNewRule
     * 
     * @parm selector String A string representing the string to apply the rules
     * @parm rules Array an array of rule strings 
     * 
     * @return {void}
     * */
    this.insertNewRule = function(selector, rules){
        for(
                var i=0;
                i<rules.length;
                i++){
                    /* add new rule */
                    this.style.sheet.insertRule(selector+'{'+rules[i]+';}', 0);
        }
    }
    
    /**
     * fixPage
     */
    this.fixPage = function(){
        
        /* fix firefox body issue */
        this.insertNewRule('html, body', [
            "margin: 0",
            "height: 100%"
        ]);

    }
    
   /**
     * assignCursor
     * 
     * Apply all the complex rule that are required for a seemless cursor
     * 
     * */
    this.assignCursor = function(){
        
        /* auto is required after base64 assignment */
        this.insertNewRule('*', ['cursor:url('+self.parts[1]+'), auto']);


        /* arrow */
        var arrowSelectors = [
            "input:focus","textarea:focus"
        ];
        
        for(var i=0;i<arrowSelectors.length;i++){
            this.insertNewRule(arrowSelectors[i], ['cursor:url('+self.parts[1]+'), auto']);
        }
        
        /* point */
        var pointSelectors = [
            "a","a span","button",
                        
            ".btn:not(:disabled):not(.disabled)", /* bootstrap buttons fix */
            
            "ul.dropdown-menu a.dropdown-item", /* bootstrap-select fix */
            
            ".pagination.page-item", /* bootstrap pagniation */
            
            "select, select option",
            
            "select:focus",
            
            "select:hover",
            
            "select:active",
            
            "input[type=file]",
            
            "input[type=radio]",
            
            "input[type=checkbox]",

            
        ];
        
        for(var i=0;i<pointSelectors.length;i++){
            this.insertNewRule(pointSelectors[i], ['cursor:url('+self.parts[0]+'), auto']);
        }
        
        /* fix bootstrap alert close button */
        this.insertNewRule("button.close", ['cursor:url('+self.parts[0]+'), auto !important']);
        
        /* fix bootstrap custom radio */
        this.insertNewRule(".page-link", ['cursor:url('+self.parts[0]+'), auto !important']);
        
        /* fix bootstrap custom radio */
        this.insertNewRule(".custom-control", ['cursor:url('+self.parts[0]+'), auto !important']);

        var textSelectors = [
            "input", "textarea"
        ];
        
       for(var i=0;i<textSelectors.length;i++){
            this.insertNewRule(textSelectors[i], ['cursor:url('+self.parts[4]+'), auto']);
        }
        
        /* readonly and disabled */
        var disabledSelectors = [
            ".disabled", ".btn-link.disabled", "input[disabled]", "input[readonly]"
        ];
        
        for(var i=0;i<disabledSelectors.length;i++){
            this.insertNewRule(disabledSelectors[i], ['cursor:url('+self.parts[7]+'), auto !important']);
        }
        
       

    }

    /**
     * splitBase64
     * 
     * */
    this.splitBase64 = function(){
        /* this = Image() */
        
        /* */
        var canvas = document.createElement('canvas'), ctx=canvas.getContext("2d"), parts=[];
        
        var w2 = img.width / 34,  // 32
            h2 = img.height;  // 32

        for(
                var i=0;
                i<34;
                i++){

            var x = 32*i,
                y = 0;
    
            canvas.width  = w2;
            canvas.height = h2;
            
            console.log(x, y, w2*2, h2*2);

            ctx.drawImage(this, x, y, 32, 32, 0, 0, 32, 32); // img, x, y, w, h
            parts.push( canvas.toDataURL() );     // ("image/jpeg") for jpeg
            //
            // ---------- JUST TO TEST
             //           var slicedImage = document.createElement("img")
             //           slicedImage.src = parts[i];
             //           var div = document.getElementById("app");
             //           div.appendChild( slicedImage );
            // ----------

        }
        
        /* apply cursor after loaded */
        self.parts = parts;
        self.assignCursor();
    }
    
    
    /* inner width and height of viewport 
     * Code from https://github.com/saabi/vminpoly/issues/1
     * 
     * @return Object Width And Height
     * */
    this.getViewportSize = function() {
        var x=0;
        var y=0;
        if (self.innerHeight) // all except Explorer < 9
        {
            x = self.innerWidth;
            y = self.innerHeight;
        }
        else if (document.documentElement && document.documentElement.clientHeight)
        // Explorer 6 Strict Mode
        {
            x = document.documentElement.clientWidth;
            y = document.documentElement.clientHeight;
        }
        else if (document.body) // other Explorers < 9
        {
            x = document.body.clientWidth;
            y = document.body.clientHeight;
        }
        return {
            width: x, 
            height: y
        };
    }   
    
    
    
    
    
    /* fix the page before we assign the cursor */
    this.fixPage();
    
    var img = new Image();
    img.src = " data:image/png;base64,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";
    img.onload = this.splitBase64;
    
       
    
    /*
     * load
     * 
     * Fade on a loader SVG
     * 
     * @param Interger position The loader poition integer
     */
    this.load = function(position){
        
        
        if(self.loading[position] === false){
            
            self.loading[position] = true;

            self.loadingImage[position] = document.getElementById("website_loading_"+position);
            
            var i = 0;
            self.fadeOnTimer[position] = setInterval(function(){

                if(i <= 100){
                    self.loadingImage[position].style.opacity = (i / 100);
                    console.log( (i / 100));
                    i++;
                }else{
                    /* add this here allow for the spinner to continue following the pointer until fully faded */
                    self.loading[position] = true;

                    /* stop the timer */
                    clearInterval(self.fadeOnTimer[position]);
                }

            }, 10);
        }
    }
    
    
    /*
     * load
     * 
     * Fade off a loader SVG
     * 
     * @param Interger position The loader poition integer
     */
    this.killLoad = function(position){
        if(self.loading[position] === true){
            var i = 0 ;
            
            self.fadeOffTimer[position] = setInterval(function(){
                
                if(i <= 100){
                    self.loadingImage[position].style.opacity = 1.00 - (i / 100);
                    console.log(1.00 - (i / 100));
                    i++;
                }else{
                    /* add this here allow for the spinner to continue following the pointer until fully faded */
                    self.loading[position] = false;

                    /* stop the timer */
                    clearInterval(self.fadeOffTimer[position]);
                }

            }, 10);
            
        }
        
    }
    
}

window.addEventListener("load", function(){
    var cursorImage = document.getElementById("cursor_image"); 
    
    function toDataURL(src, callback, outputFormat) {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function() {
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          var dataURL;
          canvas.height = this.naturalHeight;
          canvas.width = this.naturalWidth;
          ctx.drawImage(this, 0, 0);
          dataURL = canvas.toDataURL(outputFormat);
          callback(dataURL);
        };
        img.src = src.src;
        if (img.complete || img.complete === undefined) {
          img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
          img.src = src.src;
        }
    }

      toDataURL(
        cursorImage,
        function(dataUrl) {
        window.cursor = new Cursor(dataUrl);
        }
      )
    
    
    
    
});



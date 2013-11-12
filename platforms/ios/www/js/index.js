Parse.initialize("mMS3oCiZOHC15v8OGTidsRgHI0idYut39QKrIhIH", "93nPWcPsKnnoxQqVxmMHt0PlV1oelkbdI7D20QY8");

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {

    state : 0,

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('pause', this.onDevicePause, false);
    },
    
    onDevicePause : function() {
    },
    
    
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.pushNot();
    },
    
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        $("#anim2").hide();
        $("#clicking").hide();

        $(".app").bind('touchstart', this.blinks.bind(this));
        $(".app").bind('touchend', this.switchPage.bind(this));

        var that = this;
        $(".app2").bind('touchend', function() {
            setTimeout(function() {
                $("#anim1").transit({ y : '-210px'}, 200);
                $("#anim2").show('slow');
                $("#anim2").transit({ y : '-120px'}, 100);
            }, 100);
            $("#textfield").focus();
            window.scrollTo( 0, 0);
            $(".app2").bind('touchend', that.switchPage.bind(that));

        });
        
        $("#textfield").keyup(function(event){
          setTimeout(function(){
                window.scrollTo(100, 0);
            }, 0);
        });
    },

    switchPage : function() {
        document.activeElement.blur();
        $("#textfield").blur();
        if (this.state == 0) {
            $(".app").transition({ x: '-90px' }, 400, 'easeOutCubic');
            $(".app2").transition({ x: '-320px' }, 400, 'easeOutCubic');
            document.activeElement.blur();
            $("#textfield").blur();

            $(".app").unbind('touchend');

            this.state = 1;       
        } else {
            $(".app").css("background-image", "url(img/screen4.png)");  
            $("#wrapper").css({'position':'absolute', 'left' :'0px', 'top':'520px'})
            $("#textfield").val('');
            this.state = 0;
        }
    },

    blinks : function() {
        $("#clicking").fadeIn(50);
    },

    pushNot : function() {

        setTimeout(function() {
            Parse.Push.send({
              where: new Parse.Query(Parse.Installation),
              data: { 
                alert : "Rachel Green: Great results from yesterday's campaign!",
                badge : 1
               }
            }, {
              success: function() {  },
              error: function() {  }
            });
        }, 4000);
    }
};

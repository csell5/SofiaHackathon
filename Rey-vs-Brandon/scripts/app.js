(function (global) {
    var app = global.app = global.app || {};

    document.addEventListener('deviceready', function () {
        navigator.splashscreen.hide();

        app.application = new kendo.mobile.Application(document.body, { transition: 'slide', layout: "tabstrip-layout", skin: "Flat" });
    }, false);
    
    // initialize the Everlive API
    var el = new Everlive("oIc9OiwkY3YRDLQs");
    
    // specify what push notification features we want
    // access to on the device as well as events
    var settings = {
      iOS: { badge: true, sound: true, alert: true },
      notificationCallbackIOS: function (e) {  
        // this event gets fired for iOS
          
      },
      notificationCallbackAndroid: function(e) {
        // this event gets fired for Android
      }
    };
    
    // re-registers a device with Everlive
    var reregister = function () {
      var currentDevice = el.push.currentDevice();
    
      // in case we are using the simulator, make a fake token
      if (!currentDevice.pushToken) {
        currentDevice.pushToken = "some token";
      }
    
      return el.push.currentDevice().register();
    };
    
    // add the device to Everlive
    var device = el.push.currentDevice();
    
    // enable notifications on the device 
    // this is what invokes the PushPlugin 
    device.enableNotifications(settings)
    .then(
      function () {
        // we have permission, register the device for notifications
        return device.getRegistration();    
      },
      function(err) {
        // DENIED for some reason
          navigator.notification.alert("error",
			function () { }, "Push notifications are not enabled " + err, 'OK');
          
        console.log("Push notifications are not enabled " + err);
      })
    .then(
      function (e) {
        // this device is already registered - no need to do it again
          navigator.notification.alert("error",
                    function () { }, "Device is already registered: " + JSON.stringify(e), 'OK');
                
        console.log("Device is already registered: " + JSON.stringify(e));
      },
      function (err) {
        // the device is registered, but it's been removed from Everlive
        // re-register it
        if (err.code === 801) {
          reregister();
        }
        else {
          console.log(JSON.stringify(err));
        }
      })
    .then(
      function (registration) {
        if (registration) {
          // we have successfully registered and turned on push notifications
          console.log("Successful registration");
        }
        // if there is an existing registration of the device the function will not receive 'registration' parameter
      },
      function (err) {
        navigator.notification.alert("error", 
			function () { }, "ERROR! An error occured while checking device registration status: " + err.message, 'OK');
                                     
        console.log("ERROR! An error occured while checking device registration status: " + err.message);
      }
    );
    
})(window);

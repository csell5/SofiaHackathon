(function (global) {
    var MessageViewModel,
        app = global.app = global.app || {};

    MessageViewModel = kendo.data.ObservableObject.extend({
        trashTalkMessage: "", 
        trashTalkUrl: "",
   
        // do we want a reply???
        sendMessage: function () {
            console.log("SendMessage func was called");
            
              var that = this,
                trashTalkMessage = that.get("trashTalkMessage").trim(),
                trashTalkUrl = that.get("trashTalkUrl").trim();

            console.log (trashTalkMessage);
            console.log(trashTalkUrl);
            
            if (trashTalkMessage === "") {
                navigator.notification.alert("Y U NO Talk Trash!",
                    function () { }, "Y U NO Talk Some Trash Homie", 'OK');
                return;
            }
            
            // send push notification
        },

    });

    app.messageService = {
        
		//default event when view is shown.
        show = function() {
        
    	},
        
        viewModel: new MessageViewModel()
        
    };
}
)(window);
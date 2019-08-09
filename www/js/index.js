var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
      this.receivedEvent('deviceready');
      var push = PushNotification.init({
          android: {
              senderID: 921201619887
          },
          browser: {
              pushServiceURL: 'https://push-notifications-a6429.firebaseio.com'
          },
      });

      push.on('registration', function (data) {
          console.log('data.registrationI', data.registrationId);
          createEndpoint(data.registrationId);
      });
      push.on('notification', function (data) {
          cordova.plugins.notification.local.schedule({
            title: data.message,
            message: data.message,
        });
      });
      push.on('error', function (err) {
          console.log(err)
          alert('Event=error, message=' + err.message)
      });
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
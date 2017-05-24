'use strict';

self.addEventListener('push', function(event) {
  console.log('Received a push message', event);
  var payload = event.data.json();

  var title = 'Application title';
  var body = payload.notifcation.body; 
  var icon = '/images/icon-192-192.png';
  var tag = 'simple-push-demo-notifcation-tag'; 
  
  event.waitUntil(
    self.registration.showNotification(title, { 
      body: body,
      icon: icon, 
      tag: tag
    })
  );
}); 


self.addEventListener('notificationclick', function(even) { 
  console.log('On notification click'); 
  event.notification.close(); 
  event.waitUntil(clients.matchAll({
    type: 'window'
  }).then(function(clientList) {
     for(var i = 0; i < clientList.length; i++) { 
       var client = clientList[i];
       if(client.url === '/' && 'focus' in client) {
         return client.focus();
       }
     }
    if (clients.openWindow) { 
      return clients.openWindow('/');
    } 
  }));
});




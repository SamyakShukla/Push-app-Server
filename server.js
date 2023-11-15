
//here we are insatlling all the required frameworks like express.js for node 
//web push library is used to implement web push otifications from server to devices
//body parser is used to accept all the request body and convert them to json for better handling
//cors allows us to send requests to our server from our development server

const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;
app.use(cors());

app.use(bodyParser.json());

// vapid is a mechanism used with web push notifications
//public key verifies the origin of web request
//private keys sign the authentication header for the notification
const vapidKeys = {
  publicKey: 'BEazUezPOILApu6uTnb3Y2uypSq9Y9rIuRYseGxmJXo1nn1m4NR14R_i_L3OnBL2aSnWIOECZs4L_J8lTE6--Jg',
  privateKey: 'leuFKo0Du_Uf0Da-vcClK5ZSgGo3aI5MKDp3R4bma7c',
};

webpush.setVapidDetails(
  'mailto:bhullu2021@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// instead of a database here i have used array of objects to showcase basic functionality of web push using service worker
const users = [
  { id: 1, name: 'User 1', email: 'user1@example.com', is_logged_in: true, push_subscriptions: [1] },
  { id: 2, name: 'User 2', email: 'user2@example.com', is_logged_in: true, push_subscriptions: [] },
 

];

//endpoints creation
app.get('/send-notification/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = users.find(u => u.id === userId);
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    if (user.is_logged_in===true &&  user.push_subscriptions.length>0) {
      const notificationPayload = JSON.stringify({ title: 'Notification Title', body: 'Notification Body' });
  
      user.push_subscriptions.forEach(subscription => {
        webpush.sendNotification(subscription, notificationPayload)
          .catch(error => console.error('Error sending push notification:', error));
      });
  
      
      return res.status(200).json({
        message: 'Push notification sent successfully',
        pushSubscription: user.push_subscriptions,
      });
    } else {
      return res.status(201).json({ message: 'User is either not logged in or has no push subscriptions' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

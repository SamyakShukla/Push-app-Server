It makes use of Node.js instead of PHP. <br>
In the Push-app file inside the server folder include all these files of this repo. <br>
I have installed multiple frameworks and libraries to implement the web push notifications. <br>
These are express.js which is a framework for node.js. <br>
Web push library is used to implement web push notifications from server to devices. <br>
Body parser is used to accept all the request body and convert them to json for better handling. <br>
install nodemon to automatically restart server whenever there is a change. <br>
cors allows us to send requests to our server from our development server. <br>
use command: npm install web-push cors express body-parser nodemon. <br>
server is running on port 3001. Run the server using : nodemon server.js<br>
we are using vapid keys mechanism here. <br>
public key verifies the origin of web request. <br>
private keys sign the authentication header for the notification. <br>
not using environment variables here to reduce the need to generate vapid keys. <br>
use command: web-push generate-vapid-keys to generate public and private keys for vapid that is a security mechanism. <br>
Instead of a database here, i am using an array of objects just to showcase the basic functionality of web push using service worker. <br>
Endpoints are created and if user has subscribed to push subscriptions then it will recieve the push notification else not.  <br>
if user is not found then 404 error along with message will be displayed in console. If user has not subscribed then it will get a corresponding message in console but no notification. <br>
Run the server in one terminal and client side react development server in another terminal to make it work.

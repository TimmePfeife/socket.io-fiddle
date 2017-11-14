
# Socket.IO Fiddle

Bug where socket who sends event to himself with socket.to(socket.id).emit(...) does not receive the event.

```
$ npm install
$ npm start # run the server
$ npm run client # run first nodejs client
$ npm run client # run second nodejs client
```

And point your browser to `http://localhost:3000`

After pressing the button 'Trigger Error' you should see a log message at the bot clients but not in the browser.

After pressing the button 'Trigger Working' you should see a log message at all clients.

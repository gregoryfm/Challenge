# Foton Challenge

<p align="center" margin="35">
  <img 
       width="300"
       src="https://raw.githubusercontent.com/gregoryfm/Challenge/master/prints/IMG_4085.PNG" />
  <img 
       width="300"
       src="https://raw.githubusercontent.com/gregoryfm/Challenge/master/prints/IMG_4086.PNG" />
</p>

### Instructions to run the app
> You'll need a mac with node, yarn or npm, brew, mongodb and Xcode installed with Simulator or an iPhone.

-> Open terminal and run the follow commands:
- `$ git clone https://github.com/gregoryfm/Challenge.git`
- `$ sudo mongod`
-  open another terminal tab.
- `$ cd Challenge/server`
- `$ yarn && yarn start` to install dependencies and start server.
-  open another terminal tab.
- `$ cd ..` To go back to the root folder
- `$ cd frontend`
- `$ yarn` to install dependencies from the react native.
- Edit _LOCAL_IP_ with your local IP at `src/ApolloClient.js`.
- `$ react-native run-ios` If you have an iphone connected to your mac, add `--device "DEVICE-NAME"` to install and run it on your device.

### Made with
- Node
- React Native
- React Navigation
- Styled Components
- Apollo
- GraphQL
- MongoDB
- Mongoose
- Flow
- JWT

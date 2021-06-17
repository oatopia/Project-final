# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


## Group 35-nng-r2
member

`1.` Thanapat Tansiri 6009610202

`2.` Kanchana Donmongkol 6009610244


## Directory Tree
Project code has separate two folder

`1.`  Client

This folder has code for client side  

### `Client Structure`
```bash
client
└───src
    ├───Admin_page
    │   ├───Admin.css
    │   ├───Admin.js
    │   ├───Adminfactor.css
    │   └───Adminfactor.js
    ├───component
    │   ├───Dorm
    |   │    ├───Indorm.css
    │   |    └───Indorm.js
    │   ├───Match
    |   │    ├───Match-member.css
    │   |    └───Match-member.js
    │   ├───Navbar
    |   │    ├───Navbar.css
    |   │    ├───Navbar.js
    |   │    ├───NavbarAdmin.css
    |   │    ├───NavbarAdmin.js
    |   │    ├───NavbarMember.css
    |   │    ├───NavbarMember.js
    |   │    ├───NavbarOwner.css
    │   |    └───NavbarOwner.js
    │   ├───showfactor.css
    │   └───showfactor.js
    ├───Dorm_page
    │   ├───addDorm.css
    │   ├───addDorm.js
    │   ├───Dorm_data.css
    │   ├───Dorm_data.js
    │   ├───owner.css
    │   └───owner.js
    ├───img
    │   └───icon
    ├───service
    │   ├───auth-header.css
    │   └───auth-header.js
    ├───User_page
    │   ├───bookdorm.css
    │   ├───bookdorm.js
    │   ├───bookdormDetail.js
    │   ├───dormdetail.css
    │   ├───dormdetail.js
    │   ├───member.css
    │   ├───member.js
    │   ├───resultmatch.css
    │   └───resultmatch.js
    ├───Visitor_page
    │   ├───dormVisitor.js
    │   ├───dormVisitor.js
    │   ├───matchVisitor.css
    │   ├───matchVisitor.js
    │   ├───Visitor.css
    │   ├───Visitor.js
    │   ├───visitorResult.css
    │   └───visitorResult.js
    ├───App.css
    ├───App.js
    ├───index.js
    ├───LoginMember.css
    ├───LoginMember.js
    ├───LoginOwner.css
    ├───LoginOwner.js
    ├───register.css
    ├───register.js
    ├───index.js
    ├───memo.txt
    ├───package-lock.json
    ├───package.json
    └───README.md



```

`2.`  Server

This folder has code for Server side and Backend  

### `Server Structure`
```bash
server
├───config
│   ├───config.js
│   └───Jwt-Config.js
├───controller
│   ├───adminControllers.js
│   ├───DormController.js
│   ├───matchController.js
│   ├───userController.js
│   └───visitorController.js
├───middleware
│   └───Verify.js
├───model
│   ├───adminModel.js
│   ├───DormModel.js
│   ├───matchModel.js
│   ├───ScoringModel.js
│   ├───userModel.js
│   └───visitorModel.js
├───node_modules
├───public
│   ├───images
│   └───img_Dorm
├───rounter
│   ├───AdminRouter.js
│   ├───DormRouter.js
│   ├───matchRouter.js
│   ├───userRouter.js
│   └───visitorRouter.js
├───util
│   ├───calmatch.js
│   ├───database.js
│   └───Jwt-Passports.js
├───package-lock.json
├───package.json
├───Procfile
├───Score_Dorm.txt
└───server.js
```

# Step to install Dorm Matching TU
`1. Push code to github repository` 

You must have github repository after that push code to github repository

\
`2. Create serverapp on Heroku` 

In Heroku create server app. go to setting
 add builpack 
by choose heroku/node.js 
 and second buildpack is
" https://github.com/timanovsky/subdir-heroku-buildpack.git".
 Add config vars by set KEY = "PROJECT_PATH "
 and VALUE = "server". go to deploy menu in 
 deploy method select connect to github with your repository after that deploy branch

\
 `3. Create clientapp on Heroku` 

In Heroku create client app, add builpack 
by use "https://github.com/mars/create-react-app-buildpack "
 and second buildpack is
" https://github.com/timanovsky/subdir-heroku-buildpack.git".
 Add config vars by set KEY = "PROJECT_PATH "
 and VALUE = "client". go to deploy menu in 
 deploy method select connect to github with your repository after that deploy branch

### You can visit my web application by click this Link
[https://matching-dorm-tu-client.herokuapp.com/](https://matching-dorm-tu-client.herokuapp.com/)

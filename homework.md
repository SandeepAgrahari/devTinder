- Create a repository
- initialize the repository
- node_modules, package.json, and package.json.lock file.
- install express
- Create a Server
- Listen on some port
- Write Request Handlers like /test, /hello
- install nodemon and update scripts inside package.json file
- What are dependencies
- Difference between package.json and package.lock.json file
- what is the use of -g while installing any package
- Difference between caret and tilde symbol (^, ~)
- When npm allo update in package version if that is possible

- Initialize the git
- Create a remote repo on github
- Push all code to remote origin
- should we push package.lock.json file on remote origin?
- Play with routes and route extensions .hello, /, .hello/2, /xyz
- order of routes matter a lot
- install postman, create workspace then collection and then add api for testing
- Play with routes and rout handlers for every HTTP Method( GET, POST, PATCH, DELETE)
- Play with routes path using (),\*, +, ?
- Play with route path using regex /\*fly$/
- Set Quer, Params and how to get access of those in code.

- Multiple Route Handlers - Play with the code
- next()
- next function with errors along with res.send()
- app.use('/route', rh, rh2, rh3, rh4, rh5, rh6)
- what is middleware. why we need it.
- how express js basically handles requests behind the scenes.
- difference between app.all() and app.use()
- write a dummy auth middleware for admin
- write a dummy auth middleware for all users except /user/login
- Error Handling using middleware app.use('/', (err, req, res, next))

- Create a free cluster on mongoDB official Website (Mongo Atlas)
- Install mongoose libraray
- connect your application to the database using "connection-url/devTinder"
- call the connectDB function and connect databse before starting the application on port 4000
- create an userSchema and user model
- create POST /signup API to add data into database
- push some documents using API calls from postman
- Error handling using try and catch

- Difference between JSON and Javascript object
- add the express.json() middleware in your app
- Make your signup API dynamic to receive data from the end user
- User.findOne() with duplicate email, which objects it returns
- API - Get user by email
- API - Feed API - /feed - get all users from database
- API - get user by ID
- create a delete user API
- difference between PATCH and PUT
- Explore mangoose model API
- Explore options in findByIdAndUpdate() method

- Explore schematype options from documentation
- add required, unique, lowercase, min, minLength, trim, default etc
- Create a custom validation function for gender
- Improve the DB schema - Put all approprita validations on each field in schema
- Add timestamp to the userSchema
- Add API level validation on Patch request & Signup POST Request
- Data Senitization - Add API validaton for each fields
- Install validator package
- explore validator package functions and use validator functions for photourl
- NEVER TRUST req.body

- validate data in signup API
- install bcrypt package
- Create Password Hash using bcrypt.hash & save the user with encrypted password
- Create Login API
- Write the logic for login API
- Compare the password and throw the error if email and password is invalid

- install cookie-parser
- just send a dummy cookie to user
- create GET /profile API and check if you are getting the cookie back
- install jsonwebtoken
- In login APi , after email and password validation, create a JWT token and send it to user in cookie
- read the cookie inside your profile API and find the logged in user
- userAuth Middleware
- Add the userAuth middleware in the profile and sendConnectionRequest API
- Set the expiry of JWT token and cookies in 7 Days
- Create User Schema Method for getJWT()
- Create User Schema method to comparePassword using password input by user

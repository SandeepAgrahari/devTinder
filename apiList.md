#Dev Tinder API List

##authRouter

    POST /login
    POST /signup
    POST /logout

##profileRouter

    GET /profile/get
    PATCH /profile/edit
    PATCH /profile/password

##connectionRequestRouter

    POST /request/send/interested/:userId
    POST /request/send/ignored/:userId
    POST /request/review/accepted/:requestId
    POST /request/review/rejected/:requestId

##userRouter

    GET /user/connections
    GET /user/requests
    GET /user/feed

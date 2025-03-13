#Dev Tinder API List

##authRouter

    POST /login
    POST /signup
    POST /logout

##profileRouter

    GET /profile/get
    PATCH /profile/edit
    PATCH /profile/password

##connectionRouter

    POST /connection/send/interested/:userId
    POST /connection/send/ignored/:userId
    POST /connection/review/accepted/:requestId
    POST /connection/review/rejected/:requestId

##userRouter

    GET /user/connections
    GET /user/requests
    GET /user/feed

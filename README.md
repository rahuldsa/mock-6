# Air Ticket Booking

This is a backend application for an Air Ticket booking system that allows users to book flights for their desired destinations.

## Features
Login / Signup
Creating a Flight
Get all Flights
Get a Flight by ID
Update a Flight
Delete a Flight
Creating a Booking
Check all bookings

## Tech Stack Used
Node.js, Express.js, Mongoose

Database: MongoDB

## Run Locally
Install dependencies- npm install
Start the server- npm run server

## Environment Variables
To run the project, you will need to add a .env file

`mongoURL`
`PORT`
`salt`
`secret`

## API's

POST - /api/register:
Description: This endpoint allows users to register.
Status Code: 201

POST - /api/login:
Description: This endpoint allows users to log in.
Status Code: 201

GET - /api/flights:
Description: This endpoint returns a list of all available flights.
Status Code: 200

GET - /api/flights/:id:
Description: This endpoint returns the details of a specific flight identified by its ID.
Status Code: 200

POST - /api/flights:
Description: This endpoint allows users to add new flights to the system.
Status Code: 201

PUT / PATCH - /api/flights/:id:
Description: This endpoint allows users to update the details of a specific flight identified by its ID.
Status Code: 204

DELETE - /api/flights/:id:
Description: This endpoint allows users to delete a specific flight identified by its ID.
Status Code: 202

POST - /api/booking:
Description: This endpoint allows the user to book flights.
Status Code: 201

GET - /api/dashboard:
Description: This endpoint lists all the bookings made so far with the user and flight details.
Status Code: 200
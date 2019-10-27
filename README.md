# Skincare Discovery


Live link : [Heroku link](https://ancient-woodland-71089.herokuapp.com/)




## Getting Started

- Clone the repository and run npm i
- Create local Postgresql databases: skincaredb and skincaredbtest
- Run `mv example.env .env` and provide the local database locations within your .env file
- Run `npm run migrate` and `npm run migrate:test` to update each database
- To seed, use terminal to enter root of application and run: `psql -d huddle -f ./seeds/seed.skincare_products.sql`
- Run `npm run dev` to start the server locally


## Endpoints


1. GET /skincare that returns a list of skincare products. 

2. DELETE /skincare/:id that deletes the skincare product with   
  the given ID.

3. GET /skintype that returns a list of each skintype to figure out your skintype.

4. GET /reviews that returns a list of reviews posted by the users making their reccomendation for the product that worked for them.

5. POST /reviews that accepts a JSON object representing a review and adds it to the list of reviews after validation.
  Review POST includes: 
 - name : name of your recommnendation product 
 - rating: rate based on your experience 
 - comment: comment down briefly about the product
 
 
6. DELETE /reviews/:id that deletes the reviews with the given ID.

## Summary 

Skincare Discovery was created to solve the issue of most people using the wrong products on their skin. 
With this application it lets your first find out your skintype and lets you build a 5 Steps Skin Care Routine based on your skin type. Also made for all user to have a easy experience in finding the right product for their skin within their price point. 



## Technologies: 

  - Node 
  - Express, 
  - PostgreSQL
  - Heroku



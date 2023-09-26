# Little Birdie

This is a public microblogging site where users can share their thoughts with the world!

Note: It is intentionally built to be insecure. In particular, it is vulnerable to XSS and SQL injection attacks.

Live site is here: https://little-birdie.onrender.com/

## Challenge 1 - XSS

XSS or Cross-site scripting attacks are where malcious code (usually Javascript) can be injected into and otherwise trusted site.

1. Find a way to insert some of your own JavaScript into the site, so that it runs for everyone when they use the app.
   - Hint: Consider how you could insert an `iframe` or a `script` tag into the DOM.
2. Make it so that when someone loads the page, it `console.log`'s a message that you're the best hacker (use your name to claim credit)
3. Fix the code so that it's no longer possible for someone to insert scripts

## Challenge 2 - SQL injection

1. Find a way to cause the server to crash
2. Find a way to break the app entirely by deleting tables in the database.
2. Fix the code so that it's no longer possible for someone to break the site like that.

## Running the code locally

1. Clone this repo

2. Install the dependencies

```
yarn
```

3. Set up the database

```
cat schema.sql | psql
```

4.Create the environment variables in a file called `.env`

```
EXPRESS_SESSION_SECRET_KEY="something random here"
```

5. Run the server

```
yarn start
```

# Meta - UNIHACK 2019

## Inspiration
As members of today's youth, we are constantly being fed curated news through sources like Facebook, Twitter, Reddit etc. The sheer enormity of information makes it difficult for the average consumer to be mindful and take control of the news they consume. As a result, it is difficult to check their personal biases and explore new areas of interest.

## What it does
Meta is a self-improvement web app that provides statistics on the type of news articles consumed by a user. By providing a platform to analyse data like news sources and topic categories, we put the meta-data back in the hands of the user. The aim is to be completely unbiased and merely provide data to be reflected upon and. The onus is on users to act and take control as they see fit. Users can set personal goals, e.g to read 70% technology news, 20% business news, and 10% sports news - users can then see how they are tracking along with their goals.

## How it works
Meta works with 2 components: Users use a browser extension which will pop-up to prompt the user to add news links to the database. Meta then processes the source and content of these articles to search out qualitative metrics on the user's news history (e.g. frequency of news sites visited / most read topics), displaying them in useful and digestable graphics. Using this information, the user may begin a reflective process to discover information gaps and one-sidedness in their own readings.

## How we built it
We built the web app using React for the frontend, express.js for authentication and sessioning, charts.js for data presentation, and materialize-react for styling.

On the backend, we favoured node.js, Python and a REST API for interacting with our app starter. We processed the source and content of news links with a NLP tool TextRazor. We also used MongoDB as our database.

## Challenges we ran into
* Incorporating a full authentication system involving the MERN stack and passport.js which took much longer than expected
* Inexperience with UI design and styling, a lot of it was learnt on the go
* Trying to understand the new technologies, as for some it was our first experience with it

## Accomplishments that we're proud of
We're proud to have built a functioning web app that incorporates many different elements of our stack in such a short amount of time. We're also proud of how well we've worked together as a team, and how well we've supported each other through the hackathon.

## What we learned
Many of us learnt how to use new technologies that we had not used before, and now have a better understanding of the full stack of a web app from creation.

## What's next
To extend the functionality to mobile and integrate with an existing news app like Google News.


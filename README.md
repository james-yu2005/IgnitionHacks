Inspiration
We were inspired by the vast potential of GPT Models, and their ability to make inferences across large datasets that humans or traditional search engines might miss. We wanted to channel this insight into a project which connects users intelligently as opposed to algorithmically.

What it does
Talent Trade is a website where users can upload a portfolio demonstrating a skill they have in order to be connected to other people so that they can "swap" skills, both teaching each other and "trading talents", hence the name. When a user uploads their skill, it is not posted online, it is instead added to a database that our AI (Talent ED) can access and make connections from. This differentiates Talent Trade from other skill swapping websites as you make only the most fitting connections based on your conversation with the AI rather than having users sift through other peoples' profiles.

How we built it
We developed the app using React.js for the front end to display pages and user information. For email verification, we integrated email-js to send a code that users needed to cross-check. All user input data was stored in Supabase tables, while files were saved in Supabase Storage and provided as downloadable links. The chatbot was built using the OpenAI API, connected to the backend which was powered by Node.js and Express.js. In production, we deployed the frontend with Vercel and the backend with Heroku, ensuring they work together seamlessly.

Challenges we ran into
First, we faced the challenge of maintaining user authentication throughout the session. Instead of implementing an open session feature, we relied on a global variable to monitor the user ID and retrieve existing data from the database. Next, integrating the OpenAI API presented difficulties, as this was our first experience using an API to build a chatbot. We had to test it extensively using the website's console and invest significant time in training the model. Finally, deploying the finalized website was challenging. Although the project ran smoothly on our local machines, deploying it to platforms like Vercel and Heroku proved to be time-consuming.

Accomplishments that we're proud of
Full stack developed and deployed
Full AI assistant coded into the website with context designed to keep it well behaved
QOL features: Form autofills, only one account per email, auto-resizing buttons on the website
Automated custom emails sent with the push of a button
What we learned
Through this project, we learned a lot about teamwork and perseverance as we had to spread ourselves thin to finish the project. Each person had distinct contributions to the project, including UI design, backend infrastructure, frontend code, etc... It was definitely a difficult project, but we came through in the end and deployed it. Moreover, we learned not to be too ambitious with our ideas as we overestimated ourselves at the start and had to regroup around the halfway point when we realized we had too much to code. Overall, our first hackathon was filled with great memories and learning experiences and we're excited to participate sometime in the future.

What's next for Talent Trade
Right now the big feature we wanted to roll out but didn't have time to is an advanced auto-recontexting system for our AI, allowing it to have real memories of past conversations and further enhancing the ease of the connection process.

See our project demo: https://devpost.com/software/talent-trade

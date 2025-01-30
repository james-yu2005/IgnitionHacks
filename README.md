## Inspiration

We were inspired by the vast potential of **GPT Models**, and their ability to make inferences across large datasets that humans or traditional search engines might miss. We wanted to channel this insight into a project that connects users intelligently, as opposed to algorithmically.

## What It Does

**Talent Trade** is a website where users can upload a portfolio demonstrating a skill they have in order to be connected to other people to "swap" skills. Users teach each other and "trade talents", hence the name. When a user uploads their skill, it is not posted online; it is added to a database that our AI (**Talent ED**) can access and make connections from. This differentiates **Talent Trade** from other skill-swapping websites because you make only the most fitting connections based on your conversation with the AI, rather than sifting through other people's profiles.

## How We Built It

We developed the app using **React.js** for the front end to display pages and user information. For email verification, we integrated **email-js** to send a code that users needed to cross-check. All user input data was stored in **Supabase tables**, while files were saved in **Supabase Storage** and provided as downloadable links. The chatbot was built using the **OpenAI API**, connected to the backend powered by **Node.js** and **Express.js**. In production, we deployed the frontend with **Vercel** and the backend with **Heroku**, ensuring they work together seamlessly.

## Challenges We Ran Into

- Maintaining user authentication throughout the session was challenging. Instead of implementing an open session feature, we relied on a global variable to monitor the user ID and retrieve existing data from the database.
- Integrating the **OpenAI API** presented difficulties as it was our first experience using an API to build a chatbot. We had to test it extensively using the website's console and invest significant time in training the model.
- Deploying the finalized website was challenging. Although the project ran smoothly on our local machines, deploying it to platforms like **Vercel** and **Heroku** proved to be time-consuming.

## Accomplishments That We're Proud Of

- Full-stack development and deployment
- Fully integrated **AI assistant** with context designed to keep it well-behaved
- **Quality of Life** features: form autofills, one account per email, and auto-resizing buttons on the website
- Automated custom emails sent with the click of a button

## What We Learned

Through this project, we learned a lot about teamwork and perseverance, as we had to spread ourselves thin to finish the project. Each person had distinct contributions, including UI design, backend infrastructure, and frontend code. It was definitely a challenging project, but we came through and deployed it successfully. We also learned not to be too ambitious with our ideas, as we overestimated ourselves at the start and had to regroup halfway when we realized we had too much to code. Overall, our first hackathon was filled with great memories and learning experiences, and we're excited to participate again in the future.

## What's Next for Talent Trade

Right now, the big feature we wanted to roll out but didn't have time to is an **advanced auto-recontexting system** for our AI, allowing it to remember past conversations and further enhance the connection process.

### See Our Project Demo:
[https://devpost.com/software/talent-trade](https://devpost.com/software/talent-trade)

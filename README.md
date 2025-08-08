1. Frontend Application for a Furniture E-commerce Store
2. Front-end: React.js
3. JSON Server
4. Steps to Run the Project
5. Open the project in VS Code
6. Open terminal and change the Powershell to Command Prompt

Step 6.1 – Start JSON Server:

write these Commands in command prompt

Navigate to the db folder:
cd db

Run the JSON Server:
json-server --watch products.json --port 8000

You’ll see the server starting at http://localhost:8000

Step 6.2 – Run the React Frontend:

Open another terminal tab

Navigate to the frontend folder:
cd frontend

Install dependencies:
npm install

Start the frontend app:
npm run dev

Now you can see the project will open in the browser.

Note:
If you don’t run the JSON Server first, the frontend will not work.
Always start the JSON Server before the frontend.

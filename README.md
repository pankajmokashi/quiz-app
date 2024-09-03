# Quiz App
This Quiz App is a web-based application developed using the MERN stack, Tailwind CSS for styling, Redux for state management, and a Trivia API for fetching quiz questions.

https://github.com/user-attachments/assets/7ecab225-ea34-4c37-b2a1-51042c9de940

### Features
1. User Authentication:
- Sign Up/Login: Users can create an account or log in to access quizzes.
- Session Management: JWT tokens are used for session management.
2. Quiz Functionality:
- Category Selection: Users can choose from different quiz categories.
- Difficulty Levels: Quizzes can be taken at various difficulty levels.
- Multiple-Choice Questions: Questions are presented in a multiple-choice format.
- Timer: A countdown timer is implemented for each question.
3. Responsive Design:
- The app is designed to work across different screen sizes, from mobile to desktop.
4. API Integration:
- Trivia API: Used to fetch quiz questions.
- Custom API Endpoints: Backend APIs for user management, quiz data, and results.

### APIs
- POST /register: Register a new user.
- POST /login: Authenticate a user and generate a JWT token.
- GET /categories: Retrieve available quiz categories.
- POST /questions: Fetch quiz questions based on selected category and difficulty.
- POST /save-quiz: Save the user's quiz results to the database.
- POST /user-quizzes/:userid: Retrieve all quizzes taken by the user.

### Challenges Encountered
- Project Flow and Architecture: Deciding the overall flow of the project, including how to manage state and API integration.

### How to Run the Project
- Clone the Repository:
```
git clone https://github.com/pankajmokashi/quiz-app.git
```
Backend:
1. Install Dependencies:
```
cd backend
npm install
```
2. Set Up Environment Variables:
- Create a .env file in the root directory with the following:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
3. Start the Server:
```
npm start
```

Frontend:
1. Install Dependencies:
```
cd ../frontend
npm install
```
2. Start the Application:
```
npm start
```

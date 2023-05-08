# <img src='/src/assets/Staxx-fav.png'/> Study Staxx 

### Author

- Tom Birbeck - [LinkedIn](https://www.linkedin.com/in/tom-birbeck-036356248/) / [GitHub](https://github.com/TomBirbeck)

## Overview

A web app that enables a student to create/edit tasks and track their progress on those tasks, with an added parent side to view how a student is doing and clear tasks that the student has completed.
The app uses Auth0 to handle signing up/signin and has a number of backgrounds that a user can choose from in order to personalise their experience.

## Tech Stack
- Vite
- React
- React-router
- Typescript
- Tailwind CSS
- Auth0

## Installation

Clone down the github repository and use npm i to install all the dependencies.
Due to the use of Auth0 you will need an account with them so that you can obtain the client Id and Domain that you will need to run a version of the app.

### App layout

## Login

The login component uses user, isAuthenticated, isLoading, and loginWithRedirect from Auth0 and has 1 state, 'person'.
When a user first enters the website the component will check to see if they are a registered user, using the findStudent and findParent functions, and if they have authorisation.\
If they have neither, they will be shown the Auth0 sign up, if they are authorised but are not a user in the database they will be shown the form to complete their sign up. If they are a user and authorised then they will be redirected to their home page.

## Student Homepage

The student home page has states for, tasks, student, progress, total, open menu, open staxx, and theme. It uses the user from Auth0 and context from ThemeContext for it's display.

- Student: An object containing; student_id, firstname, surname, studentEmail, and student_code. This is populated using the getStudent function, which uses the user.email to get the information from the database. Passed down to the sidemenu component.

- Tasks: A lists of the tasks for that student, contained in the database. This is populated using the getTasks function, which uses the student_code from the student object.The tasks are passed down to the task component.

- Progress: This is the percentage of tasks that the users has completed. The function for this runs inside of the progress component.

- Total: This is the total number of tasks return when getTasks is called and is used when calculating the progress. Passed down to the progress component.

- Open menu: This states tracks whether or not the side menu is open.

- Open staxx: This state tracks the opening and closing of the new task form.

- Theme: This state is used to track the theme that the uses has selected and show the correct background image and colour scheme.

The createTask function is used to collect the information for a new task and submit it into the database.
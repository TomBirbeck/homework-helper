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

## App layout

### Login

The login component uses user, isAuthenticated, isLoading, and loginWithRedirect from Auth0 and has 1 state, 'person'.
When a user first enters the website the component will check to see if they are a registered user, using the findStudent and findParent functions, and if they have authorisation.\
If they have neither, they will be shown the Auth0 sign up, if they are authorised but are not a user in the database they will be shown the form to complete their sign up. If they are a user and authorised then they will be redirected to their home page.

### Student Homepage

The student home page has states for, tasks, student, progress, total, open menu, open staxx, and theme. It uses the user from Auth0 and context from ThemeContext for it's display.

- Student: An object containing; student_id, firstname, surname, studentEmail, and student_code. This is populated using the getStudent function, which uses the user.email to get the information from the database. Passed down to the sidemenu component.

- Tasks: A lists of the tasks for that student, contained in the database. This is populated using the getTasks function, which uses the student_code from the student object.The tasks are passed down to the task component.

- Progress: This is the percentage of tasks that the users has completed. The function for this runs inside of the progress component.

- Total: This is the total number of tasks return when getTasks is called and is used when calculating the progress. Passed down to the progress component.

- Open menu: This states tracks whether or not the side menu is open.

- Open staxx: This state tracks the opening and closing of the new task form.

- Theme: This state is used to track the theme that the uses has selected and show the correct background image and colour scheme.

The createTask function is used to collect the information for a new task and submit it into the database.

### Parent Homepage

This component contains the states student, parent, api, openMenu, and theme as well as the user object from Auth0 and the context from ThemeContext for the display.

- Student: This is the unqiue id for the student. It is populated using the getStudent function, which uses the user.email (is this case it will the email of a parent) to get the users information from the database. A parent's information will come with a student_code attatched.

- Parent: This is an object conataining a parentId, firstname, surname, parentEmail, and childId. It is populated using the getStudent function. Passed to the side menu component.

- Api: This is the list of tasks for the parent's child. It is populated using the getTasks function, which uses the childId from the parent object. Passed to the parent tasks component.

- Open menu: This state tracks whether or not the side menu is open.

- Theme: This state is used to track the theme that the uses has selected and show the correct background image and colour scheme.

### TasksList

This component takes in props of the Iprops type and then they are deconstructed. It contains states for dueSoon, overdue and theme, as well as using the context of ThemeContext to control it's display properties.

- dueSoon: This state is used to track whether or not a task is due within the next 3 days.

- overdue: This state is used to track whether or not a task's due date has expired.

- theme: This state is used to keep track of the users desired theme.

This component contains the handleComplete function which will update the database when the user changes the status of the task, and the handleDelete function which will update the database when the user selects to delete a completed task. On the student side, the task still exists in the database, but will no longer be visible to them.

### Tasks

This component takes in props of a tasks array and the getTasks function. It contains the states for windowSize, editOpen and updatedTask.

- Window size: This state is updated to track the current size of the viewing window, it is used to conditionally render certain parts of the UI.

- Edit open: This state tracks whether or not the edit task menu is open.

- Updated task: This state is used to track the data from a for a task that is being updated by the user.

The updateTask function will update the task information in the database whenever a task is edited.

The sortComplete function is used to check through the items in the tasks array and only display ones that aren't stored as 'completed' in the database. The sortPrio function is used to order the tasks based on their priority.
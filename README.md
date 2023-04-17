## Ignite-node-js-1-tasks-API

This challenge is a API built with Node Js. That is my first contact doing Back End using Node. This API implements Routes to store and manage data about tasks.

The challenge requirements are in the following topics.

## About the challenge

In this challenge, the objective is to develop an API to perform CRUD operations tasks.

The API must have the following functionalities:

- Create a task
- List all tasks
- Update a task by id
- Remove a task by id
- Mark a task as complete by id
- And the real challenge: Bulk import of tasks from a CSV file

## Routes and business rules

The structure (properties) that a task must have:

- id - Unique identifier for each task
- title - Title of the task
- description - Detailed description of the task
- completed_at - Date when the task was completed. The initial value must be null
- created_at - Date when the task was created
- updated_at - Must always be updated to the date when the task was updated.

Routes: 

`POST - /tasks`

It should be possible to create a task in the database by sending the title and description fields in the request body. When creating a task, the fields id, created_at, updated_at, and completed_at should be automatically filled in, according to the guidelines above.

`GET - /tasks`

It should be possible to list all tasks saved in the database. It should also be possible to perform a search by filtering tasks by title and description.

`PUT - /tasks/:id`

It should be possible to update a task by id. In the request body, it should only receive the title and/or description to be updated. If only the title is sent, it means that the description cannot be updated, and vice versa. Before performing the update, a validation must be made to check if the id belongs to a task saved in the database.

`DELETE - /tasks/:id`

It should be possible to remove a task by id. Before performing the removal, a validation must be made to check if the id belongs to a task saved in the database.

`PATCH - /tasks/:id/complete`

It should be possible to mark the task as complete or not. This means that if the task is completed, it should return to its "normal" state. Before making the change, a validation must be made to check if the id belongs to a task saved in the database.

## Installation 

1. Git clone `gh repo clone CristianoAlchaar/ignite-node-js-1-tasks-API`
2. Open a terminal and cd /01-challenge-node-js `run npm install`
3. `npm run dev` to start server. By default, the port number is 3333

To read csv do the following:
1. On another terminal cd /01-challenge-node-js and `npm run read-csv` 
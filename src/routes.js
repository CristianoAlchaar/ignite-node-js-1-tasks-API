import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { search } = req.query
            
            const tasks = database.select('tasks', {
                title: search,
                description: search
              })

            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const {title, description} = req.body

            if (!title || !description)  {
                return res.writeHead(400).end(JSON.stringify({message: 'Title and description are required'}))
            }

            const task = {
                id: randomUUID(),
                title: req.body.title,
                description: req.body.description,
                completed_at : null,
                createdAt: Date.now(),
                updated_at: Date.now(), 
            }
    
            database.insert('tasks', task)
    
            return res.writeHead(201).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => { 
            const { id } = req.params

            database.delete('tasks', id)

            return res.writeHead(204).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
          const { id } = req.params
          const { title, description } = req.body
            
            if (!title && !description)  {
                return res.writeHead(400).end(JSON.stringify({message: 'Title or description are required'}))
            }

            const [task] = database.select('tasks', { id })

            if (!task) {
                return res.writeHead(404).end()
            }

            const updates = {};
            if (title) {
                updates.title = title;
            }
            if (description) {
                updates.description = description;
            }
            updates.updated_at = new Date();

            console.log(updates)
            database.update('tasks', id, updates)
        
            return res.writeHead(204).end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req,res) => {
            const { id } = req.params

            const [task] = database.select('tasks', { id })

            if (!task) {
                return res.writeHead(404).end()
            }

            const isTaskCompleted = !!task.completed_at
            const completed_at = isTaskCompleted ? null : Date.now()

            database.update('tasks', id, {completed_at})

            return res.writeHead(204).end()
        }
    },
]
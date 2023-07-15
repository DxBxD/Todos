import { showSuccessMsg } from '../services/event-bus.service.js'
import { todoService } from '../services/todo.service.js'

export default {
    template: `
        <main class="homepage-main">
            <section class="homepage-intro">
                <h2>Todos, Todos...</h2>
                <p>
                    Todos App is your go-to application for managing your tasks and getting more organized. 
                    Add new tasks, mark tasks as completed, delete tasks you no longer need, and filter your tasks to find exactly what you're looking for. 
                    All your tasks are saved in your browser, so they're always there when you need them. 
                    Let's get started on being more productive today!
                </p>
            </section>
        </main>
    `,
}
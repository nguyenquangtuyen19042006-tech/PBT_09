
const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const countEl = document.querySelector("#count");
const clearCompletedBtn =
    document.querySelector("#clearCompleted");

let todos =
    JSON.parse(localStorage.getItem("todos")) || [];

let currentFilter = "all";

function saveTodos() {
    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );
}

function updateCount() {
    const count = todos.filter(
        todo => !todo.completed
    ).length;

    countEl.textContent =
        `${count} items left`;
}

function renderTodos() {
    todoList.innerHTML = "";

    let filtered = todos;

    if (currentFilter === "active") {
        filtered = todos.filter(
            todo => !todo.completed
        );
    }

    if (currentFilter === "completed") {
        filtered = todos.filter(
            todo => todo.completed
        );
    }

    filtered.forEach(todo => {
        const li = document.createElement("li");
        li.className = "todo-item";
        li.dataset.id = todo.id;

        const span =
            document.createElement("span");

        span.className =
            "todo-text" +
            (todo.completed
                ? " completed"
                : "");

        span.textContent = todo.text;

        const btn =
            document.createElement("button");

        btn.className = "delete-btn";
        btn.textContent = "❌";

        li.append(span, btn);
        todoList.appendChild(li);
    });

    updateCount();
    saveTodos();
}

todoForm.addEventListener("submit", e => {
    e.preventDefault();

    const text = todoInput.value.trim();

    if (!text) return;

    todos.push({
        id: Date.now(),
        text,
        completed: false
    });

    todoInput.value = "";

    renderTodos();
});

todoList.addEventListener("click", e => {
    const li = e.target.closest("li");

    if (!li) return;

    const id = Number(li.dataset.id);

    if (
        e.target.classList.contains(
            "delete-btn"
        )
    ) {
        todos = todos.filter(
            todo => todo.id !== id
        );

        renderTodos();
    }

    if (
        e.target.classList.contains(
            "todo-text"
        )
    ) {
        const todo = todos.find(
            t => t.id === id
        );

        todo.completed =
            !todo.completed;

        renderTodos();
    }
});

todoList.addEventListener(
    "dblclick",
    e => {
        if (
            !e.target.classList.contains(
                "todo-text"
            )
        )
            return;

        const li =
            e.target.closest("li");

        const id = Number(
            li.dataset.id
        );

        const input =
            document.createElement(
                "input"
            );

        input.value =
            e.target.textContent;

        e.target.replaceWith(input);

        input.focus();

        input.addEventListener(
            "keydown",
            ev => {
                if (
                    ev.key === "Enter"
                ) {
                    const todo =
                        todos.find(
                            t =>
                                t.id ===
                                id
                        );

                    todo.text =
                        input.value.trim();

                    renderTodos();
                }
            }
        );
    }
);

document
    .querySelector(".filters")
    .addEventListener("click", e => {
        if (
            !e.target.dataset.filter
        )
            return;

        currentFilter =
            e.target.dataset.filter;

        renderTodos();
    });

clearCompletedBtn.addEventListener(
    "click",
    () => {
        todos = todos.filter(
            todo => !todo.completed
        );

        renderTodos();
    }
);

renderTodos();


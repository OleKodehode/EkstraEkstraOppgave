function filterResult() {
  const userid_value = document.getElementById("userid_box").value;

  clearMain();
  populateArticles(userid_value);
}

function clearFilter() {
  document.getElementById("userid_box").value = "";

  clearMain();
  populateArticles();
}

function populateArticles(userId = undefined) {
  // Call on todo.js's function to populate the main_container
  todoList
    .fetchTodos(userId ? userId : undefined)
    .then((todos) => {
      for (const todo of todos) {
        // ... Add the todo-entry to the DOM here!
        // Create Checkbox - Add checked if task is completed
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        if (todo.completed) {
          checkbox.setAttribute("checked", true);
        }

        // Create the paragraph for the task text
        const task_text = document.createElement("p");
        task_text.innerText = todo.title;

        // Use the utility script to create an article container for the todo item
        // and append it to main
        createAndAppendElement(
          main_container,
          "article",
          {
            class: `userID-${todo.userId}`,
            id: `taskID-${todo.id}`,
          },
          [checkbox, task_text]
        );
      }
    })
    // If there is an error, we log it and set the todos to null
    .catch((error) => {
      console.error("Error fetching todos:", error);
      todoList.todos = null;
    })
    .finally(() => {
      // If the todos are null, we log a message
      if (todoList.todos === null) {
        console.log("No todos found");
        // Add some user-friendly feedback to the DOM.
        createAndAppendElement(
          document.body,
          "p",
          {
            class: "feedback",
            id: "feedback",
          },
          ["No todos found"]
        );
      }
    });
}

function clearMain() {
  // clear main container of items
  const main_container = document.getElementById("main_container");
  while (main_container.firstChild) {
    main_container.removeChild(main_container.firstChild);
  }
}

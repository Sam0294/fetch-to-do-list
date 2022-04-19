import React, { useState, useEffect } from "react";

const Home = () => {
	const [tasks, setTasks] = useState("");
	const [todo, setTodo] = useState([]);

	useEffect(() => {
		getTodoList();
	}, []);

	const getTodoList = async () => {
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/sam0294",
			{
				method: "GET",
				/* body: JSON.stringify(data), NO ES NECESARIO PARA GET */
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const data = await response.json();
		setTodo(data);
	};

	const refreshTodoList = async (newList) => {
		await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/sam0294",
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newList),
			}
		);
	};

	const addTask = (e) => {
		if (tasks.trim() !== "") {
			if (e.key === "Enter") {
				const newTodos = todo.concat({
					label: tasks,
					done: false,
					id: todo.length + 1,
				});
				setTodo(newTodos);
				refreshTodoList(newTodos);
				setTasks("");
			}
		}
	};

	const removeItem = (tasksIndex) => {
		const removeTask = todo.filter((tasks, index) => index != tasksIndex);
		setTodo(removeTask);
		refreshTodoList(removeTask);
	};

	return (
		<div>
			<div className="back bg-light mx-auto w-75">
				<div className="mb-3 w-50 mx-auto mt-4 ">
					<label htmlFor="exampleInputEmail1" className="form-label ">
						To do List
					</label>
					<input
						type="text"
						className="form-control"
						aria-describedby="emailHelp"
						placeholder="tarea"
						value={tasks}
						onKeyPress={addTask}
						onChange={(e) => {
							setTasks(e.target.value);
						}}
					/>
					<br />
					<div>
						{todo.map((todo, index) => {
							return (
								<li
									className="list-group-item justify-content-evenly "
									key={index}>
									{todo.label}
									<button
										className="btn btn-light ml-80px"
										onClick={() => removeItem(index)}>
										<i className="fas fa-times"></i>
									</button>
								</li>
							);
						})}
					</div>
					<div className="form-text">
						{todo.length == 0
							? "no hay tareas pendientes"
							: todo.length + " " + "tareas"}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;

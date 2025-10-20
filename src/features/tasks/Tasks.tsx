import "./Tasks.css";

function Tasks() {
	return (
		<div className="tasks-container">
			<div className="tasks-header">
				<h1 className="tasks-title">Issue Tracker Board</h1>
				<p className="tasks-subtitle">Gain insights into project progress and team performance</p>
			</div>

			<div className="tasks-controls">
				<div className="tasks-search-section">
					<input
						className="tasks-search"
						type="text"
						name="search"
						id="search"
						placeholder="Search task by title, tags"
					/>

					<div className="tasks-filter-group">
						<label className="tasks-filter-label" htmlFor="assignees">
							Sort by Assignee
						</label>
						<select className="tasks-filter-select" name="assignees" id="assignees">
							<option value="Thomas">Thomas</option>
							<option value="Angie">Angie</option>
						</select>
					</div>

					<button className="tasks-button tasks-button--secondary" type="button">
						Sort by Severity
					</button>
				</div>

				<div className="tasks-actions">
					<button className="tasks-button tasks-button--secondary" type="button">
						Recently viewed
					</button>
					<button className="tasks-button tasks-button--primary" type="button">
						Add Task
					</button>
				</div>
			</div>
		</div>
	);
}

export default Tasks;

import { useEffect, useState } from "react";
import fetchIssues from "../../../api";
import Input from "../../../components/form/Input";
import store from "../../../store/store";
import BackLogColumn from "../components/BackLog";
import DoneColumn from "../components/Done";
import InProgressColumn from "../components/InProgress";
import "../style/Tasks.css";

function IssueBoard() {
	const { issues, setIssues } = store.getState();

	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		setLoading(true);

		fetchIssues()
			.then((issues) => {
				const backlog = issues.filter((issue) => issue.status === "backlog");
				const inProgress = issues.filter((issue) => issue.status === "inProgress");
				const done = issues.filter((issue) => issue.status === "done");

				setIssues({ backlog, inProgress, done });
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return (
		<div className="tasks-container">
			<div className="tasks-header">
				<h1 className="tasks-title">Issue Tracker Board</h1>
				<p className="tasks-subtitle">Gain insights into project progress and team performance</p>
			</div>

			<div className="tasks-controls">
				<div className="tasks-search-section">
					<Input />

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
				</div>
			</div>

			<div className="tasks-columns">
				<BackLogColumn loading={loading} />
				<InProgressColumn loading={loading} />
				<DoneColumn loading={loading} />
			</div>
		</div>
	);
}

export default IssueBoard;

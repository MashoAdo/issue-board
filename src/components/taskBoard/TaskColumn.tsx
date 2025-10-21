type TTask = {
	id: number;
	title: string;
	description: string;
	dateCreated: string;
	tags: string[];
	severity: number;
	userDefinedRank: number;
};

interface TaskColumnProps {
	title: string;
	tasks: TTask[];
}

function TaskColumn({ title, tasks }: TaskColumnProps) {
	const count = tasks.length;

	return (
		<div style={{ flex: 1 }}>
			<div
				style={{
					display: "flex",
					border: "1px solid lightgray",
					borderRadius: "8px",
					padding: "4px 8px",
				}}
			>
				<p>{title}</p>
				<span style={{ marginLeft: "8px", color: "gray" }}>({count})</span>
			</div>

			<div>
				{tasks.map((task) => (
					<div key={task.id} style={{ height: "100%", marginTop: "32px" }}>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "10px",
								border: "1px solid lightgray",
								borderRadius: "8px",
								padding: "12px 8px",
							}}
						>
							<h4>{task.title}</h4>

							<p style={{ color: "gray" }}>{task.description}</p>

							<div style={{ display: "flex", gap: "16px" }}>
								{task.tags.map((tag, idx) => (
									<div
										key={idx}
										style={{
											border: "1px solid lightgray",
											borderRadius: "6px",
											padding: "2px 4px",
											fontSize: "12px",
										}}
									>
										{tag}
									</div>
								))}
							</div>

							<div style={{ backgroundColor: "lightgray", height: "1px" }}></div>

							<div style={{ display: "flex", justifyContent: "space-between" }}>
								<div>{task.dateCreated}</div>

								<div style={{ color: "red" }}>Priority {task.severity}</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default TaskColumn;

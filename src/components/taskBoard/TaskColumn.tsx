import type { TIssue } from "../../types";

interface IssueColumnProps {
	title: string;
	tasks: TIssue[];
	loading: boolean;
}

function IssueColumn({ title, tasks, loading }: IssueColumnProps) {
	const count = tasks.length;

	return (
		<div
			style={{
				flex: 1,
				height: "100%",
				display: "flex",
				flexDirection: "column",
				minHeight: 0, // Important for flex children to shrink
			}}
		>
			<div
				style={{
					display: "flex",
					border: "1px solid lightgray",
					borderRadius: "8px",
					padding: "4px 8px",
					marginBottom: "16px",
				}}
			>
				<p>{title}</p>
				<span style={{ marginLeft: "8px", color: "gray" }}>({loading ? "..." : count})</span>
			</div>

			{loading ? (
				<div style={{ padding: "16px" }}>Loading...</div>
			) : (
				<div
					style={{
						flex: 1,
						display: "flex",
						flexDirection: "column",
						gap: "16px",
						overflowY: "auto",
						scrollBehavior: "smooth",
						padding: "16px",
						border: "1px solid ##FCFCFC",
						borderRadius: "8px",
						maxHeight: "700px",
					}}
				>
					{tasks.map((task) => (
						<div key={task.id}>
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
								<p>{task.title}</p>

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

								<div style={{ display: "flex", justifyContent: "space-between" }}>
									<p style={{ fontSize: "14px" }}>{task.dateCreated}</p>
									<p style={{ fontSize: "14px", color: "red" }}>Priority {task.severity}</p>
								</div>
							</div>
						</div>
					))}

					{count > 10 && (
						<button
							className="tasks-button tasks-button--primary"
							type="button"
							style={{ width: "fit-content", alignSelf: "center" }}
						>
							Load more
						</button>
					)}
				</div>
			)}
		</div>
	);
}

export default IssueColumn;

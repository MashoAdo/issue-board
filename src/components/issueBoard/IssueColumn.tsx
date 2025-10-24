import { useDroppable } from "@dnd-kit/core";
import { getStatusColor } from "../../helpers";
import type { IssueStatus, TIssue } from "../../types";
import IssueCard from "./IssueCard";
import IssueDraggable from "./IssueDraggable";

interface IssueColumnProps {
	title: string;
	tasks: TIssue[];
	loading: boolean;
	columnStatus: IssueStatus;
}

function IssueColumn({ title, tasks, loading, columnStatus }: IssueColumnProps) {
	const count = tasks.length;

	const { isOver, setNodeRef } = useDroppable({
		id: columnStatus,
	});

	return (
		<div
			ref={setNodeRef}
			style={{
				flex: 1,
				height: "100%",
				display: "flex",
				flexDirection: "column",
				minHeight: 0,
				border: isOver ? "2px solid var(--accent-primary)" : "1px solid var(--border-primary)",
				borderRadius: "8px",
				padding: "16px",
				backgroundColor: isOver ? "var(--hover-bg)" : "transparent",
				transition: "all 0.2s ease",
				position: "relative",
			}}
		>
			<div
				style={{
					backgroundColor: getStatusColor(columnStatus),
					color: "white",

					display: "flex",
					padding: "4px 8px",
					borderRadius: "4px",
					fontWeight: "500",
					whiteSpace: "nowrap",
					marginBottom: "16px",
				}}
			>
				<p>{title}</p>
				<span style={{ marginLeft: "8px" }}>({loading ? "..." : count})</span>
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
						border: "1px solid ##FCFCFC",
						borderRadius: "8px",
						maxHeight: "700px",
					}}
				>
					{tasks.map((task) => (
						<IssueDraggable key={task.id} issue={task}>
							<IssueCard
								issue={task}
								stylesOverride={{
									border: "1px solid var(--border-primary)",
									borderRadius: "8px",
									padding: "12px 8px",
									backgroundColor: "var(--card-bg)",
									position: "relative", // Allow absolute positioning of drag handle
								}}
							/>
						</IssueDraggable>
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

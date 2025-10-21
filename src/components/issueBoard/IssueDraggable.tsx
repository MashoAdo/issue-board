import { useDraggable } from "@dnd-kit/core";
import type { TIssue } from "../../types";

interface IssueDraggableProps {
	issue: TIssue;
	children: React.ReactNode;
}

function IssueDraggable({ issue, children }: IssueDraggableProps) {
	const { attributes, listeners, setNodeRef } = useDraggable({
		id: issue.id.toString(),
		data: {
			//This is used to determine which column the issue is dropped from
			columnStatus: issue.status,
		},
	});

	return (
		<div ref={setNodeRef} {...attributes} {...listeners}>
			{children}
		</div>
	);
}

export default IssueDraggable;

import { useEffect, useState } from "react";
import useGlobalStore from "../../store/store";
import type { TEmployee } from "../../types";

function AssigneeFilter() {
	const [employees, setEmployees] = useState<TEmployee[]>([]);

	useEffect(() => {
		const fetchEmployees = async () => {
			const data = await import("../../data/employees.json");

			setEmployees(data.employees);
		};
		fetchEmployees();
	}, []);

	const handleEmployeeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		updateFilters({ assigneeId: event.target.value ? parseInt(event.target.value) : undefined });
	};

	const assigneeFilterValue = useGlobalStore((state) => state.filters.assigneeId);
	const updateFilters = useGlobalStore((state) => state.updateFilters);

	return (
		<select
			className="tasks-filter-select"
			name="assignees"
			id="assignees"
			value={assigneeFilterValue}
			onChange={handleEmployeeChange}
		>
			<option value="">All Employees</option>
			{employees.map(
				(employee) =>
					employee && (
						<option key={employee?.id} value={employee?.id}>
							{employee?.name}
						</option>
					)
			)}
		</select>
	);
}

export default AssigneeFilter;

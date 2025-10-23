import { SEVERITY_LEVELS } from "../../constants";
import useGlobalStore from "../../store/store";

function SeverityFilters() {
	const handleSeverityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		updateFilters({ severity: parseInt(event.target.value) });
	};

	const severityFilterValue = useGlobalStore((state) => state.filters.severity);
	const updateFilters = useGlobalStore((state) => state.updateFilters);

	return (
		<select
			className="tasks-filter-select"
			name="severity"
			id="severity"
			value={severityFilterValue || ""}
			onChange={handleSeverityChange}
		>
			<option value="">All</option>
			{SEVERITY_LEVELS.map((severity) => (
				<option key={severity?.value} value={severity?.value}>
					{severity?.label}
				</option>
			))}
		</select>
	);
}

export default SeverityFilters;

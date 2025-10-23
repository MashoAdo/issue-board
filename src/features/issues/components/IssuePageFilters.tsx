import AssigneeFilter from "../../../components/filters/AssigneeFilter";
import SeverityFilters from "../../../components/filters/SeverityFilters";
import Input from "../../../components/form/Input";
import useGlobalStore from "../../../store/store";

function IssuesPageFilters() {
	const searchTerm = useGlobalStore((state) => state.searchTerm);
	const setSearchTerm = useGlobalStore((state) => state.setSearchTerm);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	return (
		<div className="tasks-controls">
			<div className="tasks-search-section">
				<Input value={searchTerm} onChange={handleSearch} onClear={() => setSearchTerm("")} />

				<div className="tasks-filter-group">
					<label className="tasks-filter-label" htmlFor="assignees">
						Sort by Assignee
					</label>
					<AssigneeFilter />
				</div>

				<div className="tasks-filter-group">
					<label className="tasks-filter-label" htmlFor="severity">
						Sort by Severity
					</label>
					<SeverityFilters />
				</div>
			</div>

			<div className="tasks-actions">
				<button className="tasks-button tasks-button--secondary" type="button">
					Recently viewed
				</button>
			</div>
		</div>
	);
}

export default IssuesPageFilters;

import IssueColumn from "../../../components/issueBoard/IssueColumn";
import useGlobalStore from "../../../store/store";

function InProgressColumn() {
	const inProgress = useGlobalStore((state) => state.issues.inProgress);
	const loading = useGlobalStore((state) => state.isLoading);

	return <IssueColumn loading={loading} title="In Progress" tasks={inProgress} columnStatus="in_progress" />;
}

export default InProgressColumn;

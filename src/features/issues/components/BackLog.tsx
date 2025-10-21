import IssueColumn from "../../../components/issueBoard/IssueColumn";
import useGlobalStore from "../../../store/store";

function BackLogColumn() {
	const backlog = useGlobalStore((state) => state.issues.backlog);
	const loading = useGlobalStore((state) => state.isLoading);

	return <IssueColumn loading={loading} title="Backlog" tasks={backlog} columnStatus="backlog" />;
}

export default BackLogColumn;

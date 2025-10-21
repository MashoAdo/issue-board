import IssueColumn from "../../../components/issueBoard/IssueColumn";
import useGlobalStore from "../../../store/store";

function DoneColumn() {
	const done = useGlobalStore((state) => state.issues.done);
	const loading = useGlobalStore((state) => state.isLoading);

	return <IssueColumn loading={loading} title="Done" tasks={done} />;
}

export default DoneColumn;

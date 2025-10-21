import IssueColumn from "../../../components/taskBoard/TaskColumn";
import store from "../../../store/store";

function InProgressColumn({ loading }: { loading: boolean }) {
	const {
		issues: { inProgress },
	} = store.getState();

	return <IssueColumn loading={loading} title="In Progress" tasks={inProgress} />;
}

export default InProgressColumn;

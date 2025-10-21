import IssueColumn from "../../../components/taskBoard/TaskColumn";
import store from "../../../store/store";

function BackLogColumn({ loading }: { loading: boolean }) {
	const {
		issues: { backlog },
	} = store.getState();

	return <IssueColumn loading={loading} title="Backlog" tasks={backlog} />;
}

export default BackLogColumn;

import IssueColumn from "../../../components/taskBoard/TaskColumn";
import store from "../../../store/store";

function DoneColumn({ loading }: { loading: boolean }) {
	const {
		issues: { done },
	} = store.getState();

	return <IssueColumn loading={loading} title="Done" tasks={done} />;
}

export default DoneColumn;

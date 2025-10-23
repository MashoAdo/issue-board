import useModalStore from "../../../store/modalStore";
import RecentlyViewedModal from "./RecentlyViewedModal";

function RecentlyViewed() {
	const openModal = useModalStore((state) => state.openModal);

	const handleClick = () => {
		openModal(<RecentlyViewedModal />, "Recently Viewed Issues");
	};

	return (
		<div>
			<button className="tasks-button tasks-button--secondary" type="button" onClick={handleClick}>
				Recently viewed
			</button>
		</div>
	);
}

export default RecentlyViewed;

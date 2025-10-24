import { useEffect } from "react";
import useModalStore from "../store/modalStore";

function Modal() {
	const { isOpen, content, title, closeModal } = useModalStore();

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) {
				closeModal();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden"; // Prevent background scrolling
			return () => {
				document.removeEventListener("keydown", handleEscape);
				document.body.style.overflow = "unset";
			};
		}
	}, [isOpen, closeModal]);

	if (!isOpen) return null;

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: "rgba(0, 0, 0, 0.5)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				zIndex: 1000,
				padding: "20px",
			}}
			onClick={closeModal}
		>
			<div
				style={{
					backgroundColor: "var(--bg-secondary)",
					borderRadius: "8px",
					maxWidth: "500px",
					width: "100%",
					maxHeight: "80vh",
					overflow: "auto",
					boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
					animation: "modalSlideIn 0.3s ease-out",
				}}
				onClick={(e) => e.stopPropagation()}
			>
				{title && (
					<div
						style={{
							padding: "20px 20px 0 20px",
							borderBottom: "1px solid var(--border-primary)",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<h2
							style={{
								margin: 0,
								fontSize: "18px",
								fontWeight: "600",
								color: "var(--text-primary)",
							}}
						>
							{title}
						</h2>
						<button
							onClick={closeModal}
							style={{
								background: "none",
								border: "none",
								cursor: "pointer",
								padding: "4px",
								borderRadius: "4px",
								color: "var(--text-tertiary)",
								fontSize: "20px",
								lineHeight: 1,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = "var(--hover-bg)";
								e.currentTarget.style.color = "var(--text-secondary)";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = "transparent";
								e.currentTarget.style.color = "var(--text-tertiary)";
							}}
						>
							×
						</button>
					</div>
				)}
				<div style={{ padding: title ? "20px" : "20px" }}>{content}</div>
			</div>

			<style>{`
				@keyframes modalSlideIn {
					from {
						opacity: 0;
						transform: scale(0.9) translateY(-20px);
					}
					to {
						opacity: 1;
						transform: scale(1) translateY(0);
					}
				}
			`}</style>
		</div>
	);
}

export default Modal;

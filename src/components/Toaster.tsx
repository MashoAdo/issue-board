import { useEffect } from "react";
import useToasterStore, { type ToasterType } from "../store/toasterStore";

function Toaster() {
	const { isOpen, type, title, message, children, hideToaster } = useToasterStore();

	// Handle escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) {
				hideToaster();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			return () => document.removeEventListener("keydown", handleEscape);
		}
	}, [isOpen, hideToaster]);

	if (!isOpen) return null;

	const getTypeStyles = () => {
		switch (type) {
			case "success":
				return {
					borderColor: "#10b981",
					backgroundColor: "#f0fdf4",
					iconColor: "#10b981",
				};
			case "error":
				return {
					borderColor: "#ef4444",
					backgroundColor: "#fef2f2",
					iconColor: "#ef4444",
				};
			default:
				return {
					iconColor: "#10b981",
					backgroundColor: "#f0fdf4",
					borderColor: "#10b981",
				};
		}
	};

	const styles = getTypeStyles();

	const getIcon = (type: ToasterType) => {
		switch (type) {
			case "success":
				return "✓";
			case "error":
				return "✕";
			default:
				return "success";
		}
	};

	return (
		<div
			style={{
				position: "fixed",
				top: "20px",
				right: "20px",
				zIndex: 9999,
				maxWidth: "400px",
				minWidth: "300px",
				border: `2px solid ${styles.borderColor}`,
				borderRadius: "8px",
				backgroundColor: styles.backgroundColor,
				boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
				padding: "16px",
				animation: "slideIn 0.3s ease-out",
			}}
		>
			<div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
				{/* Icon */}
				<div
					style={{
						width: "20px",
						height: "20px",
						borderRadius: "50%",
						backgroundColor: styles.iconColor,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: "white",
						fontSize: "12px",
						fontWeight: "bold",
						flexShrink: 0,
					}}
				>
					{getIcon(type)}
				</div>

				{/* Content */}
				<div style={{ flex: 1, minWidth: 0 }}>
					<h3
						style={{
							margin: 0,
							fontSize: "16px",
							fontWeight: "600",
							color: "#1f2937",
							marginBottom: message ? "4px" : "0",
						}}
					>
						{title}
					</h3>
					{message && (
						<p
							style={{
								margin: 0,
								fontSize: "14px",
								color: "#6b7280",
								lineHeight: "1.4",
							}}
						>
							{message}
						</p>
					)}
					{children && <div style={{ marginTop: "8px" }}>{children}</div>}
				</div>

				{/* Close button */}
				<button
					onClick={hideToaster}
					style={{
						background: "none",
						border: "none",
						cursor: "pointer",
						padding: "4px",
						borderRadius: "4px",
						color: "#6b7280",
						fontSize: "18px",
						lineHeight: 1,
						flexShrink: 0,
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = "transparent";
					}}
				>
					×
				</button>
			</div>

			<style>{`
				@keyframes slideIn {
					from {
						transform: translateX(100%);
						opacity: 0;
					}
					to {
						transform: translateX(0);
						opacity: 1;
					}
				}
			`}</style>
		</div>
	);
}

export default Toaster;

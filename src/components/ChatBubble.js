import { Typography } from "@mui/material";

const getMessage = (message, id) => {
	let msg = (message || "").trim();
	let path = `${process.env.PUBLIC_URL}/Hike/Media`;

	if (msg && msg.endsWith(".gif")) {
		if (id === 2) {
			return <img src={`${path}/hike Gif/${msg}`} alt="media" />;
		} else {
			return <img src={`${path}/hike Gif/sent/${msg}`} alt="media" />;
		}
	}
	if (msg && msg.endsWith(".mp4")) {
		if (id === 2) {
			return <video src={`${path}/hike Videos/${msg}`} alt="media" />;
		} else {
			return <video src={`${path}/hike Videos/sent/${msg}`} alt="media" />;
		}
	}
	if (msg && (msg.endsWith(".jpg") || msg.endsWith(".png") || msg.endsWith(".jpeg"))) {
		if (id === 2) {
			return <img src={`${path}/hike Images/${msg}`} alt="media" />;
		} else {
			return <img src={`${path}/hike Images/sent/${msg}`} alt="media" />;
		}
	}
	return msg || "";
};

function ChatBubble(props) {
	const { chat } = props;
	const { id, time, text } = chat;

	return id === 2 ? (
		<>
			<div
				key={time}
				style={{
					backgroundColor: "#ddd",
					padding: "1rem",
					borderRadius: "1.5rem",
					marginRight: "auto",
					// marginLeft: "3rem",
					maxWidth: "50%",
				}}
			>
				<div
					style={{
						float: "left",
					}}
				>
					<Typography
						variant="h6"
						style={{
							marginTop: "-0.5rem",
							wordWrap: "break-word",
							overflowWrap: "break-word",
							wordBreak: "break-all",
							width: "100%",
						}}
					>
						{getMessage(text, id)}
					</Typography>
					<Typography
						variant="h6"
						style={{
							fontSize: "0.75rem",
							marginBottom: "-0.5rem",
						}}
					>
						{time}
					</Typography>
				</div>
				<div
					style={{
						clear: "both",
					}}
				/>
			</div>
			<br />
		</>
	) : (
		<>
			<div
				key={time}
				style={{
					backgroundColor: "#0040FE",
					padding: "1rem",
					borderRadius: "1.5rem",
					marginLeft: "auto",
					// marginRight: "3rem",
					maxWidth: "50%",
				}}
			>
				<div
					style={{
						float: "right",
					}}
				>
					<Typography
						variant="h6"
						style={{
							color: "#fff",
							marginTop: "-0.5rem",
							wordWrap: "break-word",
							overflowWrap: "break-word",
							wordBreak: "break-all",
							width: "100%",
						}}
					>
						{getMessage(text, id)}
					</Typography>
					<Typography
						variant="h6"
						style={{
							color: "#fff",
							marginBottom: "-0.5rem",
							fontSize: "0.75rem",
							float: "right",
						}}
					>
						{time}
					</Typography>
				</div>
				<div
					style={{
						clear: "both",
					}}
				/>
			</div>
			<br />
		</>
	);
}

export default ChatBubble;

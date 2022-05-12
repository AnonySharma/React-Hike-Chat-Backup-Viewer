import { Grid, Card, AppBar, Toolbar, Button, IconButton, Typography } from "@mui/material";
import { FileUpload as FileUploadIcon, Help as HelpIcon } from "@mui/icons-material";
import ChatBubble from "./components/ChatBubble";
import React from "react";
import { DateTime } from "luxon";
import AboutPopup from "./components/AboutPopup";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			aboutOpen: false,
			messages: [
				{
					id: 1,
					name: "You",
					text: "Hello, how are you?",
					date: "01 Jan 20",
					time: "12:00 PM",
				},
				{
					id: 2,
					name: "Other",
					text: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Quisquam, quidem. ",
					date: "01 Jan 20",
					time: "12:01 PM",
				},
			],
		};
		this.hiddenFileInput = React.createRef();
	}

	render() {
		let date = "";
		const { messages, aboutOpen } = this.state;
		const processChats = (text) => {
			let temp_chats = [];
			text.split(/\r?\n/).forEach((chat) => {
				if (
					chat.length > 19 &&
					chat[2] === "/" &&
					chat[5] === "/" &&
					chat[10] === " " &&
					chat[13] === ":" &&
					chat[16] === ":" &&
					chat[19] === " "
				) {
					let timestamp = chat.substring(0, 19);
					let msg_temp = chat.substring(19).split(":");
					let message = "";
					for (let i = 1; i < msg_temp.length; i++) {
						message += msg_temp[i];
						if (i !== msg_temp.length - 1) {
							message += ":";
						}
					}
					let sender = msg_temp[0].trim();

					// 24/11/2020 19:33:24
					let formatted_date = DateTime.fromFormat(timestamp, "dd/mm/yyyy HH:mm:ss").toFormat("dd MMM yy");
					let formatted_time = DateTime.fromFormat(timestamp, "dd/mm/yyyy HH:mm:ss").toFormat("hh:mm a");
					temp_chats.push({
						id: sender === "You" ? 1 : 2,
						name: sender,
						text: message,
						date: formatted_date,
						time: formatted_time,
					});
				} else {
					if (temp_chats.length > 0) {
						temp_chats[temp_chats.length - 1].text += "\n" + chat;
					}
				}
			});

			document.body.style.cursor = "default";
			this.setState({ messages: temp_chats, loading: false });
		};

		const handleClick = (event) => {
			this.hiddenFileInput.current.click();
		};

		const handleChange = (event) => {
			this.setState({ loading: true });
			document.body.style.cursor = "wait";
			const fileUploaded = event.target.files[0];
			const reader = new FileReader();
			reader.onload = (event) => {
				processChats(event.target.result);
			};
			reader.readAsText(fileUploaded);
		};

		let content = [];
		messages.forEach((chat) => {
			if (date !== chat.date) {
				date = chat.date;
				content.push(
					<div
						style={{
							padding: "0.4rem",
							backgroundColor: "#888",
							marginBottom: "1rem",
							marginInline: "auto",
						}}
					>
						<Typography variant="h6" align="center">
							{chat.date}
						</Typography>
					</div>
				);
			}
			content.push(<ChatBubble chat={chat} />);
		});

		return (
			<Grid container spacing={3} pt={3}>
				<AppBar position="static">
					<Toolbar>
						<Typography
							variant="h6"
							component="div"
							sx={{
								flexGrow: 1,
								fontWeight: "bold",
								color: "#fff",
								padding: "0px 10px",
								// marginLeft: "50%",
								// transform: "translateX(-50%)",
							}}
						>
							Hike Chat Backup Viewer
						</Typography>
						<Button
							variant="outlined"
							color="inherit"
							disabled={this.state.loading}
							startIcon={<FileUploadIcon />}
							onClick={handleClick}
						>
							<b>Upload Backup file</b>
						</Button>
						<IconButton aria-label="about" size="large" onClick={() => this.setState({ aboutOpen: true })}>
							<HelpIcon
								fontSize="inherit"
								sx={{
									color: "#fff",
								}}
							/>
						</IconButton>
						<input type="file" ref={this.hiddenFileInput} onChange={handleChange} style={{ display: "none" }} />
					</Toolbar>
				</AppBar>
				<Grid item xs={12}>
					<Grid container justify="center" spacing={3}>
						<Grid item xs={12}>
							<Card
								sx={{
									padding: "1rem",
									margin: "1rem",
									height: "75vh",
									overflow: "scroll",
								}}
								elevation={5}
							>
								<div
									style={{
										width: "100%",
									}}
								>
									{content.map((item) => item)}
								</div>
							</Card>
						</Grid>
					</Grid>
				</Grid>
				<AboutPopup openStatus={aboutOpen} closePopup={() => this.setState({ aboutOpen: false })} />
			</Grid>
		);
	}
}

export default App;

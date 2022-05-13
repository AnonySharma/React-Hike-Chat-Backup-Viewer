import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";

class AboutPopup extends React.Component {
	render() {
		const { openStatus, closePopup } = this.props;

		return (
			<Dialog
				open={openStatus}
				onClose={() => {
					closePopup();
				}}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"About Hike Chat Backup Viewer"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						This is a simple web app that allows you to view the contents of your hike chat backup. To get started,
						click the "Upload Backup File" button on the top.
						<br />
						<br />
						<strong>Note:</strong> This app is not affiliated with hike.com or hike.co.uk.
						<br />
						By:{" "}
						<a href="https://www.github.com/AnonySharma" target="_blank" rel="noreferrer">
							AnonySharma
						</a>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							closePopup();
						}}
					>
						Back
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

export default AboutPopup;

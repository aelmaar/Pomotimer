const notification = () => {
	if (Notification.persmission === "granted") {
	} else if (Notification.permission !== "denied") {
		Notification.requestPermission();
	}
};

export { notification };

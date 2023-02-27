console.log("Today's Date", currentDate); // "17-6-2022"

const button = document.querySelector("#export");

button.addEventListener("click", () => {
     var doc = new jsPDF("p", "pt", "a4");
			var htmlstring = "";
			var tempVarToCheckPageHeight = 0;
			var pageHeight = 0;
			pageHeight = doc.internal.pageSize.height;
			specialElementHandlers = {
				// element with id of "bypass" - jQuery style selector
				"#bypassme": function (element, renderer) {
					// true = "handled elsewhere, bypass text extraction"
					return true;
				},
			};
			margins = {
				top: 150,
				bottom: 60,
				left: 40,
				right: 40,
				width: 600,
			};
			var y = 20;
			doc.setLineWidth(2);
			doc.text(200, (y = y + 30), "Attendance");
			doc.autoTable({
				html: "#Attendance-Table",
				startY: 70,
				theme: "grid",
			});
			doc.save(`Attendance (${currentDate}).pdf`);
})
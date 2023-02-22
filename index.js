const downloadPDF = () => {
	var doc = new jspdf.jsPDF("p", "pt", "a4");

	doc.html(document.querySelector("#labortable"), {
		callback: function (doc) {
			doc.save("MLB World Series Winners.pdf");
		},
		margin: [60, 60, 60, 60],
		x: 32,
		y: 32,
	});
};

document.querySelector("#export").addEventListener("click", downloadPDF());
const button = document.querySelector("#export");

function downloadPDFWithBrowserPrint() {
	window.print();
}

button.addEventListener("click", downloadPDFWithBrowserPrint());
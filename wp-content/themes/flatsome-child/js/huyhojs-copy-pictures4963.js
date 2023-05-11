jQuery(document).ready(function($) {
	//chụp ảnh, tải ảnh đơn hàng
	$("#btn-Preview-Image").on('click', function () {
		$(".tinhtrang-od").attr("style", "box-shadow: none !important");
		$(".noibo-od").addClass("noibo-od-hide");
		$(".rate-od").hide();
		$("span.tinhtrang-od").addClass('stt-bf-hide');
		html2canvas(document.querySelector(".info-top")).then(canvas => {
			//document.querySelector("#previewImage").appendChild(canvas);
			getCanvas = canvas;
		});
		$(".img-copied.fa-image").hide();
		$(".img-copied.fa-download").hide();
		setTimeout(function(){
			getCanvas.toBlob(function(blob) { 
				const item = new ClipboardItem({ "image/png": blob });
				navigator.clipboard.write([item])
				.then(() => {$(".img-copied").addClass("fa-image");})
				.catch(() => {$(".img-copied").addClass("fa-download");});
			});
		},1000);
		//click 2 lần mới  download
		var imgageData = getCanvas.toDataURL("image/png");
		var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
		$("#btn-Preview-Image").attr("download", "HanOrder.png").attr("href", newData);
	});
	//chụp ảnh, tải ảnh tạm tính giá
	$("#btn-tamtinhgia-picture").on('click', function () {
		$(".tamtinhgia-btn a").attr("style", "box-shadow: none !important");
		$(".rate-od").hide();
		html2canvas(document.querySelector("#tamtinhgia-container")).then(canvas => {
			getCanvas = canvas;
		});
		setTimeout(function(){
			getCanvas.toBlob(function(blob) { 
				const item = new ClipboardItem({ "image/png": blob });
				navigator.clipboard.write([item])
				.then(() => {$(".img-copied").removeClass("fa-calculator-alt"); $(".img-copied").addClass("fa-images");})
				.catch(() => {$(".img-copied").removeClass("fa-calculator-alt"); $(".img-copied").addClass("fa-download");});
			});
		},1000);
		//click 2 lần mới  download
		var imgageData = getCanvas.toDataURL("image/png");
		var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
		$("#btn-tamtinhgia-picture").attr("download", "HanOrder.png").attr("href", newData);
	});
});
//Copy link tracking
function copy_tracking() {
	var copyText = document.getElementById("copy-tracking");
	copyText.select();
	copyText.setSelectionRange(0, 99999); // For mobile devices
	navigator.clipboard.writeText(copyText.value);
	$("#copy-tracking-btn").css({"width" : "12.25px", "font-weight" : "900"});
}
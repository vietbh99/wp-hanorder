jQuery(document).ready(function($) {
// Jquery Dependency

	$("input.tiente").on({
		keyup: function() {
		  formatCurrency($(this));
		},
		blur: function() { 
		  formatCurrency($(this), "blur");
		}
	});
	
	$("input.tiente-neg").on({
		keyup: function() {
		  formatCurrencyNeg($(this));
		},
		blur: function() { 
		  formatCurrencyNeg($(this), "blur");
		}
	});
	
	function formatNumber(n) {
	  // format number 1000000 to 1,234,567
	  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	}
	
	function formatNumberNeg(n) {
	  // format number 1000000 to 1,234,567
	  if(n.startsWith("-")) return "-" + n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	  else return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	}

	function formatCurrency(input, blur) {
	  // appends $ to value, validates decimal side
	  // and puts cursor back in right position.
	  
	  // get input value
	  var input_val = input.val();
	  
	  // don't validate empty input
	  if (input_val === "") { return; }
	  
	  // original length
	  var original_len = input_val.length;

	  // initial caret position 
	  var caret_pos = input.prop("selectionStart");
		
	  // check for decimal
	  if (input_val.indexOf(".") >= 0) {

		// get position of first decimal
		// this prevents multiple decimals from
		// being entered
		var decimal_pos = input_val.indexOf(".");

		// split number by decimal point
		var left_side = input_val.substring(0, decimal_pos);
		var right_side = input_val.substring(decimal_pos);

		// add commas to left side of number
		left_side = formatNumber(left_side);

		// validate right side
		right_side = formatNumber(right_side);
		
		// Nếu xóa thì Chỉ hiện thị 1 số thập phân nếu chỉ nhập 1 số thập phân (bình thường thêm cả số 0)
		/*if (blur === "blur") {
		  right_side += "00";
		}*/
		
		// Limit decimal to only 2 digits
		right_side = right_side.substring(0, 2);

		// join number by .
		input_val = left_side + "." + right_side;

	  } else {
		// no decimal entered
		// add commas to number
		// remove all non-digits
		input_val = formatNumber(input_val);
		input_val = input_val;
		
		// Nếu ko nhập số thập phân, khi click ra ngoài sẽ vẫn thêm 2 số thập phân
		/*if (blur === "blur") {
		  input_val += ".00";
		}*/
	  }
	  
	  // send updated string to input
	  input.val(input_val);

	  /* put caret back in the right position
	  var updated_len = input_val.length;
	  caret_pos = updated_len - original_len + caret_pos;
	  input[0].setSelectionRange(caret_pos, caret_pos);*/
	}
	
	function formatCurrencyNeg(input, blur) {
	  var input_val = input.val();
	  if (input_val === "") { return; }
	  var original_len = input_val.length;
	  var caret_pos = input.prop("selectionStart");
	  if (input_val.indexOf(".") >= 0) {
		var decimal_pos = input_val.indexOf(".");
		var left_side = input_val.substring(0, decimal_pos);
		var right_side = input_val.substring(decimal_pos);
		left_side = formatNumberNeg(left_side);
		right_side = formatNumberNeg(right_side);
		right_side = right_side.substring(0, 2);
		input_val = left_side + "." + right_side;
	  } else {
		input_val = formatNumberNeg(input_val);
		input_val = input_val;
	  }
	  input.val(input_val);
	}

	//Thêm bớt thuộc tính cho input tự nhập giá cước v/c
	$('#cuoc-cs').click(function() {
		if ($(this).is(':checked')) {
			$('#cuoc-ip').attr('name', 'cuocvcbay');
			$('#cuoc-ip-div').css({'max-height': '64px','transition': 'max-height .5s ease 0s'});
		} else {
			$('#cuoc-ip').attr('name', '');
			$('#cuoc-ip-div').css({'max-height': '0','transition': 'max-height .5s ease 0s'});
		}
		$('#cuoc-ip').prop('required',true);
	});
	if ($('#cuoc-cs').is(':checked')) {
		$('#cuoc-ip').attr('name', 'cuocvcbay');
		$('#cuoc-ip-div').css({'max-height': '64px'});
	}
	$('.cl-cuoccs').click(function(e) {
		$('#cuoc-ip').attr('name', '');
		$('#cuoc-ip').val('');
		$('#cuoc-ip-div').css({'max-height': '0','transition': 'max-height .5s ease 0s'});
		$('#cuoc-ip').removeAttr('required');
	});
	$('#cuoc-ip').focus(function() {
		$(this).attr('name', 'cuocvcbay');
		$(this).prop('required',true);
		$("input:radio#cuoc-lt10:checked")[0].checked = false;
		$("input:radio#cuoc-cs")[0].checked = true;
	});
	
	//Thêm bớt thuộc tính cho input phí mua hộ
	$('#phimuaho-cs').click(function() {
		if ($(this).is(':checked')) {
			$('#phimuaho-ip').attr('name', 'phimuaho');
			$('#phimuaho-ip-div').css({'max-height': '64px','transition': 'max-height .5s ease 0s'});
		} else {
			$('#phimuaho-ip').attr('name', '');
			$('#phimuaho-ip-div').css({'max-height': '0','transition': 'max-height .5s ease 0s'});
		}
		$('#phimuaho-ip').prop('required',true);
	});
	if ($('#phimuaho-cs').is(':checked')) {
		$('#phimuaho-ip').attr('name', 'phimuaho');
		$('#phimuaho-ip-div').css({'max-height': '64px'});
	}
	$('.cl-phimuaho').click(function() {
		$("input:radio[name=phimuaho]:checked")[0].checked = false;
	});
	$('#phimuaho-ip').focus(function() {
		$(this).attr('name', 'phimuaho');
		$(this).prop('required',true);
		$("input:radio#phimuaho-df:checked")[0].checked = false;
		$("input:radio[name=phimuaho_cus]")[0].checked = true;
	});
	$('.cl-phimuaho-cs').click(function(e) {
		$('#phimuaho-ip').attr('name', '');
		$('#phimuaho-ip').val('');
		$('#phimuaho-ip-div').css({'max-height': '0','transition': 'max-height .5s ease 0s'});
		$('#phimuaho-ip').removeAttr('required');
	});
	$('.cl-phimuaho-cs').click(function() {
		$("input:radio[name=phimuaho_cus]:checked")[0].checked = false;
	});
	//Thêm bớt thuộc tính cho input tỷ giá won
	$('#tygiawon-cs').click(function() {
		if ($(this).is(':checked')) {
			$('#tygiawon-ip').attr('name', 'tygiawon');
			$('#tygiawon-ip-div').css({'max-height': '64px','transition': 'max-height .5s ease 0s'});
		} else {
			$('#tygiawon-ip').attr('name', '');
			$('#tygiawon-ip-div').css({'max-height': '0','transition': 'max-height .5s ease 0s'});
		}
		$('#tygiawon-ip').prop('required',true);
	});
	if ($('#tygiawon-cs').is(':checked')) {
		$('#tygiawon-ip').attr('name', 'tygiawon');
		$('#tygiawon-ip-div').css({'max-height': '64px'});
	}
	$('.cl-tygiawon').click(function() {
		$("input:radio[name=tygiawon]:checked")[0].checked = false;
	});
	$('#tygiawon-ip').focus(function() {
		$(this).attr('name', 'tygiawon');
		$(this).prop('required',true);
		$("input:radio#tygiawon-df:checked")[0].checked = false;
		$("input:radio[name=tygiawon_cus]")[0].checked = true;
	});
	$('.cl-tygiawon-cs').click(function(e) {
		$('#tygiawon-ip').attr('name', '');
		$('#tygiawon-ip').val('');
		$('#tygiawon-ip-div').css({'max-height': '0','transition': 'max-height .5s ease 0s'});
		$('#tygiawon-ip').removeAttr('required');
	});
	$('.cl-tygiawon-cs').click(function() {
		$("input:radio[name=tygiawon_cus]:checked")[0].checked = false;
	});
	//Chặn double click form, vd khi tạo đơn hàng mà click 2 lần liên tiếp nút tạo đơn thì sẽ tạo ra 2 đơn giống nhau
	$('.dis-dbclick').on('submit', function () {
		$('.dis-dbclick').prop('disabled', true);
	});
	//Ưu đãi note, phí khác note hiển thị khi có value	
	$('input[name="phikhac"]').keyup(function() {
		var field = $(this);
		var count = 0;
		$(field).each(function() {
			if ($(this).val()) {
				count++;
			}
		});
		if(count == 0) {
			$('#phikhacnote-div').css({'max-height': '0','transition': 'max-height .5s ease 0s'});
			$('#phikhacnote').val('');
		}
		else $('#phikhacnote-div').css({'max-height': '130px','transition': 'max-height .5s ease 0s'});
	});
	if($('input[name="phikhac"]').val() && $('input[name="phikhac"]').val() != 0) $('#phikhacnote-div').css({'max-height': '130px'});
	$('input[name="uudai"]').keyup(function() {
		var field = $(this);
		var count = 0;
		$(field).each(function() {
			if ($(this).val()) {
				count++;
			}
		});
		if(count == 0) {
			$('#uudainote-div').css({'max-height': '0','transition': 'max-height .5s ease 0s'});
			$('#uudainote').val('');
		}
		else $('#uudainote-div').css({'max-height': '130px','transition': 'max-height .5s ease 0s'});
	});
	if($('input[name="uudai"]').val() && $('input[name="uudai"]').val() != 0) $('#uudainote-div').css({'max-height': '130px'});
	//Toggle sidebar quanly
	$(".sidebarToggle").click(function () {
		$('#user-toggle-sidebar').toggleClass("show-sidebar");
	});
	$(".sidebarToggle.right-ar").click(function () {
		$(this).removeClass("show-toggle");
		$(this).addClass("hide-toggle");
		$('.sidebarToggle.left-ar').removeClass("hide-toggle");
		$('.sidebarToggle.left-ar').addClass("show-toggle");
	});
	$(".sidebarToggle.left-ar").click(function () {
		$(this).removeClass("show-toggle");
		$(this).addClass("hide-toggle");
		$('.sidebarToggle.right-ar').removeClass("hide-toggle");
		$('.sidebarToggle.right-ar').addClass("show-toggle");
	});
	//toggle thao tác
	$('.thaotac').click(function(e) {
		$(this).next().toggle();
		$('.thaotac').not(this).next().hide();
		e.stopPropagation();
	})
	$(document).click(function(e) {
		$('.thaotac-show').hide();
		e.stopPropagation();
	})
	//toggle ngày chốt
	$('.order-date').click(function(e) {
		$(this).toggleClass('show-paiddate');
		e.stopPropagation();
	})
});
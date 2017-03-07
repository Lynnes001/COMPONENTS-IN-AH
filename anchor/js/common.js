

//标签点击切换
$(".pagetips .tip").click(function(){
	var _this = $(this);
	$("#page"+_this.val()).attr('style','z-index:1').siblings("div").removeAttr("style");
	_this.css({color: 'black', backgroundColor: 'white'});
	$.each(_this.siblings(), function(index, val) {
		$(this).css({color: 'white', backgroundColor: 'transparent'});
	});
	checkNavShow();
});

//导航检测
$(".pages").scroll(function(){
    var disToTop = $(window).scrollTop() //滚动条距离顶端值
	for( i = 1; i < $("#nav a").length+1; i++ ) {
		if( $("#title"+i).offset().top <= $(window).innerHeight() ) { 
		//判断滚动条位置
			$('#nav a').removeClass("current");			//清除所有current类
			$('#nav div').removeClass("currentDot"); 	//清除所有currentDot类
			$("#link"+i).addClass("current");     		//给当前导航加c类
			$("#dotlink"+i).addClass("currentDot");     //给当前导航加currentDot类
		}
	}
});

//左右切换按钮
$("#turnleft").click(function(){
	var _this = $(this);
	$.each($(".pages"), function(index, val) {
		if ($(this).css('z-index') == 1 && $("#pagebtn"+index).length !== 0){
			$("#pagebtn"+index).click();
			return false;
		}
	});
	checkNavShow();
});
$("#turnright").click(function(){
	var _this = $(this);
	var mark;
	$.each($(".pages"), function(index, val) {
		mark=index+2;
		if ($(this).css('z-index') == 1 && $("#pagebtn"+mark).length !== 0){
			$("#pagebtn"+mark).click();
			return false;
		}
	});
	checkNavShow();
});

function checkNavShow(){
	if ( $("#page1").css('z-index') == 1 )
		$("#nav").css('display','inline');
	else
		$("#nav").css('display','none');
}
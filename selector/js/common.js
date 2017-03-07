//增加
function shortAddDev(ip, dis, dom="#shortScanTable"){
	var id = $(dom+ " tr").length-2;
	$(dom+" tr")[0].remove();
	$(dom).prepend("<tr id='sm"+id+"'>"
							+"<td class='ipChange'>"+ip+"</td>"
							+"<td class='disChange'>"+dis+"</td>"
							+"<td><span class='edittocheck'>修改</span>&nbsp&nbsp<span class='deltocancel'>删除</span></td>"
							+"</tr>");
	$(dom).prepend("<tr>"
							+"<td>IP地址</td>"
							+"<td>所在区域</td>"
							+"<td>操作</td>"
							+"</tr>");
	return id
}



// ==============================================================================
// 组件二
function init(lenth){
	// if (columnData !== undefined)
	// 	columnData.splice(0,columnData.length);
	$('.edittocheck').unbind();
	$('.deltocancel').unbind();
	const columnData=new Array();
	$('.edittocheck').click(function(){
		var thisspan = $(this)
		var iptd = thisspan.parent().prevAll('.ipChange')
		var typetd = thisspan.parent().prevAll('.devtd1')
		var factd = thisspan.parent().prevAll('.devtd2')
		var numtd = thisspan.parent().prevAll('.devtd3')
		var distd = thisspan.parent().prevAll('.disChange')

		columnData['ip']=iptd.text();
		columnData['type']=typetd.text();
		columnData['fac']=factd.text();
		columnData['num']=numtd.text();
		columnData['dis']=distd.text();

		if ( thisspan.text()==="修改" ) {
		//点击修改
			thisspan.text("确认")
			thisspan.next().text("取消")
			console.log(iptd)
			var ipinput = $("<input type='text' value='" + columnData['ip'] + "'/>");
			var disinput = $("<input type='text' value='" + columnData['dis'] + "'/>");
			var typeselect = $("<select onblur='searchFac(this.value, "+lenth+")'></select>");
			var facselect = $("<select id='facSel' onblur='searchNum(this.value, "+lenth+")'></select>");
			var numselect = $("<select id='numSel'></select>");
			iptd.html(ipinput);
			distd.html(disinput);
			typetd.html(typeselect);
			factd.html(facselect);
			numtd.html(numselect);

			//绑定下拉菜单
			pushTypeData(lenth, columnData['type'])
			searchFac(columnData['type'], lenth, columnData['fac'])
			searchNum(columnData['fac'],lenth, columnData['num'])
		}else{
		//点击确认
			thisspan.text("修改")
			thisspan.next().text("删除")

			if (iptd.children('input').val() != columnData['ip']) {
				columnData['ip'] = iptd.children('input').val();
			}
			if (typetd.children('input').val() != columnData['type']) {
				columnData['type'] = typetd.children('input').val();
			}
			if (factd.children('input').val() != columnData['fac']) {
				columnData['fac'] = factd.children('input').val();
			}
			if (numtd.children('input').val() != columnData['num']) {
				columnData['num'] = numtd.children('input').val();
			}
			if (distd.children('input').val() != columnData['dis']) {
				columnData['dis'] = distd.children('input').val();
			}
			iptd.text(columnData['ip']);
			distd.text(columnData['dis']);
			typetd.text(columnData['type']);
			factd.text(columnData['fac']);
			numtd.text(columnData['num']);

		}
	});
	//点击绑定
	$('.deltocancel').click(function(){
		var thisspan = $(this)
		var iptd = thisspan.parent().prevAll('.ipChange')
		var distd = thisspan.parent().prevAll('.disChange')
		var typetd = thisspan.parent().prevAll('.devtd1')
		var factd = thisspan.parent().prevAll('.devtd2')
		var numtd = thisspan.parent().prevAll('.devtd3')
		if ( thisspan.text()=="删除" ) {
		//删除
			thisspan.parents()[1].remove();
		}
		else{
		//取消 不保存
			thisspan.text("删除");
			thisspan.prev().text('修改');
			iptd.text(columnData['ip']);
			distd.text(columnData['dis']);
			typetd.text(columnData['type']);
			factd.text(columnData['fac']);
			numtd.text(columnData['num']);
		}
	});

}

// ===========init结束==============

//增加
function addDev(ip, type, fac, num, dis, dom="#scanTable"){
	var id = $(dom+ " tr").length-2;
	$(dom+" tr")[0].remove();
	$(dom).prepend("<tr id='sc"+id+"'>"
							+"<td class='ipChange'>"+ip+"</td>"
							+"<td class='devtd1' id='devType"+id+"'>"+type+"</td>"
							+"<td class='devtd2' id='devFac"+id+"'>"+fac+"</td>"
							+"<td class='devtd3' id='devNum"+id+"'>"+num+"</td>"
							+"<td class='disChange'>"+dis+"</td>"
							+"<td><span class='edittocheck'>修改</span>&nbsp&nbsp<span class='deltocancel'>删除</span></td>"
							+"</tr>");
	$(dom).prepend("<tr>"
							+"<td>IP地址</td>"
							+"<td>设备类型</td>"
							+"<td>厂商</td>"
							+"<td>型号</td>"
							+"<td>所在区域</td>"
							+"<td>操作</td>"
							+"</tr>");
	return id;
}
//===========================以下是获取下拉内容函数============================
function pushTypeData(lenth,selectedVal){
	$.get('http://115.231.103.3:50092/mockjsdata/18/api/type', function(devtype) {
		for (var id = 0; id < lenth; id++) {
			for (var i = 0; i < devtype['type'].length; i++) {
				if (devtype['type'][i] !== selectedVal)
					$("#devType"+id+" > select").append("<option value='"+devtype['type'][i]+"'>"+devtype['type'][i]+"</option>");
				else{
					$("#devType"+id+" > select").append("<option value='"+devtype['type'][i]+"' selected>"+devtype['type'][i]+"</option>");
				}
			}
			$('#devType'+id+' > select').editableSelect();
		}
	});
}

function searchFac(keyVal, lenth, selectedVal=''){
	if (keyVal != '') {
		$.get('http://115.231.103.3:50092/mockjsdata/18/api/fac?type='+keyVal, function(devfac) {
			for (var id = 0; id < lenth; id++) {
				$('#devFac'+id+' #facSel').editableSelect('destroy');
				$('#devFac'+id+' #facSel option').remove();
				for (var i = 0; i < devfac['fac'].length; i++) {
					if (devfac['fac'][i] !== selectedVal)
						$("#devFac"+id+" > select").append("<option value='"+devfac['fac'][i]+"'>"+devfac['fac'][i]+"</option>");
					else
						$("#devFac"+id+" > select").append("<option value='"+devfac['fac'][i]+"' selected>"+devfac['fac'][i]+"</option>");
				}
				$('#devFac'+id+' > select').editableSelect();
			}
		});
	}
}

function searchNum(keyVal, lenth, selectedVal){
	if (keyVal != '') {
		$.get('http://115.231.103.3:50092/mockjsdata/18/api/num?fac='+keyVal, function(devnum) {
			for (var id = 0; id < lenth; id++) {
				$('#devNum'+id+' #numSel').editableSelect('destroy');
				$('#devNum'+id+' #numSel option').remove();
				for (var i = 0; i < devnum['num'].length; i++) {
					if (devnum['num'][i] !== selectedVal)
						$("#devNum"+id+" > select").append("<option value='"+devnum['num'][i]+"'>"+devnum['num'][i]+"</option>");
					else
						$("#devNum"+id+" > select").append("<option value='"+devnum['num'][i]+"' selected>"+devnum['num'][i]+"</option>");
				}
				$('#devNum'+id+' > select').editableSelect();
			}
		});
	}
}

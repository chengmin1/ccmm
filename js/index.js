/*
* @Author: 49371
* @Date:   2018-01-19 11:17:32
* @Last Modified by:   49371
* @Last Modified time: 2018-01-20 15:35:58
*/
// 访问
var weather;
var city;
// 请求太原天气情况

$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	Type :"get",
	success:function(obj){
	   weather=obj.data.weather;
        console.log(weather);
    }
})
// 请求城市
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	Type :"get",
	success:function(obj){
		city=obj.data;
       //console.log(obj.data);
	}
})

// 渲染数据
function updata(){
// 渲染城市
	var cityName=document.getElementsByClassName("header")[0];
	cityName.innerHTML=weather.city_name;
  // 渲染温度
	var current_temperature=document.getElementsByClassName("title1")[0];
	current_temperature.innerHTML=weather.current_temperature+"°";
  // 渲染空气质量
	var quality_level=document.getElementsByTagName("h3")[0];
	quality_level.innerHTML=weather.quality_level;
  // 渲染上面大的天气情况
	var current_condition=document.getElementsByClassName("title2")[0];
	current_condition.innerHTML=weather.current_condition;
  // 渲染湿度
	var wind_direction=document.getElementsByClassName("wind_direction")[0];
	wind_direction.innerHTML=weather.wind_direction;

  // 今天的最高温和最低温
    var dat_high_temperature=document.getElementById("dat_high_temperature");
    dat_high_temperature.innerHTML=weather.dat_high_temperature;
    var dat_low_temperature=document.getElementById("dat_low_temperature");
    dat_low_temperature.innerHTML=weather.dat_low_temperature;
  // 今天天气情况
    var day_condition=document.getElementById("day_condition");
    day_condition.innerHTML=weather.day_condition;
  // 获取今天天气图片
    var dat_weather_icon_id=document.getElementById("dat_weather_icon_id");
    dat_weather_icon_id.style=`background-image:url(img/${weather.dat_weather_icon_id}.png);`;
  // 明天的最高温和最低温
    var tomorrow_high_temperature=document.getElementById("tomorrow_high_temperature");
    tomorrow_high_temperature.innerHTML=weather.tomorrow_high_temperature;
    var tomorrow_low_temperature=document.getElementById("tomorrow_low_temperature");
    tomorrow_low_temperature.innerHTML=weather.tomorrow_low_temperature;
  // 获取明天天气情况
    var tomorrow_condition=document.getElementById("tomorrow_condition");
    tomorrow_condition.innerHTML=weather.tomorrow_condition;
  // 获取明天天气图片
    var tomorrow_weather_icon_id=document.getElementById("tomorrow_weather_icon_id");
    tomorrow_weather_icon_id.style=`background-image:url(img/${weather.tomorrow_weather_icon_id}.png);`;

// 今天icon
for(var i in weather.hourly_forecast){
	// 创建父元素div
	var now=document.createElement("div");
	// 给父元素div加样式
	now.className="now";
	// 获取now的父元素
	var nowp=document.getElementById("now");
	// 把now插入到父元素中
	nowp.appendChild(now);

// 实时时间
	var now_time=document.createElement("h2");
    now_time.className="now_time";
    now_time.innerHTML=weather.hourly_forecast[i].hour+":00";
    now.appendChild(now_time);

// 实时天气图片
    var now_icon=document.createElement("div");
    now_icon.className="now_icon";
    now_icon.style=`background-image:url(img/${weather.hourly_forecast[i].weather_icon_id}.png);`;
    now.appendChild(now_icon);

// 实时温度
    var now_temperature=document.createElement("h3");
    now_temperature.className="now_temperature";
    now_temperature.innerHTML=weather.hourly_forecast[i].temperature+"°";
    now.appendChild(now_temperature);
}

// 近几天icon
for(var j in weather.forecast_list){
	// 创建父元素div
	var recent=document.createElement("div");
	// 给父元素div加样式
	recent.className="recent";
	// 获取recent的父元素
	var recentp=document.getElementById("recent");
	// 把recent插入到父元素中
	recentp.appendChild(recent);
   //近期日期
	var recent_time=document.createElement("span");
    recent_time.className="recent_time";
    recent_time.innerHTML=weather.forecast_list[j].date.substring(5,7)+"/"+weather.forecast_list[j].date.substring(8);
    recent.appendChild(recent_time);
 
    
	var recent_wea=document.createElement("h2");
    recent_wea.className="recent_wea";
    recent_wea.innerHTML=weather.forecast_list[j].condition;
    recent.appendChild(recent_wea);

    var recent_pic=document.createElement("div");
    recent_pic.className="recent_pic";
    recent_pic.style=`background-image:url(img/${weather.forecast_list[j].weather_icon_id}.png);`;
    recent.appendChild(recent_pic);

    var recent_high=document.createElement("h3");
    recent_high.className="recent_high";
    recent_high.innerHTML=weather.forecast_list[j].high_temperature+"°";
    recent.appendChild(recent_high);

    var recent_low=document.createElement("h4");
    recent_low.className="recent_low";
    recent_low.innerHTML=weather.forecast_list[j].low_temperature+"°";
    recent.appendChild(recent_low);

    var recent_wind=document.createElement("h5");
    recent_wind.className="recent_wind";
    recent_wind.innerHTML=weather.forecast_list[j].wind_direction;
    recent.appendChild(recent_wind);

    var recent_level=document.createElement("h6");
    recent_level.className="recent_level";
    recent_level.innerHTML=weather.forecast_list[j].wind_level+"级"
    recent.appendChild(recent_level);
}

// 访问太原进入下一界面
var header=document.getElementsByClassName("header")[0];
var city_box=document.getElementsByClassName("city_box")[0];

// 点击太原进入下一个页面
header.onclick=function(){
	$(".text").val("");
	$(".button").html("取消");
	city_box.style="display:block";
}

// 渲染城市
 for(var k in city){
 	// 输出城市
 	// console.log(k);

 	var cityp=document.getElementById("city");

 	var title=document.createElement("h1");
 	title.className="title";
 	title.innerHTML=k;
 	cityp.appendChild(title);

 	var con=document.createElement("div");
 	con.className="con";
 // 二级城市输出
 	for(var y in city[k]){
     // console.log(y);
     // 渲染二级城市
     var erji=document.createElement("div");
     erji.className="son";
     erji.innerHTML=y;
     con.appendChild(erji);
   }
 	cityp.appendChild(con);
 }

}

// 查找各个城市天气信息
function AJAX(str){
	$.ajax({
	url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
	dataType:"jsonp",
	Type :"get",
	success:function(obj){
	   weather=obj.data.weather;
	   updata();
	   $(".city_box").css({"display":"none"});
       // console.log(weather);
	}
})
}

// 当页面加载完成执行的代码
window.onload=function(){
	updata();
	// 
    $(".son").on("click",function(){
     var cityh=this.innerHTML;
     AJAX(cityh);
    })

    // 当input获取焦点时，button变确认，focus为获取焦点
    // 设置或改变元素的内容
    $(".text").on("focus",function(){
    	$(".button").html("确认");//将button中的取消按钮改为确认
    })

    //操作按钮
    var button=document.getElementsByClassName("button")[0];
    //console.log(button);
    button.onclick=function(){
    	//console.log(1);
    	//获取button中间的内容
    	var btn=button.innerHTML;
    	//console.log(btn);
    	if(btn=="取消"){
    		var city_box1=document.getElementsByClassName("city_box")[0];
    		console.log(city_box1);
    		city_box1.style="display:none";
    	}
    	else{
    		var str=document.getElementsByClassName("text")[0].value;//value用来获取text值
    		// console.log(str);
    		for(var i in city){
    			for(var j in city[i]){
    			//console.log(i);
    			if(str==j){
    				AJAX(str);
    			    return;
    		}
    				}
    			}
    			alert("没有改城市气象信息");
    			}
    		  }
    	    }
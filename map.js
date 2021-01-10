var all_city_name = ['臺北市','新北市','桃園市','臺中市','臺南市','高雄市',
'新竹縣','苗栗縣','彰化縣','南投縣','雲林縣','嘉義縣','屏東縣',
'宜蘭縣','花蓮縣','臺東縣','澎湖縣','金門縣','連江縣',
'基隆市','新竹市','嘉義市'];

var all_city_lat_long = {'臺北市':[25.087781,121.5598],'新北市':[24.91571,121.6739],'桃園市':[24.831701,121.237458],
'臺中市':[24.23321,120.9417],'臺南市':[23.140105,120.331414],'高雄市':[22.985966,120.666],
'新竹縣':[24.70328,121.1252],'苗栗縣':[24.48927,120.9417],'彰化縣':[23.99297,120.4818],'南投縣':[23.83876,120.9876],
'雲林縣':[23.75585,120.3897],'嘉義縣':[23.45889,120.574],'屏東縣':[22.370476,120.62],
'宜蘭縣':[24.69295,121.7195],'花蓮縣':[23.7569,121.3542],'臺東縣':[22.665937,121.246482],
'澎湖縣':[23.590884,119.581719],'金門縣':[24.439576,118.334973],'連江縣':[26.151218,119.936364],
'基隆市':[25.10898,121.7081],'新竹市':[24.785081,120.958588],'嘉義市':[23.47545,120.4473]};

var all_city_view = {'臺北市':11,'新北市':9,'桃園市':9.3,'臺中市':9.3,'臺南市':9,'高雄市':9.1,
'新竹縣':9,'苗栗縣':9,'彰化縣':10,'南投縣':9,'雲林縣':9,'嘉義縣':9,'屏東縣':9,
'宜蘭縣':9,'花蓮縣':8,'臺東縣':8,'澎湖縣':10.5,'金門縣':11,'連江縣':10,
'基隆市':11,'新竹市':11,'嘉義市':11.5};

// let marker_data =  eval('{{marker_data|safe}}'); 
// let marker_data = JSON.parse('{{ marker_data | tojson | safe}}');
var marker_data;
$.post( "/postmethod", {
    canvas_data: JSON.stringify(outputData)
  }, function(err, req, resp){
    marker_data = resp["responseJSON"];  
  });

let city_select = document.getElementById("city_select");
var map;
var first_draw = true;

for(let i = 0; i < all_city_name.length; i ++){
    city_select.options[i] = new Option(all_city_name[i],all_city_name[i]);
}
var selected_city = document.getElementById("city_select").value;
selected_fn(selected_city);
function selected_fn(s){
    if(!first_draw){
        map.remove();
    }
    // $("p").text(s);
    selected_city = s;
    draw_map(selected_city);
    first_draw = false;
}
function draw_map(selected_city){
    map = L.map('map').setView(all_city_lat_long[selected_city], all_city_view[selected_city]);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '<a href="https://www.openstreetmap.org/">OpenStreetMap</a> | <a href="https://noob.tw/openstreetmap/">Tutorial 教學</a>',
        maxZoom: 18,
    }).addTo(map);
    // let selected_city = '台北市';
    $.getJSON('static/json/taiwanCities.geojson.json', data=>{
        let county_city = L.geoJSON(data.features, {
            style: function(d){
                if(d.properties.name == selected_city){
                    // $("p").text(d.properties.name);
                    return {color: 'red',
                            strokeWidth:2,
                            strokeColor: 'red',
                            // fillColor: '#f03',
                            fillOpacity: .08,
                            };
                }
                else{
                    return {
                            strokeWidth:0,
                            strokeColor: null,
                            color: null,
                            fillOpacity: 0
                            };
                }
            }
        });
        county_city.addTo(map);
    });
    // let markers = [L.marker([22.6214074,120.3103684]),L.marker([24.785423, 120.987970])]
    var markers = marker_data[selected_city];
    // var marker = L.marker([22.6214074,120.3103684]);
    $("p").text(String(marker_data));
    console.log(marker_data[selected_city][0]);
    for(let i = 0; i < markers.length; i++){
        L.marker([markers[i][0], markers[i][1]]).addTo(map);
    }
}














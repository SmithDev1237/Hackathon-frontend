$("#spnStatus").html("Down");
$("#spnStatus").addClass("red");
$("#spnStatus").removeClass("green");
var socket = io('http://127.0.0.1:8080')
// alerts
socket.on('connect', (socket) => {
    //let token = socket.handshake.query.token;
    $("#spnStatus").html("Up");
    $("#spnStatus").addClass("green");
    $("#spnStatus").removeClass("red");
});

socket.on('alerts', (alert) => {
    console.log(alert);
    var data = JSON.parse(alert);
    $("#tblStatus").append("<tr><td>"+data.name+"</td><td>"+data.status+"</td><td>"+data.text+"</td></tr>");
    //{"deviceId":2,"lat":52.175741,"long":-3.104488,"name":"Alarm 2","status":"Ok","text":"non-person object has been spotted."}

    var pinPosition = [data.long, data.lat];
    map.markers.add(new atlas.HtmlMarker({
        htmlContent: "<div><div class='pin bounce'></div><div class='pulse'></div><span class='markerName'>"+data.name+"</span></div>",
        position: pinPosition,
        pixelOffset: [5, -18],
        name: data.name
    }));
});
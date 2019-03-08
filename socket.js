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

function PinData() {
    this.id;
    this.pin;
}

var pinData = [];

socket.on('alerts', (alert) => {
    console.log(alert);
    var data = JSON.parse(alert);
    var className = "green";
    //{"deviceId":2,"lat":52.175741,"long":-3.104488,"name":"Alarm 2","status":"Ok","text":"non-person object has been spotted."}


    switch (data.status) {

        case "Error":

        className = "red";
            var pinPosition = [data.long, data.lat];
            var pin = new atlas.HtmlMarker({
                htmlContent: "<div><div class='pin bounce'></div><div class='pulse'></div><span class='markerName'>" + data.name + "</span></div>",
                position: pinPosition,
                pixelOffset: [5, -18],
                name: data.name
            })

            var found = false;
            for (var i = 0; i < pinData.length; i++) {

                if (pinData[i].id == data.deviceId) {
                    found = true;
                    break;
                }
            }
           

            if (found == false) {

                var newData = new PinData();
                newData.id = data.deviceId;
                newData.pin = pin;
                pinData.add()

                map.markers.add(pin);
            }

            break;

        case "Ok":

            var found = false;
            for (var i = 0; i < pinData.length; i++) {

                if (pinData[i].id == data.deviceId) {
                    map.markers.remove(pinData[i].pin);
                    pinData.splice(i);
                    break;
                }
            }
            break;
    }

    $("#tblStatus").append("<tr class='" + className + "'><td>" + data.name + "</td><td>" + data.status + "</td><td>" + data.text + "</td></tr>");
});
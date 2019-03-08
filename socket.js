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
    AddAlert(data);
});

function AddAlert(data) {
    var className = "green";

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
                pinData.push(newData);
                map.markers.add(pin);
            }

            break;

        case "Ok":

            // var pinPosition = [data.long, data.lat];
            // var pin = new atlas.HtmlMarker({
            //     htmlContent: "<div><div class='pinGreen bounce'></div><div class='pulseGreen'></div><span class='markerNameGreen'>" + data.name + "</span></div>",
            //     position: pinPosition,
            //     pixelOffset: [5, -18],
            //     name: data.name
            // })
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

    $("#tblStatus").prepend("<tr class='" + className + "'><td><strong>" + data.name + "</strong></td><td><strong>" + data.status + "</strong></td><td><strong>" + data.text + "</strong></td></tr>");
}
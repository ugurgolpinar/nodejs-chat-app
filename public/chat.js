const socket = io.connect("https://golpinarugur.herokuapp.com/");

const baslik = document.querySelector("#baslik");
const mesaj = document.querySelector("#mesaj");
const gonderBtn = document.querySelector("#gonder");
const output = document.querySelector("#output");
const feedback = document.querySelector("#feedback");

gonderBtn.addEventListener("click", () => {
    socket.emit("chat", {
        baslik: baslik.value,
        mesaj: mesaj.value
    });

    mesaj.value = "";
});

mesaj.addEventListener("focus", (e) => {
    socket.emit("yaziyor", baslik.value);
});

mesaj.addEventListener("blur", (e) => {
    feedback.innerHTML = "";
});

mesaj.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        socket.emit("chat", {
            baslik: baslik.value,
            mesaj: mesaj.value
        });

        mesaj.value = "";
    }
});



socket.on("chat", (data) => {
    output.innerHTML += "<p><strong>" + data.baslik + " :</strong> " + data.mesaj + "</p>";
    feedback.innerHTML = "";
});


socket.on("yaziyor", (data) => {
    feedback.innerHTML = "<p><span>" + data + "</span> yazıyor...</p>";
});
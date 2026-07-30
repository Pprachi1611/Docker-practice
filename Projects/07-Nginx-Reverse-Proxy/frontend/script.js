document.getElementById("btn").addEventListener("click", async () => {

    const response = await fetch("/api");

    const data = await response.text();

    document.getElementById("result").innerText = data;

});
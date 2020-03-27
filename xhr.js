const getData = () => {
    // New XMLHttpRequest instance
    const xhr = new XMLHttpRequest();

    // API URL
    const apiURL = "https://covid19.mathdro.id/api/countries/ID/confirmed";

    // Membuka jalur untuk ke API
    xhr.open('GET', apiURL);

    xhr.onload = () => {
        // Mengambil data dari response.
        const data = JSON.parse(xhr.response);

        // Menambahkan data ke HTML dengan id "total_case", "total_recovered", dan "total_death".
        // Data disisipkan ke attribut "data-number" untuk ditampilkan
        document.getElementById("total_case").setAttribute("data-number", data[0].confirmed);
        document.getElementById("total_recovered").setAttribute("data-number", data[0].recovered);
        document.getElementById("total_death").setAttribute("data-number", data[0].deaths);
    };

    // Mengirimkan request
    xhr.send();

};
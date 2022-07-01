let localStorage = window.localStorage;

document.getElementById("lang").onchange = function(){
    localStorage.setItem("lang", this.value);
    doTranslation(this.value);
}

let lang = localStorage.getItem("lang");

/*
    Jeigu kalba jau saugoma atmintyje tokiu atveju tą kalbą 
    priskiriu kalbos keitikliui
    kitu atveju kintamajam lang priskiriu reikšmę iš kalbos keitiklio 
    ir pasidedu į naršyklės atmintį
*/
if(lang){
    document.getElementById("lang").value = lang;
} else {
    lang = document.getElementById("lang").value;
    localStorage.setItem("lang", lang);
}

doTranslation(lang);


function doTranslation(lang){
    fetch(`${lang}.json`) // failo pavadinimas pagal tai kokia kalba pasirinkta
        .then(response => response.json()) // turinys paverąiamas į objektą
        .then(data => {  // toliau galime dirbti su tuo objektu-turiniu iš failo
            document.querySelectorAll("[data-lang]").forEach(element =>{
                const key = element.getAttribute("data-lang");
                element.innerHTML = data.menu[key];
            });
        });
}
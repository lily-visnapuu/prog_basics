const loend = document.getElementById("loend")
const nupp = document.getElementById("nupp")
const ylesanneteLoend = document.getElementById("ylesanneteLoend")
const sortimiseNupp = document.getElementById("sortimine")
const filtreeriKoik = document.getElementById("filtreeriKoik")
const filtreeriTaitmata = document.getElementById("filtreeriTaitmata")
const filtreeriTaidetud = document.getElementById("filtreeriTaidetud")

let ylesanded = [] //massiiv minu yl jaoks

nupp.addEventListener('click', function() {
    const tekst = loend.value.trim() //tyhikute eemald

    //uus yl
    if (tekst !== '') {
        const uusYlesanne = {
            tekst: tekst,
            tehtud: false //checkbox tyhi
        }
        ylesanded.push(uusYlesanne)
        kuvaYlesanded(ylesanded)
        loend.value = ''        
    } else {
        alert('Palun sisesta oma ülesanne')
    }
    }
)

//nyyd saan loendit kuvada
function kuvaYlesanded(ulesanded) {
    ylesanneteLoend.innerHTML = ''

    //list element koos checkboxiga
    ulesanded.forEach((ulesanne, index) => {
        const uusLi = document.createElement('li')
        uusLi.innerHTML = `
        <input type="checkbox" ${ulesanne.tehtud ? 'checked' : ''} onchange="muudaTaitmist(${index})">
        <span style="text-decoration:${ulesanne.tehtud ? 'line-throuch' : 'none'}">${ulesanne.tekst}</span>
        <button onclick="muudaYlesanne(${index})">Muuda</button>
        <button onclick="kustutaYlesanne(${index})">Kustuta</button>
        `
        ylesanneteLoend.appendChild(uusLi)
    })
}

//saan muuta kas tehtud voi mitte
function muudaTaitmist(index) {
    ylesanded[index].tehtud = !ylesanded[index].tehtud
    kuvaYlesanded(ylesanded)
}

//yl muutmine
function muudaYlesanne(index) {
    const uusTekst = prompt('Muuda ülesannet:', ylesanded[index].text)
    if (uusTekst !== null) {
        ylesanded[index].tekst = uusTekst
        kuvaYlesanded(ylesanded)
    }
}

//yl kustutamine
function kustutaYlesanne(index) {
    ylesanded.splice(index, 1)
    kuvaYlesanded(ylesanded)
}

//sorteerib ja paneb jarjestusse tehtud yl
sortimiseNupp.addEventListener('click', function() {
    const sorteeritud = [...ylesanded].sort((a, b) => a.tehtud - b.tehtud)
    kuvaYlesanded(sorteeritud)
})

//koik yl
filtreeriKoik.addEventListener('click', function() {
    kuvaYlesanded(ylesanded)
})

//tegemata yl
filtreeriTaitmata.addEventListener('click', function() {
    const taitmata = ylesanded.filter(ulesanne => !ulesanne.tehtud)
    kuvaYlesanded(taitmata)
})

//tehtud yl
filtreeriTaidetud.addEventListener('click', function() {
    const taidetud = ylesanded.filter(ulesanne => ulesanne.tehtud)
    kuvaYlesanded(taidetud)
})

//yay :)
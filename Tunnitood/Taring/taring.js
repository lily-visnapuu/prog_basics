function veeretaTaringut() {
    let taringuteArv = document.getElementById("taringuteArv").value
    let tulemused = []
    let taringhtml = ''

    for (let i = 0; i < taringuteArv; i++) {
        let veeretamine = Math.floor(Math.random() * 6) +1
        tulemused.push(veeretamine)
        taringhtml += `<img src="dice${veeretamine}.png" alt="Täring ${veeretamine}" style="width:50px;">`
    }
    document.getElementById("tulemus").textContent = `Täringute näod: ${tulemused}`
    document.getElementById("taringimg").innerHTML = taringhtml
}
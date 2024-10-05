const suurtahed = 'ABCDEFGHIJKLMNOPQRSTUVÕÄÖÜWXY'
const vaiketahed = 'abcdefghijklmnopqrstuvõäöüwxy'
const numbrid = '0123456789'
const sumbolid = '!@#$%^&'

function genereeriParool() {
    let pikkus = document.getElementById("pikkus").value
    let lisaSuurtahed = document.getElementById("suurtaht").checked
    let lisaVaiketahed = document.getElementById("vaiketaht").checked
    let lisaNumbrid = document.getElementById("numbrid").checked
    let lisaSumbolid = document.getElementById("sumbolid").checked

    let koikTahed = ''
    if (lisaSuurtahed) koikTahed += suurtahed
    if (lisaVaiketahed) koikTahed += vaiketahed
    if (lisaNumbrid) koikTahed += numbrid
    if (lisaSumbolid) koikTahed += sumbolid

    let parool = ''
    for (let i = 0; i < pikkus; i++) {
        let suvaIndeks = Math.floor(Math.random() * koikTahed.length)
        parool += koikTahed[suvaIndeks]
    }
    document.getElementById('tulemus').textContent = parool
}
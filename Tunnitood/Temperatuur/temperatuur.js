function teisendaTemp() {
    let temperatuur = document.getElementById("temperatuur").value
    let skaala = document.querySelector('input[name="skaala"]:checked').value //raadio-nupu valik

    if (skaala === 'C') {
        let fahrenheit = (temperatuur * 9/5) + 32
        alert(`${temperatuur}°C = ${fahrenheit}°F`) //alertis peab kasutama viltust ülakoma `
    } else if (skaala === 'F') {
        let celsius = (temperatuur - 32) * 5/9
        alert(`${temperatuur}°F = ${celsius}°C`)
    }
}
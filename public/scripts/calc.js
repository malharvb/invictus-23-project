const fetcher = async (e) => {
    e.preventDefault()
    const response = await fetch(
        '/api/productInfo', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify({
            volume: document.querySelector('#mpg').value,
            unit: document.querySelector('#unit').value,
            elec: document.querySelector('#elec').value
        }),
    })
    
    const json = await response.json();

    if (json.error) {
        document.querySelector('#op-calc').textContent = "Error: " + json.error
        return;
    }

    document.querySelector('#mpg').value = ""
    document.querySelector('#elec').value = ""
    document.querySelector('#op-calc').textContent = json.co2 + " kgs CO2 emitted"
}


document.querySelector('#sub-btn').addEventListener('click', fetcher)
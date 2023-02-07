const ctx = document.getElementById('myChart');
let userCountry = ctx.getAttribute('name')
console.log(userCountry)

let fetchedArr;

const fetcher = async () => {
    const response = await fetch(
        '/api/fetchData', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify({
            collection: "changeTemp",
            query: { ISO_3DIGIT: userCountry },
        }),
    })
    
    const json = await response.json();
    return json
}

count=0
       
fetcher().then( (fetchedArr) => {
    fetchedArr = fetchedArr.filter((element) => {
        if (element["Timeperiod_Variable_month_scenario_ensemble"].split('_')[5] != "median" & count < 60){
            count++
            return true;
        }
        else 
            return false;
    })

    function compare( a, b ) {
        if ( a["Timeperiod_Variable_month_scenario_ensemble"] < b["Timeperiod_Variable_month_scenario_ensemble"] ){
          return -1;
        }
        if ( a["Timeperiod_Variable_month_scenario_ensemble"] > b["Timeperiod_Variable_month_scenario_ensemble"] ){
          return 1;
        }
        return 0;
      }
      
    fetchedArr.sort( compare );
    labels = fetchedArr.map(el => el["Timeperiod_Variable_month_scenario_ensemble"].split('_')[0])
    
    data = fetchedArr.map(el => el["Value"])

    

    new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
        label: 'Change in temperature',
        data: data,
        borderWidth: 1,
        backgroundColor: "orangered"
        }]
    },
    options: {
        scales: {
        y: {
            beginAtZero: true
        }
        }
    }
    });


    console.log(labels, data)
})

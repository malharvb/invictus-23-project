const getCO2Emissions = async (req, res) => {
    const {volume, unit, elec} = req.body

    if (!volume || !elec) {
        return res.status(400).json({error: "Incomplete inputs. Please enter all inputs"})
    }

    const response1 = await fetch('https://beta3.api.climatiq.io/estimate', {
        method: "POST",
        body: JSON.stringify(
            {
                "emission_factor": {
                  "activity_id": "fuel_type_asphalt_and_road_oil-fuel_use_stationary_combustion"
                },
                "parameters": {
                  "volume": parseInt(volume),
                  "volume_unit": unit
                }
            },
        ),
        headers: {
            Authorization: `Bearer ${process.env.CALC_API_KEY}`
        }
    })

    const response2 = await fetch('https://beta3.api.climatiq.io/estimate', {
        method: "POST",
        body: JSON.stringify(
            {
                "emission_factor": {
                  "activity_id": "heat-and-steam-type_purchased"
                 },
                "parameters": {
                  "energy": parseInt(elec),
                  "energy_unit": "kWh"
                }
            }
        ),
        headers: {
            Authorization: `Bearer ${process.env.CALC_API_KEY}`
        }
    })

    const json1 = await response1.json();
    const json2 = await response2.json();

    console.log(unit)
    res.status(200).json({co2: parseInt(json1["co2e"]) + parseInt(json2["co2e"])})
}

module.exports = {getCO2Emissions}
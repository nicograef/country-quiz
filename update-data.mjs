import { writeFileSync } from "fs"
import fetch from "node-fetch"

async function fetchRawDataFromApi() {
    const url = "https://restcountries.com/v3.1/all?fields=name,capital,flags"

    const response = await fetch(url)
    const rawData = await response.json();

    return rawData
}

function formatRawData(rawData) {
    const formattedData = rawData.map(raw => {
        const flag = raw.flags.svg
        const country = raw.name.common
        const capital = raw.capital[0]

        return {
            flag,
            country,
            capital
        }
    })

    return formattedData
}

function writeToJsonFile(jsonData) {
    writeFileSync("./new-data.json", JSON.stringify(jsonData, null, 2))
}

async function main() {
    const rawData = await fetchRawDataFromApi()
    const formattedData = formatRawData(rawData)
    writeToJsonFile(formattedData)
}

main()
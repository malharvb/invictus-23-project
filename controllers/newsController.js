async function getHeadlines(req) {
    const region = req.query.region || 'global'
    const newsApiResponse = await fetch(`https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=climate%20${region}&pageNumber=1&pageSize=10&autoCorrect=true&fromPublishedDate=null&toPublishedDate=null`, options)
    const json = await newsApiResponse.json()
    console.log(json)
    const finalJson = json.value.map(el => {
        return {title: el.title, url: el.url, date: el.datePublished}
    });

    return finalJson
}

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': process.env.WEBSEARCH_API_KEY,
		'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
	}
};


module.exports= {getHeadlines}
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

function handleErrors(err) {
    throw new Error(err.message);
}

async function checkStatus(arrayURLs) {
    try {
        const arrayStatus = await Promise
            .all( arrayURLs
                .map( async url => {
                const res = await fetch(url);
                return `${res.status} - ${res.statusText}`;
            })
        );
        return arrayStatus;
    } catch (error) {
        handleErrors(error)
    }
    //promises async await
}

function generateURLArray(linksArray){
    return linksArray
    .map( objLink =>  Object
        .values(objLink).join() 
    );
}

async function validateURL(linksArray) {
    const links = generateURLArray(linksArray);
    const statusLink = await checkStatus(links);
    const resultados = linksArray.map(
        (objeto, indice) => ({
            ...objeto, 
            status: statusLink[indice]
        })
    );
    return resultados;
}

module.exports = validateURL ;
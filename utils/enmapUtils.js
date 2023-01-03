/**
 * @author Lothaire Guée
 * @description
 *      Contains the function linked to the database.
 */


/* ----------------------------------------------- */
/* DATABASES INITILIZATION                         */
/* ----------------------------------------------- */
const Enmap = require("enmap");

// SETUP
const setupMemes = new Enmap({name: "setup_memes"});
const memes = new Enmap({name: "memes"});
const advices = new Enmap({name: "advices"})

// Un-comment to set memes and presences into the database
const { MEMES } = require("../files/memes");
setMemes();

// Un-comment to set advices into the database
const { ADVICES } = require("../files/advices")
setAdvices();

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */

/**
 * Commentaires
 * @returns {String} Channel ID by passing the Guild ID and the type of
 * the channel you want to search.
 * Example : getSetupData(GUILD_ID, "presentation") but it can be : "proposition" or "discussion"
 */
async function getSetupData(id, type){

    switch (type) {
        case "discussion":
            // Here id is the channel
            // Because we are searching all channels from a guild setup for memes
            // It allows multiple discussions channels for example
            return await getResultsKey(setupMemes, id)
        default:
            break;
    }

}

async function getResultsKey(db, id){
    let result;
    db.fetchEverything()?.forEach( async (value, key) => {
        if(key === id)
            result = key;
    })
    return result;
}

async function getResultsValue(db, id){
    let result;
    db.fetchEverything()?.forEach( async (value, key) => {
        if(key === id)
            result = value;
    })
    return result;
}

async function setMemes(){
    // MEMES
    memes.clear();
    for(let i=0; i < MEMES.length; i++){
        memes.set(MEMES[i].command, MEMES[i].message)
    }
    console.log("Toutes les données memes / presence ont été chargé !")
}


// Only for first starting
async function setAdvices(){
    // CONSEILS
    advices.clear();
    for(let i=0; i < ADVICES.length; i++){
        advices.set(ADVICES[i])
    }
    console.log("Toutes les données des advices ont été chargé !")
}



/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	getSetupData,
    setupMemes,
    memes,
    advices,
}
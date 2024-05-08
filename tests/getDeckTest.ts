import DBUtil from '../client/src/util/dbUtil'; // Make sure the path is correct
// ~/Desktop/SoutherRealms$ npx ts-node ./tests/getDeckTest.ts
const dbUtil = new DBUtil("decks");  // Set the root path to 'decks' if that's where your deck data is stored in Firebase

async function testGetDeck(deckName: string) {
    try {
        const cards = await dbUtil.getDeck(deckName);
        console.log(`Cards in deck '${deckName}':`, cards);
    } catch (error) {
        console.error(`Failed to fetch deck '${deckName}':`, error);
    }
}

// Replace 'ExampleDeckName' with the actual deck name you want to test
testGetDeck("UCF");
//so, i set the dbUtil here to be decks, and in firebaseTests i set it to game.  so, i think maybe i need like a parent thing for the document.  not sure.
// ask evyn

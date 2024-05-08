import DBUtil from '../client/src/util/dbUtil'; // Make sure the path is correct

// Initialize DBUtil with the new common base path 'app'
const dbUtil = new DBUtil();  // Assuming 'app' is set as the default base path

async function testGetDeck(deckName: string) {
    try {
        // The deckName will now be resolved within the DBUtil class methods
        const cards = await dbUtil.getDeck(deckName);
        console.log(`Cards in deck '${deckName}':`, cards);
    } catch (error) {
        console.error(`Failed to fetch deck '${deckName}':`, error);
    }
}

// Replace 'ExampleDeckName' with the actual deck name you want to test
testGetDeck("UCF"); // Update the deck name as needed for testing

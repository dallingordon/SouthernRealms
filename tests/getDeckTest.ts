import DBUtil from '../client/src/util/dbUtil'; // Make sure the path is correct


async function testGetDeck(deckName: string) {
    try {
        // The deckName will now be resolved within the DBUtil class methods
        const cards = await DBUtil.getDeck(deckName);
        console.log(`Cards in deck '${deckName}':`, cards);
    } catch (error) {
        console.error(`Failed to fetch deck '${deckName}':`, error);
    }
}

// Replace 'ExampleDeckName' with the actual deck name you want to test
testGetDeck("UCF"); // Update the deck name as needed for testing

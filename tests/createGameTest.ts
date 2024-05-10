import DBUtil from '../client/src/util/DBUtil'; // Adjust the path to your DBUtil file

async function testCreateGameSession() {
    try {
        const sessionId = await DBUtil.createGameSession();
        console.log(`Newly created session ID:`, sessionId);
    } catch (error) {
        console.error(`Failed to create a new game session:`, error);
    }
}

// Call the test function to execute
testCreateGameSession();

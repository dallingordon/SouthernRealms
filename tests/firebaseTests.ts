import DBUtil from '../client/src/util/dbUtil'; // Make sure the path is correct

const dbUtil = new DBUtil("games");  // Assuming the root path is correct for Firebase

async function testGetAllGames() {
    try {
        const games = await dbUtil.getAllGames();
        console.log("All Games:", games);
    } catch (error) {
        console.error("Failed to fetch games:", error);
    }
}

// Run the test
testGetAllGames();

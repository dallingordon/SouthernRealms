CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL
    -- needs points and cardTypeId just fyi
);

CREATE TABLE IF NOT EXISTS deck (
    deckid INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS decksetup (
    decksetupid INTEGER PRIMARY KEY,
    cardid INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    deckid INTEGER NOT NULL,
    FOREIGN KEY (cardid) REFERENCES card(cardid),
    FOREIGN KEY (deckid) REFERENCES deck(deckid)
);

CREATE TABLE cardType (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE cardInputData (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL
);

-- Add the cardInputDataId column to the cards table with a default value of 1
ALTER TABLE cards ADD COLUMN cardInputDataId INTEGER DEFAULT 1 REFERENCES cardInputData(id);

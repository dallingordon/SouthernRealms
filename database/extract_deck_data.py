import os
import sqlite3
import firebase_admin
from firebase_admin import credentials, storage, db

# Firebase setup
cred = credentials.Certificate("../auth/southernrealms-f130b-firebase-adminsdk-8gwhx-a87375e558.json")  # Update with the path to your Firebase credentials file
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://southernrealms-f130b-default-rtdb.firebaseio.com/",
    'storageBucket': "southernrealms-f130b.appspot.com"  # Use the storage bucket name
})

# Connect to your SQLite database
conn = sqlite3.connect('southernrealms.db')
cursor = conn.cursor()

# Fetch all decks
cursor.execute("SELECT deckid, name FROM deck")
decks = cursor.fetchall()

# Data structure for Firebase
deck_data = {}

# Defaults
default_text = "Default card text"
default_type = "Default type"
default_points = 0
default_active = True

# Function to get public image URL from Firebase Storage
def get_public_image_url(filename):
    bucket_name = "southernrealms-f130b.appspot.com"
    res = f'https://firebasestorage.googleapis.com/v0/b/{bucket_name}/o/cardImages%2F{filename}?alt=media'
    return res

for deck_id, deck_name in decks:
    cursor.execute("""
        SELECT c.filename, ds.quantity, c.points, ct.name AS cardType, ci.description AS cardInputData
        FROM cards c
        JOIN decksetup ds ON c.id = ds.cardid
        LEFT JOIN cardType ct ON c.cardTypeId = ct.id
        LEFT JOIN cardInputData ci ON c.cardInputDataId = ci.id
        WHERE ds.deckid = ?
    """, (deck_id,))
    cards = cursor.fetchall()

    deck_data[deck_name] = []
    for filename, quantity, points, cardType, cardInputData in cards:
        base_filename = filename.replace('.jpg', '')
        for i in range(1, quantity + 1):
            unique_id = f"{deck_name}_{base_filename}_{i}"
            image_url = get_public_image_url(filename)
            card_data = {
                'unique_id': unique_id,
                'filename': image_url,
                'name': base_filename.replace('_', ' ').title(),
                'text': default_text,
                'type': cardType if cardType else default_type,
                'points': points,
                'cardInputData': cardInputData if cardInputData else 'none'
            }
            deck_data[deck_name].append(card_data)

conn.close()

# Upload to Firebase
ref = db.reference('app/decks')
for deck, cards in deck_data.items():
    deck_ref = ref.child(deck.replace(" ", "_"))  # Replace spaces with underscores for Firebase keys
    card_data = {card['unique_id']: card for card in cards}  # Create a dictionary with unique_id as keys
    deck_ref.set(card_data)  # Overwrites data at this reference

print("Data uploaded to Firebase successfully.")

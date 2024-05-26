import os
import sqlite3
import firebase_admin
from firebase_admin import credentials, storage

# Firebase setup
cred = credentials.Certificate("../auth/southernrealms-f130b-firebase-adminsdk-8gwhx-a87375e558.json")  # Update with the path to your Firebase credentials file
firebase_admin.initialize_app(cred, {
    'storageBucket': "southernrealms-f130b.appspot.com"  # Update with your Firebase Storage bucket URL
})

# Connect to your SQLite database
conn = sqlite3.connect('southernrealms.db')
cursor = conn.cursor()

# Fetch distinct filenames
cursor.execute("SELECT DISTINCT filename FROM cards")
filenames = cursor.fetchall()

conn.close()

# Folder containing the image files
image_folder = "/Users/dallin.gordon/Documents/CarterCards/done/"  # Update with the path to your image folder

# Firebase Storage bucket
bucket = storage.bucket()

for (filename,) in filenames:
    file_path = os.path.join(image_folder, filename)
    if os.path.exists(file_path):
        # Upload file to Firebase Storage
        blob = bucket.blob(f'cardImages/{filename}')
        blob.upload_from_filename(file_path)
        print(f"Uploaded {filename} to Firebase Storage.")
    else:
        print(f"File {filename} not found in {image_folder}.")

print("All files uploaded successfully.")

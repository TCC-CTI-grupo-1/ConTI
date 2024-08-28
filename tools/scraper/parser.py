import json

# Read the input file containing the malformed JSON
with open('marcos.json', 'r',encoding='utf-8') as file:
    data = file.read()

# Split the data into individual JSON objects
json_objects = data.split('\n')

# Initialize an empty dictionary to hold the combined JSON object
combined_json = {}

# Loop through each JSON object and update the combined dictionary
for obj in json_objects:
    if obj.strip():  # Skip any empty lines
        json_obj = json.loads(obj)
        combined_json.update(json_obj)

# Write the combined JSON object to a new file
with open('output.json', 'w',encoding='utf-8') as file:
    json.dump(combined_json, file, indent=4)

print("JSON objects have been combined successfully!")

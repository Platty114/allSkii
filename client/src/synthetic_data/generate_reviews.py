import requests
import json
import random

# Google Places API endpoint
PLACES_API_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

# API key for accessing Google Places API
API_KEY = "AIzaSyB4drKcpvuPmEboq6JB5tPJUJECPYeCu_0"

# Ski hill locations (latitude, longitude)
ski_hills = [
    {"name": "fernie", "latitude": 49.4627, "longitude": -115.0873},
    {"name": "kickinghorse", "latitude": 51.2976, "longitude": -117.0483},
    {"name": "nakiska", "latitude": 50.9427, "longitude": -115.1511},
    {"name": "sunshine", "latitude": 51.0785, "longitude": -115.7765},
    {"name": "lakelouise", "latitude": 51.4419, "longitude": -116.1622},
    {"name": "revelstoke", "latitude": 50.9584, "longitude": -118.1631},
    {"name": "panorama", "latitude": 50.460374, "longitude": -116.238157},
    {"name": "norquay", "latitude": 51.2053, "longitude": -115.6068},
    {"name": "kimberley", "latitude": 49.6879, "longitude": -116.0048},
    {"name": "silverStar", "latitude": 50.3598, "longitude": -119.061},
    {"name": "sunPeaks", "latitude": 50.8837, "longitude": -119.8891},
    {"name": "bigWhite", "latitude": 49.716, "longitude": -118.93528}
]

def get_nearby_places(latitude, longitude, keyword):
    params = {
        "key": API_KEY,
        "location": f"{latitude},{longitude}",
        "radius": 20000,  # 20 km radius
        "keyword": keyword,
        "rankby": "prominence",
        "type": "restaurant" if keyword == "restaurant" else "food",
    }
    response = requests.get(PLACES_API_URL, params=params)
    if response.status_code == 200:
        return response.json().get("results", [])
    else:
        print(f"Error fetching nearby {keyword}s - Status Code: {response.status_code}")
        return []

def save_reviews_to_json(reviews):
    with open("reviews.json", "w") as f:
        json.dump(reviews, f, indent=4)

def generate_reviews(all_places):
    reviews = []
    for place in all_places:
        num_reviews = random.randint(1, 5)  # Generate random number of reviews for each place
        for _ in range(num_reviews):
            # Generate a rating between 1 and 5
            rating = random.randint(1, 5)
            
            # Generate comments based on the rating
            if rating < 3:
                comments = "This place needs improvement."
            elif rating < 4:
                comments = "It's an okay place."
            else:
                comments = "Absolutely loved it! Highly recommended."

            review = {
                "user": generate_username(),  # Generate unique username
                "placeName": place["name"],
                "category": place["category"],
                "skiHill": place["skiHill"],
                "rating": rating,
                "comments": comments
            }
            reviews.append(review)
    return reviews

def generate_username():
    adjectives = ["Happy", "Sunny", "Awesome", "Lucky", "Kind", "Brave", "Gentle", "Wise"]
    nouns = ["Traveler", "Explorer", "Adventurer", "Wanderer", "Dreamer", "Seeker", "Voyager"]
    return random.choice(adjectives) + random.choice(nouns) + str(random.randint(1, 99))

if __name__ == "__main__":
    all_places = []

    for hill in ski_hills:
        print(f"Fetching restaurants near {hill['name']}...")
        restaurants = get_nearby_places(hill["latitude"], hill["longitude"], "restaurant")
        if restaurants:
            for restaurant in restaurants[:15]:  # Top 15 restaurants
                place = {
                    "name": restaurant["name"],
                    "category": "restaurant",
                    "skiHill": hill["name"],
                    "rating": restaurant.get("rating", 0),
                    "comments": restaurant.get("reviews", "")
                }
                all_places.append(place)

        print(f"Fetching food places near {hill['name']}...")
        food_places = get_nearby_places(hill["latitude"], hill["longitude"], "food")
        if food_places:
            for food_place in food_places[:15]:  # Top 15 food places
                place = {
                    "name": food_place["name"],
                    "category": "food",
                    "skiHill": hill["name"],
                    "rating": food_place.get("rating", 0),
                    "comments": food_place.get("reviews", "")
                }
                all_places.append(place)
                
        print(f"Fetching accommodations near {hill['name']}...")
        accommodations = get_nearby_places(hill["latitude"], hill["longitude"], "accommodation")
        if accommodations:
            for accommodation in accommodations[:15]:  # Top 15 accommodations
                place = {
                    "name": accommodation["name"],
                    "category": "accommodation",
                    "skiHill": hill["name"],
                    "rating": accommodation.get("rating", 0),
                    "comments": accommodation.get("reviews", "")
                }
                all_places.append(place)

    reviews = generate_reviews(all_places)
    save_reviews_to_json(reviews)

    print("Reviews saved to reviews.json")

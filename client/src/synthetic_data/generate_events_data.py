import pandas as pd
import random
from datetime import datetime, timedelta
import itertools

# Ski hill names
ski_hill_names = [
    "Fernie",
    "Kickinghorse",
    "Nakiska",
    "Sunshine",
    "Lakelouise",
    "Revelstoke",
    "Panorama",
    "Norquay",
    "Kimberley",
    "SilverStar",
    "SunPeaks",
    "BigWhite"
]

# Function to generate random dates within a range
def generate_random_date(start_date, end_date):
    start_hour = 9  # Start hour (9 am)
    end_hour = 16   # End hour (4 pm)
    
    # Generate random date within the specified range
    delta = end_date - start_date
    random_days = random.randint(0, delta.days)
    random_hours = random.randint(start_hour, end_hour)
    random_date = start_date + timedelta(days=random_days, hours=random_hours)
    return random_date

# Define start and end dates for the data generation
today = datetime.today().replace(hour=0, minute=0, second=0, microsecond=0)
one_year_forward = today + timedelta(days=365)
one_year_backward = today - timedelta(days=365)

# Define the categories and corresponding events
event_categories = ['Skiing', 'Snowboarding', 'Apres-Ski', 'Mountain Dining', 'Ski Equipment', 'Ski Competitions', 'Safety Lessons', 'Mountain Adventure']
event_names = {
    'Skiing': ['Ski and Snowboard Festival', 'Night Skiing Experience', 'Ski Marathon', 'Ski Hill Photography Workshop'],
    'Snowboarding': ['Freestyle Ski Show', 'Ski-In Movie Night', 'Snow Sculpture Contest', 'Ski Gear Swap'],
    'Apres-Ski': ['Apres-Ski Party', 'Ski Resort Wine Tasting'],
    'Mountain Dining': ['Mountain Restaurant Tasting', 'Torchlight Parade'],
    'Ski Equipment': ['Ski Gear Expo', 'Ski Instructor Workshop'],
    'Ski Competitions': ['Ski Cross Competition'],
    'Safety Lessons': ['Ski Patrol Demonstration'],
    'Mountain Adventure': ['Snowshoeing Expedition', 'Ski Resort Charity Event']
}

# Define pricing for each category
pricing = {
    'Skiing': 100,
    'Snowboarding': 100,
    'Apres-Ski': 30,
    'Mountain Dining': 50,
    'Ski Equipment': 75,
    'Ski Competitions': 120,
    'Safety Lessons': 25,
    'Mountain Adventure': 55,
    'Snowboarding Lessons': 70,
    'Skiing Lessons': 70,
    'Ski Racing Lessons': 100
}

# Initialize an empty list to store dataframes for each ski hill
all_hill_dataframes = []

for hill_name in ski_hill_names:
    # Generate event data
    num_events = 40
    event_dates = [generate_random_date(one_year_backward, one_year_forward) for _ in range(num_events)]
    hill = [hill_name] * num_events
    categories = [random.choice(event_categories) for _ in range(num_events)]
    names = [random.choice(event_names[category]) for category in categories]
    difficulties = ['Casual'] * num_events

    events_data = pd.DataFrame({
        'Date': event_dates,
        'Hill': hill,
        'Category': categories,
        'Name': names,
        'Difficulty': difficulties
    })

    # Generate lesson data
    lesson_categories = ['Skiing Lessons', 'Snowboarding Lessons', 'Ski Racing Lessons']
    lesson_difficulty_levels = ['Beginner', 'Intermediate', 'Advanced']
    all_permutations = list(itertools.product(lesson_categories, lesson_difficulty_levels))

    lessons_data = pd.DataFrame(columns=['Date', 'Hill', 'Category', 'Name', 'Difficulty'])

    for category, difficulty in all_permutations:
        lesson_dates = [generate_random_date(one_year_backward, one_year_forward) for _ in range(5)]
        lesson_names = [f'{difficulty} {category}' for _ in range(5)]
        lessons = pd.DataFrame({
            'Date': lesson_dates,
            'Hill': [hill_name] * 5,
            'Category': [category] * 5,
            'Name': lesson_names,
            'Difficulty': [difficulty] * 5
        })
        lessons_data = pd.concat([lessons_data, lessons])

    hill_data = pd.concat([events_data, lessons_data]).reset_index(drop=True)
    hill_data['Pricing'] = hill_data['Category'].map(pricing)

    all_hill_dataframes.append(hill_data)

# Concatenate all hill dataframes together
all_data = pd.concat(all_hill_dataframes).reset_index(drop=True)

# Export the combined dataframe to a CSV file
all_data.to_csv('.\client\src\synthetic_data\ski_hill_events_and_lesson_plans.csv', index=False)

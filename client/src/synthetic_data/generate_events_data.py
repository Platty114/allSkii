import pandas as pd
import random
from datetime import datetime, timedelta
import itertools

ski_hills = ['Fernie']

# Function to generate random dates within a range with fluctuating hours between 9 am and 4 pm
def generate_random_date(start_date, end_date):
    start_hour = 9  # Start hour (9 am)
    end_hour = 16   # End hour (4 pm)
    
    # Generate random date within the specified range
    delta = end_date - start_date
    random_days = random.randint(0, delta.days)
    random_hours = random.randint(start_hour, end_hour)
    random_minutes = random.randint(0, 0)
    random_seconds = random.randint(0, 0)
    
    random_date = start_date + timedelta(days=random_days, hours=random_hours, minutes=random_minutes, seconds=random_seconds)
    return random_date

# Define start and end dates for the data generation (one year forward and backward from today)
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


# Generate event data
num_events = 40
event_dates = [generate_random_date(one_year_backward, one_year_forward) for _ in range(num_events)]
hill = [ski_hills[0]] * num_events  # Placeholder for your hill name
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

# Define start and end dates
start_date = datetime(2023, 3, 1)  # Starting from March 2023
end_date = datetime(2024, 3, 1)    # Ending at March 2024

# Generate the first day of each month between the start and end dates
first_days_of_month = []
current_date = start_date
while current_date < end_date:
    first_days_of_month.append(current_date)
    # Move to the first day of the next month
    current_month = current_date.month + 1
    current_year = current_date.year
    if current_month > 12:
        current_month = 1
        current_year += 1
    current_date = current_date.replace(year=current_year, month=current_month, day=1)


#exit()

# Define lesson categories and difficulty levels
lesson_categories = ['Skiing Lessons', 'Snowboarding Lessons', 'Ski Racing Lessons']
lesson_difficulty_levels = ['Beginner', 'Intermediate', 'Advanced']

# Generate all permutations of lesson categories and difficulty levels
all_permutations = list(itertools.product(lesson_categories, lesson_difficulty_levels))

# Shuffle the list of permutations
random.shuffle(all_permutations)

lessons_data = pd.DataFrame(columns=['Date','Hill', 'Category', 'Name', 'Difficulty'])

permutation_index = 0


for hill in ski_hills:
    
   # Iterate over all permutations
    for permutation in all_permutations:
        # Choose a random date from the list of first days of the month
        date = random.choice(first_days_of_month)
        random_hour = random.randint(9, 16)
        date = date.replace(hour=random_hour)
        
        # Extract category and difficulty level from the permutation
        category, difficulty = permutation
        
        # Generate lesson dates for 5 weeks with two different dates per week
        lesson_dates = [date + timedelta(weeks=i, days=7*j) for i in range(5) for j in range(2)]

        lesson_dates = [date + timedelta(days=2) if index % 2 == 1 else date for index, date in enumerate(lesson_dates)]



        
        # Generate names, difficulties, and ski hill names for the lessons
        lesson_names = [f'{difficulty} {category}' for _ in range(10)]
        difficulties = [difficulty] * 10
        ski_hills = [hill] * 10  # Replace 'Your Hill Name' with your actual hill name
        
        # Create a DataFrame for the new lessons
        new_lessons = pd.DataFrame({
            'Date': lesson_dates,
            'Hill': ski_hills,
            'Category': [category] * 10,
            'Name': lesson_names,
            'Difficulty': difficulties
        })
        
        # Append the new lessons to the lessons_data DataFrame
        lessons_data = pd.concat([lessons_data, new_lessons], ignore_index=True)



# Export DataFrame to CSV file
all_data = pd.concat([events_data, lessons_data]).reset_index(drop=True)
all_data['Pricing'] = all_data['Category'].map(pricing)
all_data.to_csv('.\client\src\synthetic_data\ski_hill_events_and_lesson_plans.csv', index=False)
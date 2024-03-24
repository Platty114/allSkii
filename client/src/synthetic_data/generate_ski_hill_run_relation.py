import pandas as pd
import geopandas as gpd
from shapely.geometry import Point, box, LineString
from shapely.wkt import loads

# Constants for the conversion from km to degrees approximately
KM_TO_DEG = 1 / 111

print("Loading data...")

# Load ski hill data
ski_hills_df = pd.read_csv('./ski_hills.csv')

# Load ski runs data
ski_runs_df = pd.read_csv('./ski_run_data.csv')

# Convert ski run geometries from WKT format to shapely LineString
ski_runs_df['geometry'] = ski_runs_df['geometry'].apply(loads)

# Initialize a column for the associated ski hill
ski_runs_df['ski_hill'] = None

print("Processing intersections...")

for index, hill in ski_hills_df.iterrows():
    # Create a point for the ski hill
    hill_point = Point(hill['Longitude'], hill['Latitude'])
    
    # Generate a 5km box around the ski hill
    buffer_in_deg = 5 * KM_TO_DEG  # Adjusted back to 5km as per original requirement
    hill_box = box(hill_point.x - buffer_in_deg, hill_point.y - buffer_in_deg,
                   hill_point.x + buffer_in_deg, hill_point.y + buffer_in_deg)
    
    # Loop through ski runs to check for intersection with the hill box
    for run_index, run in ski_runs_df.iterrows():
        if hill_box.intersects(run['geometry']):
            # Associate ski hill with run if not already associated
            if pd.isna(ski_runs_df.at[run_index, 'ski_hill']):
                ski_runs_df.at[run_index, 'ski_hill'] = hill['Name']
                print(f"Associated {hill['Name']} with {run['name']}")

print("Saving results...")

# Save the updated dataframe to a new CSV
ski_runs_df.to_csv('ski_run_hill_relation.csv', index=False)
print("CSV file saved: ski_run_hill_relation.csv")

# Convert the DataFrame to a GeoDataFrame
gdf = gpd.GeoDataFrame(ski_runs_df, geometry='geometry')

# Ensure the geometry type is correct; GeoJSON requires specific types
gdf['geometry'] = gdf['geometry'].apply(lambda geom: LineString(geom) if isinstance(geom, LineString) else Point(geom))

# Save the GeoDataFrame to a GeoJSON file
gdf.to_file('ski_run_hill_relation.geojson', driver='GeoJSON')
print("GeoJSON file saved: ski_run_hill_relation.geojson")

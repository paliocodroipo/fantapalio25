import os
import shutil
#################################################################################
#                  DA CAMBIARE QUESTE 2

# Constants for old and new timestamps
OLD_TIMESTAMP = "250721_2303"  # replace with the old timestamp
NEW_TIMESTAMP = "250721_2306"  # update timestamp
#################################################################################

# List of files to update (add any .html, .js, etc. you need)
target_files = [
    "index.html",
    "boxscores/boxscores.html",
    "boxscores_tab/boxscores_tab.html",
    "game_results/game_results2024.html",
    "game_results/game_results.html",
    "player_detail/player_detail.html",
    "player_rankings_div/player_rankings.html",
    "team_rankings_div/team_rankings.html",
    "team_simulation/team_simulation.html",
    "registration/registration.html",
    "coppachiosco/coppachiosco.html",
    "updates_page/updates_page.html",
    "meme_p_rankings/meme_p_rankings.html",
    "rules/rules.html",
    "t_rankings_by_game/t_rankings_by_game.html",
    "p_rankings_by_game/p_rankings_by_game.html",
    "hall_of_fame/hall_of_fame.html",

    "script.js",
    "boxscores/boxscores.js",
    "boxscores_tab/boxscores_tab.js",
    "player_detail/player_detail.js",
    "player_rankings_div/player_rankings.js",
    "team_rankings_div/team_rankings.js",
    "team_simulation/team_simulation.js",
    "registration/registration.js",
    "coppachiosco/coppachiosco.js",
    "meme_p_rankings/meme_p_rankings.js",
    "t_rankings_by_game/t_rankings_by_game.js",
    "p_rankings_by_game/p_rankings_by_game.js",
    "game_results/game_results.js"

]

# Replace the old timestamp with the new one in each target file
for file_path in target_files:
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        content_new = content.replace(OLD_TIMESTAMP, NEW_TIMESTAMP)
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content_new)
        print(f"Updated {file_path}")
    else:
        print(f"File not found: {file_path}")

# Create a duplicate of the dataYYMMDD_hhmm.js file with the new timestamp
old_data_file = f"data{OLD_TIMESTAMP}.js"
new_data_file = f"data{NEW_TIMESTAMP}.js"
if os.path.exists(old_data_file):
    if os.path.exists(new_data_file):
        response = input(f"{new_data_file} already exists. Overwrite? (y/n): ")
        if response.lower() == 'y':
            shutil.copy(old_data_file, new_data_file)
            print(f"Overwritten {new_data_file} using {old_data_file}.")
        else:
            print(f"Skipped overwriting {new_data_file}.")
    else:
        shutil.copy(old_data_file, new_data_file)
        print(f"Copied {old_data_file} to {new_data_file}")
else:
    print(f"Data file {old_data_file} not found.")

print(f"All specified files updated from {OLD_TIMESTAMP} to {NEW_TIMESTAMP}.")


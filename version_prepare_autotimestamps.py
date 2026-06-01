from datetime import datetime
import os
import re
import shutil

# List of files to update
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
    "game_results/game_results.js",
]

# --- STEP 1: DEBUG VERSION WITH FILE TRACKING ---
print("Scanning files to detect the old timestamp...")
timestamp_counts = {}
timestamp_pattern = re.compile(r"\d{6}_\d{4}")  # Removed \b to catch everything

for file_path in target_files:
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            matches = timestamp_pattern.findall(content)

            if matches:
                # Track unique timestamps per file
                for match in set(matches):
                    timestamp_counts[match] = (
                        timestamp_counts.get(match, 0) + 1
                    )
                    # --- THIS IS THE NEW PRINT LINE ---
                    print(
                        f"✅ Found '{match}' in: {file_path} (Total files with this TS: {timestamp_counts[match]})"
                    )
            else:
                print(
                    f"   (No timestamp pattern found in existing file: {file_path})"
                )
    else:
        print(f"❌ (File physically missing on disk: {file_path})")

if not timestamp_counts:
    print("\n❌ Error: No timestamps found anywhere.")
    exit()

OLD_TIMESTAMP = max(timestamp_counts, key=timestamp_counts.get)
print(
    f"\nFound old timestamp: '{OLD_TIMESTAMP}' (present in {timestamp_counts[OLD_TIMESTAMP]} files)"
)


# --- STEP 2: GENERATE THE NEW TIMESTAMP ---
# Formats current time to YYMMDD_hhmm (e.g., May 26, 2026 at 22:08 -> 260526_2208)
NEW_TIMESTAMP = datetime.now().strftime("%y%m%d_%H%M")
print(f"Generated new timestamp: '{NEW_TIMESTAMP}'")

if OLD_TIMESTAMP == NEW_TIMESTAMP:
    print(
        " The old timestamp matches the current time. No updates needed!"
    )
    exit()


# --- STEP 3: REPLACE TIMESTAMPS IN TARGET FILES ---
print("\nUpdating files...")
for file_path in target_files:
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        if OLD_TIMESTAMP in content:
            content_new = content.replace(OLD_TIMESTAMP, NEW_TIMESTAMP)
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content_new)
            print(f" Updated {file_path}")
        else:
            print(f"ℹ️ No changes needed for {file_path}")
    else:
        print(f" File not found: {file_path}")


# --- STEP 4: DUPLICATE THE DATA FILE ---
old_data_file = f"data{OLD_TIMESTAMP}.js"
new_data_file = f"data{NEW_TIMESTAMP}.js"

if os.path.exists(old_data_file):
    if os.path.exists(new_data_file):
        response = input(
            f"\n⚠️ {new_data_file} already exists. Overwrite? (y/n): "
        )
        if response.lower() == "y":
            shutil.copy(old_data_file, new_data_file)
            print(f"Overwritten {new_data_file} using {old_data_file}.")
        else:
            print(f"Skipped overwriting {new_data_file}.")
    else:
        shutil.copy(old_data_file, new_data_file)
        print(f"\nCopied {old_data_file} to {new_data_file}")
else:
    print(f"\n⚠️ Data file {old_data_file} not found.")

print(
    f"\n Success! All specified files updated from {OLD_TIMESTAMP} to {NEW_TIMESTAMP}."
)
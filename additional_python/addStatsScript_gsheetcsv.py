import csv

def is_valid_line(row):
    if len(row) < 5:
        return False
    game = row[0].strip().upper()
    if not game.startswith(('G', 'SEMI', 'TD3', 'FINAL')):
        return False
    if "TOT" in row[3] or not row[3] or not row[4].isdigit(): # attenzione quindi primo valore dopo nome deve essere pieno non vuoto (mettere zeri)
        return False
    if "PDK Weights" in row[3]:
        return False
    try:
        # Basic numeric parsing check
        if game == "TD3":
            _ = [int(x.strip()) if x.strip().isdigit() else 0 for x in row[4:16]]
        else:
            _ = [int(x.strip()) if x.strip() != '' else 0 for x in row[4:23]]
        return True
    except ValueError:
        return False

def normalize_game_label(label):
    label = label.strip().lower()
    if label.startswith("g"):
        return f"stats_g{label[1:]}"
    elif label == "semi":
        return "stats_semi"
    elif label == "td3":
        return "stats_td3"
    elif label == "final":
        return "stats_final"
    else:
        return None

def format_player_name(name):
    clean = name.replace(u'\u00A0', ' ').replace(u'\xa0', ' ').strip()
    return ''.join(word.capitalize() for word in clean.split()) + "25"

def process_row(row, align_width=40):
    game_type = row[0].strip().lower()
    game = normalize_game_label(row[0])
    player = format_player_name(row[3])
    var_name = f"{player}.{game}"

    if game_type == "td3":
         # First 12 stats
        stats = [int(x.strip()) if x.strip().isdigit() else 0 for x in row[4:16]]
        # 13th stat: value at column index 22 (23rd column), or 0 if not present or not numeric
        last_stat = row[22].strip() if len(row) > 22 else ''
        stats.append(int(last_stat) if last_stat.isdigit() else 0)
    else:
        # Standard 19 stats
        # Replace missing or blank stats with 0
        stats = [int(x.strip()) if x.strip().isdigit() else 0 for x in row[4:23]]
        for i in [0, 9, 15, 16]:
            if i < len(stats):
                stats[i] = 0

    # Pad with spaces so `=` aligns at column `align_width`
    padding = ' ' * max(0, align_width - len(var_name))
    return f"{var_name}{padding}=      {stats}; //"


    return f"{player}.{game} =      {stats}; //"



# def convert_csv_to_js(input_file, output_file):
#     with open(input_file, encoding='utf-8-sig', newline='') as csvfile, \
#          open(output_file, 'w', encoding='utf-8') as jsfile:
#         reader = csv.reader((line.replace('\u00A0', ' ') for line in csvfile))
#         for row in reader:
#             if is_valid_line(row):
#                 js_line = process_row(row)
#                 jsfile.write(js_line + "\n")

# new function to add blank lines between games
def convert_csv_to_js(input_file, output_file):
    with open(input_file, encoding='utf-8-sig', newline='') as csvfile, \
         open(output_file, 'w', encoding='utf-8') as jsfile:
        reader = csv.reader((line.replace('\u00A0', ' ') for line in csvfile))
        prev_game = None
        for row in reader:
            if is_valid_line(row):
                current_game = normalize_game_label(row[0])
                if current_game != prev_game:
                    if prev_game is not None:
                        jsfile.write("\n\n")  # Add spacing before a new block
                    jsfile.write(f"// {current_game}\n")  # Add comment label
                js_line = process_row(row)
                jsfile.write(js_line + "\n")
                prev_game = current_game

# Example usage
convert_csv_to_js("stats_from_gsheet_StatsScript.csv", "Stats_script_output.js")

print(f"✅ Successfully wrote the JS insert stats lines.")

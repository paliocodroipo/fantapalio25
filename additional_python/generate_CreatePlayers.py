import csv

def format_variable_name(name: str) -> str:
    return ''.join(word.capitalize() for word in name.split()) + "25"

input_file = "players25_CreatePlayerScript.csv"
output_file = "CreatePlayer_calls.js"

with open(input_file, newline='', encoding='utf-8') as file:
    reader = csv.reader(file)
    player_lines = []
    player_vars = []
    for row in reader:
        # Skip fully empty rows
        if not row or all(not field.strip() for field in row):
            continue

        # Skip rows with fewer than 3 essential fields
        if len(row) < 3:
            continue

        name = row[0].strip()
        number = row[1].strip()
        zone = row[2].strip()
        extra_value = row[3].strip() if len(row) >= 4 and row[3].strip() else "0"

        # Skip if name, number, or zone is missing
        if not (name and number and zone):
            continue

        var_name = format_variable_name(name)
        player_vars.append(var_name)
        player_lines.append(
            f'const {var_name} = createPlayer("{name}", {number}, "{zone}", {extra_value});'
        )

# players25 array
player_array = "const players25 = [\n    " + ",\n    ".join(player_vars) + "\n];\n"

# Compute max length of the left part like "//VarName.stats_g1 = "
left_parts = [f'//{var_name}.stats_g1 = ' for var_name in player_vars]
max_left_len = max(len(part) for part in left_parts)

# Generate aligned stats_g1 comment lines
stats_lines = []
for left in left_parts:
    padding = ' ' * (max_left_len - len(left))
    stats_lines.append(f'{left}{padding}[]; //')

# Write everything to file
with open(output_file, 'w', encoding='utf-8') as js_file:
    js_file.write("\n".join(player_lines) + "\n\n")
    js_file.write(player_array + "\n\n")
    js_file.write("\n".join(stats_lines) + "\n")

print(f"✅ Successfully wrote {len(player_lines)} player lines with fallback values, players25 array, and aligned stats_g1 lines to {output_file}.")


# # This one does not have the numero di maglia, always puts 0
# import csv

# def format_variable_name(name: str) -> str:
#     return ''.join(word.capitalize() for word in name.split()) + "25"

# input_file = "players25_CreatePlayerScript.csv"
# output_file = "CreatePlayer_calls.js"

# with open(input_file, newline='', encoding='utf-8') as file:
#     reader = csv.reader(file)
#     player_lines = []
#     player_vars = []
#     for row in reader:
#         if len(row) >= 3 and all(field.strip() for field in row):
#             name = row[0].strip()
#             number = row[1].strip()
#             zone = row[2].strip()
#             var_name = format_variable_name(name)
#             player_vars.append(var_name)
#             player_lines.append(
#                 f'const {var_name} = createPlayer("{name}", {number}, "{zone}", 0);'
#             )

# # players25 array
# player_array = "const players25 = [\n    " + ",\n    ".join(player_vars) + "\n];\n"

# # Compute max length of the left part like "//VarName.stats_g1 = "
# left_parts = [f'//{var_name}.stats_g1 = ' for var_name in player_vars]
# max_left_len = max(len(part) for part in left_parts)

# # Generate aligned stats_g1 comment lines
# stats_lines = []
# for left in left_parts:
#     padding = ' ' * (max_left_len - len(left))
#     stats_lines.append(f'{left}{padding}[]; //')

# # Write everything to file
# with open(output_file, 'w', encoding='utf-8') as js_file:
#     js_file.write("\n".join(player_lines) + "\n\n")
#     js_file.write(player_array + "\n\n")
#     js_file.write("\n".join(stats_lines) + "\n")

# print(f"✅ Successfully wrote {len(player_lines)} player lines, players25 array, and aligned stats_g1 lines to {output_file}.")


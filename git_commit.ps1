# Run the Python script
python version_prepare.py

# Stage all changes
git add .

# Show the git status
git status

# Prompt for commit message
$commitMessage = Read-Host "Enter commit message"


Write-Output ""  # This prints a blank line for spacing
# Print the current date and time with seconds
Write-Output "Current Date and Time: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")" 
Write-Output ""  # This prints a blank line for spacing

# Commit with the provided message
git commit -m "$commitMessage"

# Push to origin master
git push origin master

# vestaboard-chorewheel-action
⚙️ Example GitHub action for making a chore wheel with Vestaboard

# Add these two keys to the settings for this action

VB_SUB_KEY

VB_SUB_SECRET

# Set the schedule on your action yaml

```
on:
  schedule:
    # run a cron job every sunday morning at 10 am CST
    - cron: "0 15 * * 0"
```

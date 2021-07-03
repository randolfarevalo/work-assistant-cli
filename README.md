# Work Assistant CLI
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![Version](https://badge.fury.io/gh/tterb%2FHyde.svg)](https://badge.fury.io/gh/tterb%2FHyde)

The purpose of the tool is to save some minute of your time by auto executing various daily administrative task for your work activies.

# Prerequisite
The following tools are integrated to the tool
* Google Mail
* ClickUp

# Features
These are the planned features 
* Extract work task on your ClickUp account
* Sends work check-in and check-out email

# Configuration
Create a folder in the root named "config", then create a json file with a name "default.json" with the content below:
```json
{
  "Mail": {
    "user": "",
    "pass": "",
    "clientId": "",
    "clientSecret": "",
    "refreshToken": "",
    "format": "text"
  },
  "ClickUp": {
    "teamId": "",
    "spaceId": "",
    "personalToken": ""
  }
}
```

# Executing the application
1. Run `npm i`
2. Create a link using the command `npm link .`

The following commands are available:
* work start
* work end
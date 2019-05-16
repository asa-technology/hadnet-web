# Hadnet
```
         ____  _______  ____
        /    |/       \|    \
       /     |   \     |     \
      /      |    |____|      \
     /       |        \|       \
    /   /|   |\___     |   |\   \
   /   /_|   |    |    |   |_\   \
  /    _     |     \   |     _    \
 /____/ |____|\_______/|____| \____\        
|___    ___|   ____|/  ____|  |  |  |
    |  |   |  |__  |  /    |  |__|  |
    |  |   |   __| | |     |   __   |
    |  |   |  |____|  \____|  |  |  |
    |__|   |_______|\______|__|  |__|
```
----------------------PRESENTS----------------------
```
     __  __          __           __ 
    / / / /___ _____/ /___  ___  / /_
   / /_/ / __ `/ __  / __ \/ _ \/ __/
  / __  / /_/ / /_/ / / / /  __/ /_  
 /_/ /_/\__,_/\__,_/_/ /_/\___/\__/  
```

Hadnet is a community focused web application that helps users connect with black-owned businesses and community groups in their area.

## Team

  - __Product Owner__: Asa Tech thesis
  - __Scrum Master__: Harvey Sanders
  - __Development Team Members__: Winntana Beyene, Jordan Estes, Adam Hebert, Sam Keer

## Table of Contents

- [Team](#team)
- [Usage](#Usage)
- [Requirements](#requirements)
- [Development](#development)
    - [Installing Dependencies](#installing-dependencies)
- [Roadmap](#roadmap)


## Usage
- `npm run server-dev`: runs nodemon and builds the Angular front end for development
- uses PM2 for production

#### To Start Server:
```npm start```

All server routes are in server/routes.

#### To Compile (Angular Files):
```ng build```

All compiled files end up in _dist/_

All Angular client files located in _src/_

All component files located in _src/app/components/_

## Requirements

- Node (^8.0.0)
- Express (^4.16.4)
- Postgres (^10.0)
- Sequelize (^5.8.1)
- Angular 7


## Development

- database/index.js - the database configuration
- server/app.js - the server


### Installing Dependencies

From within the root directory:

```
npm install
```
You will need a .env file in the root directory with the following variables:
```
MASTER_USERNAME
MASTER_PASSWORD
DB_NAME
DB_PORT
DB_ENDPOINT
SAM_API_KEY
MAPS_API_KEY
GOOGLE_IMAGE_VERIFY_KEY
```
You will need to obtain an API key from [Google Cloud](https://cloud.google.com/vision/docs/quickstart-client-libraries) for image recognition, from [Tomtom](https://developer.tomtom.com/freemaps) for maps, and from [SAM API](https://gsa.github.io/sam_api/sam/key) for business data.

### Roadmap

View the project roadmap [here](https://github.com/asa-technology/hadnet-client/projects)<br>
View the project Wireframe [here](https://www.figma.com/file/MitOK9eXtlV1mDtcz0Aq0Sip/Untitled?node-id=7%3A69)

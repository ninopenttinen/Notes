# Simple Calendar

This simple browser-based calendar allows you to create, modify and delete user events and possibly other functions. The application was created as an exercise for a school project.

# Dependencies

- Node.js
- Moment.js (can be installed with npm or yarn)
- React
- json-server (can be installed with npm or yarn)

# Installation and usage

To install the dependencies, execute either "npm install" or "yarn install" command at the root of the project folder. This should install everything necessary to run the application.

To run, execute the "npm/yarn start" command in a terminal at the root of the project folder. After the application has successfully launched, start the json-server in another terminal with the "npx json-server --watch db.json --routes routes.json -p 5000" command. This will launch the simple json-server, set it to watch db.json at the root folder, set custom routes from routes.json also at the root folder (work in progress) and configure the server to run at port 5000 to not overlap with the application.

# Uninstallation

To uninstall the application, simply delete the project folder.

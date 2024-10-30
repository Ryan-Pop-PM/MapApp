# Extension Pack Template

Template to create a new visual studio code extension pack

## What's in the folder

-  This folder contains all of the files necessary for your extension pack.
-  `package.json` - this is the manifest file that defines the list of extensions of the extension
   pack.

## Get up and running straight away

-  Press `F5` to open a new window with your extension loaded.
-  Open `Extensions Viewlet` and check your extensions are installed.

## Make changes

-  You can relaunch the extension from the debug toolbar after making changes to the files listed
   above.
-  You can also reload (`Ctrl+R` or `Cmd+R` on Mac) the VS Code window with your extension to load
   your changes.

## Install your extension

-  To start using your extension with Visual Studio Code copy it into the
   `<user home>/.vscode/extensions` folder and restart Code.
-  To share your extension with the world, read on https://code.visualstudio.com/docs about
   publishing an extension.

## Explaining scripts

-  `build`: Executes `build:clean`, `build:install` and `build:package` scripts in that order.
-  `build:clean`: Removes any `.vsix` file and the `node_modules` folder in the repository.
- `build:install`: Install dependencies with npm to obtain the `package-lock.json` file.
-  `build:package`: Create a `.vsix` file with the packaged extension with the current
   configuration.
-  `deploy`: Executes `deploy:confirm`, `build` and `deploy:publish` scripts in that order.
-  `deploy:confirm`: Shows a prompt to verify the deploying of the package.
-  `deploy:publish`: Publish the extension pack into the extension marketplace.
-  `eslint:check`: Checks the code lint on the project.
-  `eslint:fix`: Fixes the code lint of the project by updating the files that need it.
-  `prettier:check`: Checks the code format on the project.
-  `prettier:format`: Format the code lint of the project by updating the files that need it.
-  `refresh`: Executes `refresh:clean`, `npm init` and `refresh:clear` scripts in that order.
-  `refresh:clean`: Deletes the repository-related metadata attributes from the `package.json` to
   update them with the `npm init` command.
-  `refresh:clear`: Delete unnecessary attributes and sort the `package.json`.

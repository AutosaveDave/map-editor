# Map Editor
[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)

https://autosavedave.github.io/map-editor/

![Map Editor Screenshot](./src/assets/map-editor-screenshot.png?raw=true "Screenshot")

## Description

The Map editor allows users to create, edit, and save simple 3d isometric maps for games.
*The Map Editor is intended for use with future projects, and is not readily compatible with existing game engines.*

## Table of Contents

  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)

## Installation



## Usage

**Users can use the basic functionality of the map editor without logging in, but any work will not be able to be saved.**

The user icon in the upper right of the page will appear red if you are not logged in, and yellow if you are already logged in.

If you are not logged in *(user icon appears red)*:
  - Click the red user icon in the upper right of the editor to login or signup. A login/signup form will appear.
  - If you have already created an account:
    - Fill out the login form with your email and password and click the login button.
  - To create a new account:
    - Fill out the signup form (below the login form) with your email and a password *(password must be at least 6 characters)*

Once you are logged in *(user icon appears yellow)*, you may use the map editor without losing your progress.

### Map Editor Interface

**Mouse Controls**
  - Left click on a cell in the Editor Grid *(#10 in the diagram below)* to place a tile there.
  - Right click on any existing tile on the map to delete it.
  - Use the mouse wheel to adjust the position of the Editor Grid *(#10 in the diagram below)*.
  - Middle mouse button click anywhere to switch the axis of the Editor Grid *(#10 in the diagram below)* between X, Y, and Z.

![Map Editor Diagram](./src/assets/map-editor-screenshot-diagram.png?raw=true "Editor Diagram")

  1. **Map Settings** - Click to open the map settings panel (allows user to edit the name, description, and ground color of the current map).
  2. **Save Map** - Click to save the current map to your account.
  3. **Color Selector** - Shows the map editor's currently selected color. All tiles added to the map will be this color. Click to open the color selection tool for custom colors.
  4. **Add to Palette** - Click to add the currently selected color to the map's color palette (if the current color is not already in the palette).
  5. **Color Palette** - Shows the colors in the map's palette. Click a color to set the map editor's currently selected color. If a color in the map's palette is currently selected, it will appear with a bold black border around it.
  6. **User Console** - Click to open the [User Console](#user-console) (allows user to view a list of all their saved maps, open a saved map in the editor, create a new map, or logout).
  7. **Rotate View** - Click to rotate the view by 45°. The left button rotates counter-clockwise, and the right button rotates clockwise.
  8. **Move View** - Click to move the editor view one grid cell in the direction of the arrow on the button.
  9. **Center View** - Click to move the editor view to the center of the map.
  10. **Editor Grid** - The black grid that shows the current editor plane. Click inside any cell on the editor grid to place a tile of the currently selected color in that cell. The position of the editor grid can be changed using the Grid Position Tool (11) and Grid Axis Tool (12).
  11. **Grid Position** - Click the up and down arrows to move the editor grid one cell in a direction orthogonal to the editor grid, or use the range slider to set the editor grid position. *The grid position can also be adjusted using the mouse wheel.*
  12. **Grid Axis** - Click to switch the axis of the editor grid from X to Y, Y to Z, or Z to X. *Clicking the middle mouse button also accomplishes this.*
  13. **Map Name** - Displays the name of the current map.

### User Console

![Map Editor Diagram](./src/assets/map-editor-user-diagram.png?raw=true "User Console Diagram")

  1. **Refresh List** - Click to refresh Maps List from server.
  2. **Create New Map** - Click to open the Create New Map form - Enter a name and description for the new map and click "Create Map" to begin editing.
  3. **Maps List** - Displays a list of all saved maps in your account, sorted by date modified (most recently modified first). The currently selected map appears in yellow, and unselected maps appear in purple.
  4. **Map Name** - Displays the name of the map.
  5. **Map Description** - Displays the description of the map.
  6. **Date Created** - Displays the date and time the map was created
  7. **Color Palette** - Displays the colors in the map's color palette.
  8. **Date Modified** - Displays the date and time the map was last modified.
  9. **Logout Button** - Click to log out.

## License

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>

## Contributing

N/A

## Tests

Try it out! Follow the directions provided in [Usage](#usage)

## Questions

Please contact me via email with any questions.

  - GitHub: [autosavedave](https://github.com/autosavedave)

  - Email: [autosavedave@gmail.com](mailto:autosavedave@gmail.com)

# Tweaks in System Menu Gnome Shell Extension
## Overview

Tweaks in System Menu adds a shortcut button to the _Gnome
Tweaks_(a.k.a. _Tweak UI_) in the panel's system menu.

![The Tweaks button shown as separate and not merged with the Settings
button](docs/tweaks-in-system-menu.png)

The button can be positioned anywhere in the system menu, and can
even be merged with the Settings button.  If merged, the Settings
button will be shown when opening the system menu, and Tweaks will be
shown if "Alt" is pressed on the keyboard, or if the Settings button
is pressed for a half second or so.

## Configuration

Tweaks in System Menu comes with a preference panel which can be found
from the "Tweaks" application or the [Gnome Shell Extensions
page](https://extensions.gnome.org/local/).

![Tweaks in System Menu preference panel](docs/preferences.png)

## Download / Install

Install directly from the [Gnome Shell Extensions
site](https://extensions.gnome.org/extension/1653/tweaks-in-system-menu/).

Or download the zip file from the GitHub [releases
page](https://github.com/F-i-f/tweaks-system-menu/releases) and unzip
[the
file](https://github.com/F-i-f/tweaks-system-menu/releases/download/v3/tweaks-system-menu@extensions.gnome-shell.fifi.org.v3.shell-extension.zip)
in the
`~/.local/share/gnome-shell/extensions/tweaks-system-menu@extensions.gnome-shell.fifi.org`
directory (you may have to create the directory).

## Building from source

### Requirements

- [meson](http://mesonbuild.com/) v0.44.0 or later.

### Running the build

- Check out: `git clone https://github.com/F-i-f/tweaks-system-menu`

- `cd tweaks-system-menu`

- Run meson: `meson build`

- To install in your your gnome shell extensions' directory (~/.local/share/gnome-shell/extensions), run ninja: `ninja -C build install`

- To build the extension zip files, run: `ninja -C build extension.zip`, the extension will be found under `build/extension.zip`.

## Changelog

### Version 3
#### March 30, 2019

- Fix warning in logger.js that was introduced in version 2.

### Version 2
#### March 26, 2019

- ES6 / Gnome-Shell 3.32 compatibility (still compatible with 3.30 and lower).
- Updated meson-gse to latest.
- Minor doc updates.

### Version 1
#### February 11, 2019

- Initial release.

## Credits

- The [`meson-gse` credits](https://github.com/F-i-f/meson-gse/) are
  included here by reference.
- Inspiration for `AltSwitcher()` usage com from the [Hibernate Status
  Button](https://extensions.gnome.org/extension/755/hibernate-status-button/) extension.

<!--  LocalWords:  UI cd extensions' Changelog gse AltSwitcher js ES6
-->
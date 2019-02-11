// Tweaks-system-menu - Put Gnome Tweaks in the system menu.
// Copyright (C) 2019 Philippe Troin <phil@fifi.org>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

const Gio = imports.gi.Gio;
const GObject = imports.gi.GObject;
const Gtk = imports.gi.Gtk;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

const Gettext = imports.gettext.domain(Me.metadata['gettext-domain']);
const _ = Gettext.gettext;

const Logger = Me.imports.logger;

let logger = null;

function init() {
    logger = new Logger.Logger('Tweaks-System-Menu');
    Convenience.initTranslations();
}

const TweaksSystemMenuSettings = GObject.registerClass(
class TweaksSystemMenuSettings extends Gtk.Grid {
    _init(params) {
	super._init(params);

	this.margin_top = 12;
	this.margin_bottom = 12;
	this.margin_left = 48;
	this.margin_right = 48;
	this.row_spacing = 6;
	this.column_spacing = 6;
	this.orientation = Gtk.Orientation.VERTICAL;

	this._settings = Convenience.getSettings();
	logger.set_debug(this._settings.get_boolean('debug'));

	let ypos = 1;
	let descr;

	this.title_label = new Gtk.Label({
	    use_markup: true,
	    label: '<span size="large" weight="heavy">'
		+_('Tweaks in System Menu')+'</span>',
	    hexpand: true,
	    halign: Gtk.Align.CENTER
	});
	this.attach(this.title_label, 1, ypos, 2, 1);

	ypos += 1;

	this.version_label = new Gtk.Label({
	    use_markup: true,
	    label: '<span size="small">'+_('Version')
		+ ' ' + logger.get_version() + '</span>',
	    hexpand: true,
	    halign: Gtk.Align.CENTER,
	    margin_bottom: 12
	});
	this.attach(this.version_label, 1, ypos, 2, 1);

	ypos += 1;

	descr = _(this._settings.settings_schema.get_key('merge-with-settings')
		  .get_description());
	this.merge_ws_label = new Gtk.Label({
	    label: _("Merge both Settings and Tweaks:"),
	    hexpand: true,
	    halign: Gtk.Align.START
	});
	this.merge_ws_label.set_tooltip_text(descr);
	this.merge_ws_control = new Gtk.Switch({
	    hexpand: true,
	    halign: Gtk.Align.END
	});
	this.merge_ws_control.set_tooltip_text(descr);
	this.merge_ws_label.set_tooltip_text(descr);
	this.attach(this.merge_ws_label,   1, ypos, 1, 1);
	this.attach(this.merge_ws_control, 2, ypos, 1, 1);
	this._settings.bind('merge-with-settings', this.merge_ws_control,
			    'active', Gio.SettingsBindFlags.DEFAULT);

	ypos += 1;

	let sschema = this._settings.settings_schema.get_key('position');
	descr = _(sschema.get_description());
	this.position_label = new Gtk.Label({
	    label: _("Button position:"),
	    hexpand: true,
	    halign: Gtk.Align.START
	});
	this.position_label.set_tooltip_text(descr);
	let position_range = sschema.get_range().deep_unpack()[1].deep_unpack()
	this.position_control = new Gtk.SpinButton({
	    adjustment: new Gtk.Adjustment({
		lower: position_range[0],
		upper: position_range[1],
		step_increment: 1
	    }),
	    hexpand: true,
	    halign: Gtk.Align.END
	});
	this.position_control.set_tooltip_text(descr);
	this.attach(this.position_label,   1, ypos, 1, 1);
	this.attach(this.position_control, 2, ypos, 1, 1);
	this._settings.bind('position', this.position_control,
			    'value', Gio.SettingsBindFlags.DEFAULT);

	ypos += 1;

	descr = _(this._settings.settings_schema.get_key('debug')
		  .get_description());
	this.debug_label = new Gtk.Label({
	    label: _("Debug:"),
	    hexpand: true,
	    halign: Gtk.Align.START
	});
	this.debug_label.set_tooltip_text(descr);
	this.debug_control = new Gtk.Switch({
	    hexpand: true,
	    halign: Gtk.Align.END
	});
	this.debug_control.set_tooltip_text(descr);
	this.attach(this.debug_label,   1, ypos, 1, 1);
	this.attach(this.debug_control, 2, ypos, 1, 1);
	this._settings.bind('debug', this.debug_control,
			    'active', Gio.SettingsBindFlags.DEFAULT);
    }

});

function buildPrefsWidget() {
    let widget = new TweaksSystemMenuSettings();
    widget.show_all();

    return widget;
}
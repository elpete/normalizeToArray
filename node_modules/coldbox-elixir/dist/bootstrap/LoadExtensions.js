'use strict';

/**
 * Load any official Elixir extensions, if
 * they have been installed by the user.
 */
function loadOfficialExtensions() {
  loadExtension('coldbox-elixir-rollup');
  loadExtension('coldbox-elixir-stylus');
  loadExtension('coldbox-elixir-browserify');
  loadExtension('coldbox-elixir-webpack');
  loadExtension('coldbox-elixir-browsersync');

  require('require-dir')('../tasks/recipes');
};

/**
 * Load a single Elixir extension, while
 * suppressing any errors.
 *
 * @param  {string} name
 */
function loadExtension(name) {
  try {
    require(name);
  } catch (e) {}
}

loadOfficialExtensions();
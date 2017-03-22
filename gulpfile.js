const elixir = require( "coldbox-elixir" );

elixir.config.notifications = false;
elixir.config.testing.testbox.command = "clear && cross-env FORCE_COLOR=true node_modules/.bin/testbox-runner --runner http://localhost:49947/tests/runner.cfm --directory tests.specs --recurse --errorsOnly";

elixir( mix => {
    mix.testbox();
} );
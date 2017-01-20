'use strict;'

var running = false;
var delay = 1 * 60 * 1000;

module.exports = {
    initialize: function() {
        if (running) {
            return;
        }
        running = true;
        sails.log.info("Starting watchdog");
        sails.emit('fog:watchdog:start');
        async.forever(
            function(next) {
                sails.emit('fog:watchdog:tick');
                setTimeout(next, delay)
            },
            function(err) {
                running = false;
                sails.emit('fog:watchdog:crash');
                sails.log.err("Watchdog crashed, err: " + err);
                WatchdogService.initialize();
            }
        )
    }
}
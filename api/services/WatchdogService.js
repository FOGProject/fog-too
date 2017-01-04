var running = false;
var delay = 1 * 60 * 1000;

module.exports = {
    initialize: function() {
        if (running) {
            return;
        }
        running = true;
        sails.log.info("Starting watchdog");
        BusService.publish('watchdog.start');
        async.forever(
            function(next) {
                BusService.publish('watchdog.tick');
                setTimeout(next, delay)
            },
            function(err) {
                running = false;
                sails.log.err("Watchdog crashed, err: " + err);
                BusService.publish('watchdog.crash');
                WatchdogService.initialize();
            }
        )
    }
}
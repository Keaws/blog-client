exports.config = {
    directConnect: true,
    chromeDriver: '../node_modules/chromedriver/lib/chromedriver/chromedriver',
    framework: 'mocha',
    mochaOpts: {
        reporter: "spec",
        slow: 30000,
        timeout: 60000
    },
    capabilities: {
        'browserName': 'chrome'
    },
    specs: ['blog.spec.js'],
    params: {
        server: 'localhost',
        port: 8080
    },
    onPrepare: function () {
        browser.manage().window().maximize();
        require('./utils/elementFinder');
    }
};

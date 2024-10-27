

module.exports = {
    default: {
        tags: process.env.TAGS_EXECUTION
            ? `(${process.env.TAGS_EXECUTION}) and not @skip`
            : "not @skip",
        formatOptions: {
            snippetInterface: "async-await"
        },
        paths: [
            //`${process.env.TEST_TYPE}/**/${process.env.SERVICE_NAME}/features/*.feature`
            `test/resources/demoblaze/features/*.feature`
            //`test/resources/demoblaze/features/carrito.feature`
            //`test/resources/demoblaze/features/checkout.feature`
            //`test/resources/demoblaze/features/registro.feature`
            //`test/resources/demoblaze/features/login.feature`

        ],
        publishQuiet: true, 
        dryRun: false,
        require: [
            `test/resources/demoblaze/stepdefinitions/*.ts`, 
            "hooks/hooks.ts"
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "progress-bar",
            "html:test-results/cucumber-report.html",
            "json:test-results/cucumber-report.json",
            
        ],
        parallel: 4,
        retry: 0,

    },

}
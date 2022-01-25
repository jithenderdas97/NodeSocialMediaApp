module.exports = (hbs) => {
    hbs.registerHelper('isStatus', function (value) {
        return value === 1;
    });

    hbs.registerHelper('isChecked', function (value) {
        return value === 1;
    });

    hbs.registerHelper('capitalize', function (value) {
        return value.charAt(0).toUpperCase() + value.slice(1)
    })

    hbs.registerHelper('serializeNo', function (value) {
        return value + 1;
    })
}
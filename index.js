const { readdirSync, existsSync, unlinkSync } = require('fs');
const { join } = require('path');

module.exports = {
    uninstall: (packages) => {
        const packagesPath = join(require.resolve('selenium-standalone').replace(/\\\w+.?\w+$/, ''), '.selenium');
        const supportedPackages = ['chromedriver', 'geckodriver', 'edgedriver', 'iedriver', 'selenium-standalone'];
        const invalidPackages = packages.filter(package => !supportedPackages.includes(package));

        if (invalidPackages.length > 0) {
            throw new Error(
                `Invalid input: ${invalidPackages.join(', ')} \n`
                + `The following options are supported: ${supportedPackages.join(', ')}`
            );
        }

        packages
            .filter(package => existsSync(`${packagesPath}/${package}`))
            .forEach(package => readdirSync(`${packagesPath}/${package}`)
            .forEach(file => unlinkSync(join(`${packagesPath}/${package}`, file))));
    }
};

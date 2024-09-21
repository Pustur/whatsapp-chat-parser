# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.0.2] - 2024-09-21

### Changed

- Upgraded dev dependencies

### Fixed

- Attachment regex to allow more formats to be matched [#260](https://github.com/Pustur/whatsapp-chat-parser/issues/260)

## [4.0.1] - 2024-08-14

### Changed

- Upgraded dev dependencies

### Fixed

- Issue where package couldn't be installed in some circumstances due to bad metadata present on npm's servers [#256](https://github.com/Pustur/whatsapp-chat-parser/issues/256)

## [4.0.0] - 2023-02-18

### Added

- Exported types that the end user may need

### Changed

- **BREAKING** Renamed `parseStringSync` into `parseString`. The old async `parseString` has been removed
- **BREAKING** In case of a system message the `author` property will be now set to `null` as opposed to the string `"System"`
- Ship ESM and CJS versions, as well as a version for browsers. All files are minified. The new structure is the following:

  ```sh
  dist/
  ├── index.cjs       # CommonJS
  ├── index.d.ts      # Types
  ├── index.global.js # Browser without ESM
  └── index.js        # ESM
  ```

- Replaced jest with vitest
- Replaced rollup with tsup

## [3.2.3] - 2023-02-17

### Changed

- Upgraded dev dependencies

### Fixed

- Issue where a special character between the time and PM / AM would prevent the parser to work correctly [#248](https://github.com/Pustur/whatsapp-chat-parser/issues/248)

## [3.2.2] - 2023-01-03

### Changed

- Upgraded dev dependencies
- Updated some examples in readme

### Fixed

- Support old attachment format where angle brakets were used after the file name

## [3.2.1] - 2021-07-29

### Changed

- Upgraded dev dependencies

### Fixed

- Issue where date digits whould sometimes get sorted wrong [#237](https://github.com/Pustur/whatsapp-chat-parser/issues/237)

## [3.2.0] - 2021-07-08

### Added

- `parseStringSync` method [#236](https://github.com/Pustur/whatsapp-chat-parser/issues/236)

### Changed

- Upgraded dev dependencies

### Removed

- Renovate bot

## [3.1.3] - 2021-06-01

### Added

- Support for new attachment format [#231](https://github.com/Pustur/whatsapp-chat-parser/issues/231)

### Changed

- Upgraded dev dependencies

## [3.1.2] - 2021-05-28

### Added

- Some issue links in the changelog

### Changed

- Upgraded dev dependencies

### Fixed

- Issue in parsing the message when there would be a non breaking space in the `AM/PM` portion of the date [#224](https://github.com/Pustur/whatsapp-chat-parser/issues/224)

## [3.1.1] - 2021-04-02

### Changed

- Complete rewrite of the package in TypeScript
- Migrated from CircleCI to GitHub Actions
- Upgraded dev dependencies

## [3.1.0] - 2021-01-12

### Added

- `parseAttachments` option [#198](https://github.com/Pustur/whatsapp-chat-parser/issues/198)

### Changed

- Improved TypeScript types
- Updated readme with info on new `parseAttachments` option
- Upgraded dev dependencies

### Fixed

- Handle carriage return (`\r`) characters when splitting lines

## [3.0.2] - 2020-09-07

### Added

- Funding links

### Changed

- Upgraded dev dependencies

### Fixed

- Outdated username in changelog

## [3.0.1] - 2020-09-01

### Added

- Codecov badge in readme (collect coverage info in CircleCI)

### Changed

- Updated package description
- Upgraded dev dependencies

## [3.0.0] - 2020-08-13

### Removed

- **POTENTIALLY BREAKING**: Removed ES6 to ES5 transpilation.  
  This should in theory not be a problem since the transpiled version still contained some newer methods that were not polyfilled, such as `.padStart()` and every browser that supports that also supports all the other ES6 stuff.  
  So in short, transpiling to ES5 was probably never even needed.  
  Having said that I will still tag this as a major release just to be safe.

### Changed

- Minor readme improvements
- Upgraded dev dependencies
- Renovate config

## [2.0.8] - 2020-01-27

### Added

- Ability to parse date formats where the year is not the last number (e.g. `2020/01/27`)

## [2.0.7] - 2019-09-16

### Fixed

- Edge case where a message starting with a left-to-right or right-to-left mark would get parsed incorrectly

## [2.0.6] - 2019-08-22

### Fixed

- Edge case where a multiline message that contained a datetime would get parsed incorrectly

## [2.0.5] - 2019-08-18

### Added

- TypeScript types definition file [#60](https://github.com/Pustur/whatsapp-chat-parser/issues/60)

### Changed

- Node.js requirement from `8.3.0` to `8.0.0`
- Minor readme improvements

## [2.0.4] - 2019-07-31

### Fixed

- Improve regex to allow spaces between AM/PM portion (example: "p. m.")

## [2.0.3] - 2019-06-17

### Changed

- Test both `src` and `dist` files [#28](https://github.com/Pustur/whatsapp-chat-parser/issues/28) (Thanks [@TiredFalcon](https://github.com/TiredFalcon))
- Replaced [Greenkeeper](https://greenkeeper.io/) with [Renovate](https://renovatebot.com/)
- Readme badges (npm version, package size)
- Improved changelog

### Fixed

- Windows issues with `rm -rf` [#29](https://github.com/Pustur/whatsapp-chat-parser/issues/29) and timezone settings in tests [#28](https://github.com/Pustur/whatsapp-chat-parser/issues/28) (Thanks [@Mintonne](https://github.com/Mintonne))

## [2.0.2] - 2019-06-09

### Added

- Ability to parse more date formats, including Finnish, that look something like this: `31.5.2019 klo 16.58 - <author>: <message>`

## [2.0.1] - 2019-05-31

### Changed

- Massive performance improvements on parsing times [#12](https://github.com/Pustur/whatsapp-chat-parser/issues/12)

## [2.0.0] - 2019-05-29

### Added

- Browser support [#10](https://github.com/Pustur/whatsapp-chat-parser/pull/10) (Thanks [@Mintonne](https://github.com/Mintonne))

### Removed

- `parseFile` method (Node users can still read the file in their code and pass the file contents to the `parseString` function)

## [1.2.4] - 2019-04-25

### Fixed

- Unsupported regex flag 's' in node 8

## [1.2.3] - 2019-04-25

### Changed

- Upgraded dev dependencies

## [1.2.2] - 2018-11-13

### Changed

- Upgraded dev dependencies

## [1.2.1] - 2018-10-10

### Fixed

- Disable prettier for table in readme
- Wrong changelog's link in readme

## [1.2.0] - 2018-10-10

### Added

- New `parseString` method to parse a string directly

### Changed

- Improved readme and added changelog section

## [1.1.0] - 2018-08-10

### Added

- Options argument with the possibility to manually tell the program if the days or the months come first

### Fixed

- Updated changelog

## [1.0.1] - 2018-08-10

### Added

- CircleCI for continuous integration
- Install instructions in readme

### Fixed

- Removed jest config from npm package

## [1.0.0] - 2018-08-09

- Initial release

[4.0.2]: https://github.com/Pustur/whatsapp-chat-parser/compare/4.0.1...4.0.2
[4.0.1]: https://github.com/Pustur/whatsapp-chat-parser/compare/4.0.0...4.0.1
[4.0.0]: https://github.com/Pustur/whatsapp-chat-parser/compare/3.2.3...4.0.0
[3.2.3]: https://github.com/Pustur/whatsapp-chat-parser/compare/3.2.2...3.2.3
[3.2.2]: https://github.com/Pustur/whatsapp-chat-parser/compare/3.2.1...3.2.2
[3.2.1]: https://github.com/Pustur/whatsapp-chat-parser/compare/3.2.0...3.2.1
[3.2.0]: https://github.com/Pustur/whatsapp-chat-parser/compare/3.1.3...3.2.0
[3.1.3]: https://github.com/Pustur/whatsapp-chat-parser/compare/3.1.2...3.1.3
[3.1.2]: https://github.com/Pustur/whatsapp-chat-parser/compare/3.1.1...3.1.2
[3.1.1]: https://github.com/Pustur/whatsapp-chat-parser/compare/3.1.0...3.1.1
[3.1.0]: https://github.com/Pustur/whatsapp-chat-parser/compare/3.0.2...3.1.0
[3.0.2]: https://github.com/Pustur/whatsapp-chat-parser/compare/3.0.1...3.0.2
[3.0.1]: https://github.com/Pustur/whatsapp-chat-parser/compare/3.0.0...3.0.1
[3.0.0]: https://github.com/Pustur/whatsapp-chat-parser/compare/2.0.8...3.0.0
[2.0.8]: https://github.com/Pustur/whatsapp-chat-parser/compare/2.0.7...2.0.8
[2.0.7]: https://github.com/Pustur/whatsapp-chat-parser/compare/2.0.6...2.0.7
[2.0.6]: https://github.com/Pustur/whatsapp-chat-parser/compare/2.0.5...2.0.6
[2.0.5]: https://github.com/Pustur/whatsapp-chat-parser/compare/2.0.4...2.0.5
[2.0.4]: https://github.com/Pustur/whatsapp-chat-parser/compare/2.0.3...2.0.4
[2.0.3]: https://github.com/Pustur/whatsapp-chat-parser/compare/2.0.2...2.0.3
[2.0.2]: https://github.com/Pustur/whatsapp-chat-parser/compare/2.0.1...2.0.2
[2.0.1]: https://github.com/Pustur/whatsapp-chat-parser/compare/2.0.0...2.0.1
[2.0.0]: https://github.com/Pustur/whatsapp-chat-parser/compare/1.2.4...2.0.0
[1.2.4]: https://github.com/Pustur/whatsapp-chat-parser/compare/1.2.3...1.2.4
[1.2.3]: https://github.com/Pustur/whatsapp-chat-parser/compare/1.2.2...1.2.3
[1.2.2]: https://github.com/Pustur/whatsapp-chat-parser/compare/1.2.1...1.2.2
[1.2.1]: https://github.com/Pustur/whatsapp-chat-parser/compare/1.2.0...1.2.1
[1.2.0]: https://github.com/Pustur/whatsapp-chat-parser/compare/1.1.0...1.2.0
[1.1.0]: https://github.com/Pustur/whatsapp-chat-parser/compare/1.0.1...1.1.0
[1.0.1]: https://github.com/Pustur/whatsapp-chat-parser/compare/1.0.0...1.0.1
[1.0.0]: https://github.com/Pustur/whatsapp-chat-parser/releases/tag/1.0.0

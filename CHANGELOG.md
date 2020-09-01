# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.1] - 2020-09-01

### Added

- Codecov badge in readme (collect coverage info in Circleci)

### Changed

- Upgraded package description
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

- Typescript types definition file

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

- Circleci for continuous integration
- Install instructions in readme

### Fixed

- Removed jest config from npm package

## [1.0.0] - 2018-08-09

- Initial release

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

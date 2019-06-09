# Changelog

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

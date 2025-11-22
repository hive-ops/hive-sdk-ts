# @hiveops/node

## 1.13.2

### Patch Changes

- feat: integrate ColumnMetadata into BaseRepository and add getBaseColumns method
- Updated dependencies
  - @hiveops/core@1.20.7

## 1.13.1

### Patch Changes

- feat: add IndexSortingOrder enum and IndexedColumn message to models
- Updated dependencies
  - @hiveops/core@1.20.2

## 1.13.0

### Minor Changes

- refactor: simplify token management by removing claims support

### Patch Changes

- Updated dependencies
  - @hiveops/core@1.20.0

## 1.12.1

### Patch Changes

- feat: add support for retrieving Firebase tokens without claims and update related tests
- Updated dependencies
  - @hiveops/core@1.19.1

## 1.12.0

### Minor Changes

- feat: implement support for token management with and without claims in clients and update related initialization methods

### Patch Changes

- Updated dependencies
  - @hiveops/core@1.19.0

## 1.11.1

### Patch Changes

- refactor: remove localhost URL handling from buildURL function and update related tests
- Updated dependencies
  - @hiveops/core@1.17.7

## 1.11.0

### Minor Changes

- feat: implement initializeClient function and update client initialization in tests

### Patch Changes

- Updated dependencies
  - @hiveops/core@1.16.0

## 1.10.0

### Minor Changes

- Update Vespa Protobuf Definitions and Dependencies

### Patch Changes

- Updated dependencies
  - @hiveops/core@1.14.0

## 1.9.0

### Minor Changes

- Upgrade Connect and Buf dependencies, align client options

### Patch Changes

- Updated dependencies
  - @hiveops/core@1.11.0

## 1.8.1

### Patch Changes

- Add export for initialize function in node and web packages

## 1.8.0

### Minor Changes

- Refactor exports and deprecate vespaInit utility

## 1.7.1

### Patch Changes

- Improve performance of data processing module
- Updated dependencies
  - @hiveops/core@1.9.2

## 1.7.0

### Minor Changes

- feat: update clientType in clientOptions to use core.JavaScriptClientType.NODE for improved type consistency

## 1.6.0

### Minor Changes

- Add fetch-token command and project initialization flow

## 1.5.0

### Minor Changes

- feat: update vespaInit function to support optional parameters for stackHRN, accessToken, and userType

### Patch Changes

- Updated dependencies
  - @hiveops/core@1.7.0

## 1.4.0

### Minor Changes

- feat: refactor client creation methods and improve token management; remove deprecated client options

### Patch Changes

- Updated dependencies
  - @hiveops/core@1.6.0

## 1.3.1

### Patch Changes

- feat: update clientType in clientOptions to use JavaScriptClientType enum

## 1.3.0

### Minor Changes

- Refactor SDK clients to enhance token management and interceptor usage

### Patch Changes

- Updated dependencies
  - @hiveops/core@1.5.0

## 1.2.0

### Minor Changes

- feat: add DroneClient and createSingletonDroneClient for improved client management

### Patch Changes

- Updated dependencies
  - @hiveops/core@1.3.0

## 1.1.0

### Minor Changes

- feat: export fetchFreshHiveTokenFn and createTransportFn for public access

## 1.0.0

### Major Changes

- Stable release v1.0.0

### Patch Changes

- Updated dependencies
  - @hiveops/core@1.0.0

## 0.0.37

### Patch Changes

- chore: update @hiveops/core and @hiveops/node dependencies to latest versions

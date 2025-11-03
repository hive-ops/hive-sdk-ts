# @hiveops/core

## 1.20.0

### Minor Changes

- refactor: simplify token management by removing claims support

## 1.19.1

### Patch Changes

- feat: add support for retrieving Firebase tokens without claims and update related tests

## 1.19.0

### Minor Changes

- feat: implement support for token management with and without claims in clients and update related initialization methods

## 1.18.0

### Minor Changes

- feat: Refactor Vespa requests and responses

## 1.17.8

### Patch Changes

- fix: update getProtocol and buildURL functions to correctly handle HTTP and port assignment for development environment

## 1.17.7

### Patch Changes

- refactor: remove localhost URL handling from buildURL function and update related tests

## 1.17.6

### Patch Changes

- feat: update buildURL function to use basePort for localhost in development environment and enhance test cases for fqdn creation

## 1.17.5

### Patch Changes

- feat: update package-lock.json and package.json to upgrade @hiveops/core to version 1.17.4

## 1.17.4

### Patch Changes

- feat: update models_pb.ts to rename schema field to schemaLogIndex and adjust field indices for consistency

## 1.17.3

### Patch Changes

- feat: update requests_and_responses_pb.ts to change schema field to currentSchemaLogIndex and adjust types for migration requests

## 1.17.2

### Patch Changes

- chore: update @hiveops/core and related dependencies

## 1.17.1

### Patch Changes

- feat: update models_pb.ts to rename field ref to columnNames and adjust unique field type

## 1.17.0

### Minor Changes

- feat: Ensured consistency in response structures across APIs by integrating hive.v1.ResponseMetadata.

## 1.16.1

### Patch Changes

- feat: update models_pb.ts to modify field names and remove deprecated properties in IndexMetadata and RenameColumn types

## 1.16.0

### Minor Changes

- feat: implement initializeClient function and update client initialization in tests

## 1.15.0

### Minor Changes

- refactor: move getTokenInterceptor to utils and update imports in clients

## 1.14.0

### Minor Changes

- Update Vespa Protobuf Definitions and Dependencies

## 1.13.1

### Patch Changes

- Refactor Beekeeper service integration

## 1.13.0

### Minor Changes

- Defined schemas for HiveResourceType and HiveResourceTypeCount for better resource management.

## 1.12.2

### Patch Changes

- fix: Update Country type fields for clarity and consistency in models_pb.ts

## 1.12.1

### Patch Changes

- feat: Refactor Firebase token retrieval functions for improved clarity and structure

## 1.12.0

### Minor Changes

- feat: Add ListPendingMemberInvitations RPC to DroneIAMOrganizationMemberService

## 1.11.0

### Minor Changes

- Upgrade Connect and Buf dependencies, align client options

## 1.10.0

### Minor Changes

- Add get-by-name methods for organizations and projects

## 1.9.2

### Patch Changes

- Improve performance of data processing module

## 1.9.1

### Patch Changes

- feat: enhance FQDN instantiation in createTransport and createSingletonVespaClient to include environment for improved context handling

## 1.9.0

### Minor Changes

- feat: add Environment and BasePort enums, enhance FQDN class, and update utility functions for improved environment handling

## 1.8.0

### Minor Changes

- feat: remove unused dependencies and related utility functions for cleaner code

## 1.7.3

### Patch Changes

- feat: update getDomain function to fallback to DOMAIN constant for improved reliability

## 1.7.2

### Patch Changes

- feat: replace DOMAIN constant with dynamic getDomain function for improved flexibility

## 1.7.1

### Patch Changes

- no-op

## 1.7.0

### Minor Changes

- feat: update vespaInit function to support optional parameters for stackHRN, accessToken, and userType

## 1.6.0

### Minor Changes

- feat: refactor client creation methods and improve token management; remove deprecated client options

## 1.5.2

### Patch Changes

- feat: integrate JavaScriptClientType enum into client options and utility functions

## 1.5.1

### Patch Changes

- actor: reorganize imports and enhance token management in SDK clients

## 1.5.0

### Minor Changes

- Refactor SDK clients to enhance token management and interceptor usage

## 1.4.0

### Minor Changes

- feat: add ListVespaDatabaseStacksByProjectRequest and ListVespaDatabaseStacksByProjectResponse classes with service method

## 1.3.0

### Minor Changes

- feat: add DroneClient and createSingletonDroneClient for improved client management

## 1.2.0

### Minor Changes

- feat: add Role and RoleBinding classes with associated enums for permissions management

## 1.1.0

### Minor Changes

- feat: add pagination support and new service methods for organizations and projects

## 1.0.0

### Major Changes

- Stable release v1.0.0

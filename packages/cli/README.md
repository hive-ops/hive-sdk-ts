# @hiveops/cli

A command-line interface for managing HiveOps projects projects, offering seamless integration with the HiveOps platform.

## Features

- 🔐 Secure authentication with HiveOps via browser-based flow
- 🚀 Project initialization and setup
- 📝 Model generation and schema management
- 🔄 Migration planning and application
- 🛠 Code generation for multiple programming languages

## Installation

```bash
npm install --save-dev @hiveops/cli
```

Or install globally:

```bash
npm install -g @hiveops/cli
```

## Usage

### Project Initialization

Initialize a new Vespa project with interactive setup:

```bash
hive vespa init
```

or

```bash
npx @hiveops/cli@latest vespa init
```

This command will:

1. Guide you through authentication
2. Help select your organization
3. Choose a secure app
4. Select a project and database stack
5. Set up project configuration
6. Create bootstrap models (optional)
7. Initialize package.json with required scripts
8. Install necessary dependencies

### Project Commands

Once your project is initialized, you can use the following commands:

```bash
# Generate TypeScript code from your HSL models
npm run vespa:generate

# Apply schema migrations
npm run vespa:apply

# Generate code and apply migrations in one step
npm run vespa:generate-and-apply
```

### Environment Configuration

The CLI manages environment configuration through a `.env` file:

- `HIVE_STACK_HRN`: Your HiveOps stack HRN
- `HIVE_ACCESS_TOKEN`: Your authentication token

These values are automatically configured during project initialization.

### Command Reference

```bash
hive vespa [command] [options]

Commands:
  init-v2               Initialize a project using browser-based authentication
  plan                  Plan vespa migration
  apply                 Apply vespa migration
  generate-code        Generate code from HSL files
  generate-and-apply   Generate vespa code and apply migration
  fetch-token          Fetch Vespa token

Options:
  -d, --project-directory <projectDirectory>  Project directory
  -p, --programming-language <language>       Programming language (required for code generation)
  -h, --help                                 Show help information
```

## Development

To build and run the CLI locally:

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Link for local development
npm link

# Run CLI
hive vespa --help
```

## Supported Programming Languages

- TypeScript/JavaScript

## License

Apache-2.0

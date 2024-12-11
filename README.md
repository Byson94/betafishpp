# Betafish++

Betafish++ is a modernized version of the original Betafish chess engine, a simple but fast chess engine designed for playing chess. This fork brings several improvements and new features while maintaining compatibility with the MIT-licensed original code.

## Modifications

Betafish++ is based on the original [Betafish repository](https://github.com/Strryke/betafish). Key modifications in Betafish++ include:

- **JavaScript Improvements**: Replaced `var` with `let` and `const` to follow modern JavaScript standards, ensuring better scoping and fewer bugs.
- **`fromtoToSAN` Feature**: Added an experimental feature to enhance move representation, simplifying move generation and making it easier to interact with the engine.
- **Code Refactoring**: General codebase improvements for readability and maintainability.
- **Performance Enhancements**: Optimized core functions related to move generation and evaluation, improving efficiency in both the Node.js and web versions.

## Features

- **Two main codebases**: 
  - `betafish++_node.js` (Node.js compatible)
  - `betafish++.js` (Web-compatible)
  
- **Experimental Features**: 
  - `fromToSAN` for simplified move notation.

- **Optimized for modern JavaScript**:
  - Uses `let` and `const` for variable declaration.
  - Updated to ES6+ standards.

## Installation

### Node.js Version
1. Clone the repository:
   ```bash
   git clone https://github.com/Byson94/betafishpp.git
   cd betafishpp
   ```

2. Install dependencies (if needed):
   ```bash
   npm install
   ```

3. Use the Node.js version (`betafish++ node.js`):
   ```js
   const Betafish = require('./src/betafish++.js');
   ```

### Web Version
1. Download the `betafish++_web.js` file and include it in your HTML:
   ```html
   <script src="path/to/betafish++_web.js"></script>
   ```

2. Initialize and use the engine in your web application.

## Usage

### Basic Usage
```javascript
// Node.js
const Betafish = require('./src/betafish++.js');

let bestMove = Betafish.makeAIMove()
```

## License

Betafish++ is licensed under the MIT License, which is the same as the original Betafish project. See the LICENSE file for details.

The original Betafish project is available at [https://github.com/Strryke/betafish](https://github.com/Strryke/betafish).

### Acknowledgements

- The Betafish++ project builds upon the original Betafish project by [Strryke](https://github.com/Strryke).
- Special thanks to contributors who helped with the original project and all those who support Betafish++.

## Contributing

Contributions to Betafish++ are welcome! Feel free to fork this repository and submit issues or pull requests.
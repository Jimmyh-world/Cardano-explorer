# Cardano Block Explorer

A lightweight, high-performance block explorer for the Cardano blockchain built with vanilla JavaScript and the Blockfrost API. This application provides real-time blockchain data visualization with robust security features and a clean, responsive interface.

## 🚀 Features

- **Real-time Block Information**

  - Latest block data auto-refresh (20-second intervals)
  - Detailed block information display
  - Transaction list viewing
  - Block navigation
  - Advanced transaction details
  - Address tracking

- **Performance Optimized**

  - Efficient DOM updates
  - Debounced event handlers
  - Optimized rendering cycles
  - BigInt support for precise calculations
  - Smart date formatting and validation

- **Security First**

  - Rate limiting protection
  - Secure headers (Helmet)
  - CORS protection
  - API key validation
  - Input validation
  - Error sanitization
  - Type checking and validation

- **Clean UI/UX**
  - Responsive design
  - Enhanced loading states with spinners
  - Comprehensive error handling
  - Clear navigation
  - Smooth transitions
  - Auto-hiding notifications
  - Warning/Error differentiation

## 🛠️ Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Blockfrost API key ([Get one here](https://blockfrost.io))

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/cardano-block-explorer.git
   cd cardano-block-explorer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file in the root directory:

   ```env
   BLOCKFROST_API_KEY=your_api_key_here
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3001`

## 🏗️ Project Structure

```
cardano-block-explorer/
├── server/
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── asyncHandler.js
│   ├── services/
│   │   └── blockfrost.js
│   ├── utils/
│   │   └── APIError.js
│   └── server.js
├── js/
│   ├── api.js
│   ├── ui.js
│   ├── utils.js
│   ├── main.js
│   └── renderers/
│       ├── search.js
│       ├── details.js
│       └── address.js
├── css/
│   └── styles.css
├── docs/
│   ├── ARCHITECTURE.md
│   ├── API.md
│   └── SECURITY.md
├── index.html
├── package.json
└── README.md
```

## 🔒 Security Features

- Rate limiting (100 requests per 15 minutes)
- HTTP security headers via Helmet
- CORS protection
- API key validation
- Error handling middleware
- Input validation
- Production error sanitization
- Type checking and validation
- Secure number handling with BigInt

## 📚 Documentation

- [Architecture Overview](docs/ARCHITECTURE.md)
- [API Documentation](docs/API.md)
- [Security Guidelines](docs/SECURITY.md)

## 🧪 Testing

Run API endpoint tests:

```bash
# Get latest block
curl http://localhost:3001/api/block/latest | json_pp

# Get specific block
curl http://localhost:3001/api/block/{block_hash} | json_pp

# Get block transactions
curl http://localhost:3001/api/block/{block_hash}/transactions | json_pp

# Get address details
curl http://localhost:3001/api/address/{address} | json_pp
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Follow the code style guidelines:
   - Use meaningful variable and function names
   - Add JSDoc comments for all functions
   - Follow type checking best practices
   - Update documentation as needed
   - Test your changes thoroughly
4. Commit your changes:
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. Push to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
6. Open a Pull Request

## 🔄 Version History

- **1.1.0** (Current)
  - Enhanced error handling and validation
  - Added BigInt support for precise calculations
  - Improved UI components with transitions
  - Added address tracking functionality
  - Enhanced documentation
  - Added type checking and validation
- **1.0.0**
  - Initial release
  - Core block explorer functionality
  - Security features implementation
  - Basic documentation

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Blockfrost API](https://blockfrost.io) for providing Cardano blockchain data access
- [Express.js](https://expressjs.com) for the backend framework
- [Helmet](https://helmetjs.github.io) for security headers

## 📧 Contact

James Barlay - jamesqbarclay@gmail.com

Project Link: [https://github.com/yourusername/cardano-block-explorer](https://github.com/yourusername/cardano-block-explorer)

## 🗺️ Roadmap

- [x] Advanced transaction details
- [x] Address tracking functionality
- [ ] Asset information display
- [ ] Stake pool data integration
- [ ] Search functionality enhancement
- [ ] WebSocket implementation for real-time updates
- [ ] Caching layer implementation
- [ ] User authentication system
- [ ] TypeScript migration
- [ ] Comprehensive test suite

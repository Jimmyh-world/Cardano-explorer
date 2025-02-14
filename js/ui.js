import { formatDate, formatAda, getElement } from './utils.js';

// Constants for common values and elements
const ELEMENTS = {
  LATEST_BLOCK: 'latest-block-info',
  BLOCK_LIST: 'block-list',
  CONTENT: 'block-content',
};

/**
 * Creates a card template with provided content
 * @param {string} content - HTML content for the card
 * @returns {string} Complete card HTML
 */
function createCardTemplate(content) {
  return `<div class="card-content">${content}</div>`;
}

/**
 * Displays the latest block information
 * @param {Object} response - Response containing block data
 */
function displayLatestBlock(response) {
  try {
    const block = response.data;
    const content = `
      <div class="latest-block-info">
        <div class="info-row">
          <strong>Block Height</strong>
          <span class="value">${block.height.toLocaleString()}</span>
        </div>
        <div class="info-row">
          <strong>Block Hash</strong>
          <span class="hash">${block.hash}</span>
        </div>
        <div class="info-row">
          <strong>Time</strong>
          <span class="value">${formatDate(block.time)}</span>
        </div>
        <div class="info-row">
          <strong>Transactions</strong>
          <span class="value">${block.tx_count}</span>
        </div>
        <div class="info-row">
          <strong>Size</strong>
          <span class="value">${block.size.toLocaleString()} bytes</span>
        </div>
        <div class="info-row">
          <strong>Epoch</strong>
          <span class="value">${block.epoch}</span>
        </div>
        <div class="info-row">
          <strong>Fees</strong>
          <span class="value">${formatAda(block.fees)} ₳</span>
        </div>
      </div>
    `;

    getElement(ELEMENTS.LATEST_BLOCK).innerHTML = content;
  } catch (error) {
    console.error('Error displaying latest block:', error);
    displayError('Failed to display latest block', ELEMENTS.LATEST_BLOCK);
  }
}

/**
 * Displays list of blocks
 * @param {Object} response - Response containing blocks data
 */
function displayBlockList(response) {
  try {
    const blockList = getElement(ELEMENTS.BLOCK_LIST);

    if (!response.data || !response.data.blocks) {
      blockList.innerHTML = '<p>No blocks available.</p>';
      return;
    }

    const { blocks } = response.data;

    const blockListItems = blocks
      .map(
        (block) => `
        <div class="block-list-item">
          <div class="block-info">
            <div class="block-height">#${block.height.toLocaleString()}</div>
            <div class="block-hash">${block.hash}</div>
          </div>
          <button class="view-block-btn" data-block-hash="${block.hash}">
            <img src="images/Explore.svg" alt="View Block Details">
          </button>
        </div>
      `
      )
      .join('');

    blockList.innerHTML = blockListItems;

    // Add event listeners for block list items
    document.querySelectorAll('.view-block-btn').forEach((button) => {
      button.addEventListener('click', () => {
        const blockHash = button.dataset.blockHash;
        window.loadBlockDetails(blockHash);
      });
    });
  } catch (error) {
    console.error('Error displaying block list:', error);
    displayError('Failed to display block list', ELEMENTS.BLOCK_LIST);
  }
}

/**
 * Displays detailed block information
 * @param {Object} response - Response containing block data
 */
function displayBlock(response) {
  try {
    const block = response.data;
    const content = `
      <div class="block-details">
        <div class="header-section">
          <h2>Block Details</h2>
          <button id="back-to-list" class="secondary-btn">Back to List</button>
        </div>
        <div class="info-row">
          <strong>Block Height</strong>
          <span class="value">${block.height.toLocaleString()}</span>
        </div>
        <div class="info-row">
          <strong>Block Hash</strong>
          <span class="hash">${block.hash}</span>
        </div>
        <div class="info-row">
          <strong>Slot</strong>
          <span class="value">${block.slot.toLocaleString()}</span>
        </div>
        <div class="info-row">
          <strong>Time</strong>
          <span class="value">${formatDate(block.time)}</span>
        </div>
        <div class="info-row">
          <strong>Transactions</strong>
          <span class="value">${block.tx_count}</span>
        </div>
        <div class="info-row">
          <strong>Size</strong>
          <span class="value">${block.size.toLocaleString()} bytes</span>
        </div>
        <div class="info-row">
          <strong>Epoch</strong>
          <span class="value">${block.epoch}</span>
        </div>
        <div class="info-row">
          <strong>Fees</strong>
          <span class="value">${formatAda(block.fees)} ₳</span>
        </div>
        ${
          block.tx_count > 0
            ? `<button id="view-transactions" class="primary-btn">View Transactions</button>`
            : ''
        }
      </div>
    `;

    getElement(ELEMENTS.CONTENT).innerHTML = createCardTemplate(content);

    // Add event listeners
    const backButton = document.getElementById('back-to-list');
    if (backButton) {
      backButton.addEventListener('click', () => {
        window.loadBlockList();
      });
    }

    const viewTxButton = document.getElementById('view-transactions');
    if (viewTxButton) {
      viewTxButton.addEventListener('click', () => {
        window.loadBlockTransactions(block.hash);
      });
    }
  } catch (error) {
    console.error('Error displaying block:', error);
    displayError('Failed to display block details', ELEMENTS.CONTENT);
  }
}

/**
 * Displays transaction information
 * @param {Object} response - Response containing transaction data
 */
function displayTransactions(response) {
  try {
    const { transactions } = response.data;

    if (!transactions || transactions.length === 0) {
      getElement(ELEMENTS.CONTENT).innerHTML = createCardTemplate(
        '<p>No transactions found for this block.</p>'
      );
      return;
    }

    const transactionTemplate = (tx) => `
      <div class="transaction-item" data-tx-hash="${tx.hash}">
        <div class="tx-header">
          <span class="tx-hash">${tx.hash}</span>
          <span class="tx-time">${formatDate(tx.block_time)}</span>
        </div>
        <div class="tx-details">
          <div class="tx-row">
            <span class="tx-label">Inputs/Outputs:</span>
            <span class="tx-value">${tx.inputs || 0} / ${tx.outputs || 0}</span>
          </div>
          <div class="tx-row">
            <span class="tx-label">Amount:</span>
            <span class="tx-value">${formatAda(tx.output_amount || 0)} ₳</span>
          </div>
          <div class="tx-row">
            <span class="tx-label">Fees:</span>
            <span class="tx-value">${formatAda(tx.fees || 0)} ₳</span>
          </div>
        </div>
      </div>
    `;

    const content = `
      <div class="transactions-container">
        <div class="header-section">
          <h3>Block Transactions</h3>
          <button id="back-to-block" class="secondary">Back to Block</button>
        </div>
        <div class="transactions-list">
          ${transactions.map(transactionTemplate).join('')}
        </div>
      </div>
    `;

    getElement(ELEMENTS.CONTENT).innerHTML = content;

    // Add event listener for back button
    const backButton = document.getElementById('back-to-block');
    if (backButton) {
      backButton.addEventListener('click', () => {
        window.clearBlockSelection();
      });
    }

    // Add click listeners to transaction items
    document.querySelectorAll('.transaction-item').forEach((item) => {
      item.addEventListener('click', () => {
        const txHash = item.dataset.txHash;
        console.log('Transaction clicked:', txHash);
      });
    });
  } catch (error) {
    console.error('Error displaying transactions:', error);
    displayError('Failed to display transactions', ELEMENTS.CONTENT);
  }
}

/**
 * Displays error message
 * @param {string} message - Error message to display
 * @param {string} targetId - Target element ID
 */
function displayError(message, targetId = ELEMENTS.CONTENT) {
  try {
    getElement(targetId).innerHTML = `
      <div class="error-message">
        Error: ${message}
      </div>
    `;
  } catch (error) {
    console.error('Error displaying error message:', error);
  }
}

/**
 * Displays loading state
 * @param {string} targetId - Target element ID
 */
function displayLoading(targetId = ELEMENTS.CONTENT) {
  try {
    getElement(targetId).innerHTML = `
      <div class="loading">
        Loading...
      </div>
    `;
  } catch (error) {
    console.error('Error displaying loading state:', error);
  }
}

// Export all functions and constants
export {
  displayLatestBlock,
  displayBlockList,
  displayBlock,
  displayTransactions,
  displayError,
  displayLoading,
  createCardTemplate,
  ELEMENTS,
};

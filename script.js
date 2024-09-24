let accountBalance = 5500;

function updateBalance() {
    document.getElementById('balance').innerText = `${accountBalance} BDT`;
}

function updateTransactionHistory() {
    const historyList = document.getElementById('history-list');
    const noTransactionMessage = document.getElementById('no-transaction-message');

    if (historyList.children.length === 0) {
        noTransactionMessage.classList.remove('hidden'); 
    } else {
        noTransactionMessage.classList.add('hidden'); 
    }
}

document.querySelectorAll('.donate-btn').forEach(button => {
    button.addEventListener('click', function () {
        const donationAmountInput = document.getElementById(`donation-amount-${this.dataset.id}`);
        const donationAmount = parseFloat(donationAmountInput.value);

        if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
            alert('Please enter a valid donation amount.');
            return;
        }

        if (donationAmount > accountBalance) {
            alert('Insufficient balance for this donation.');
            return;
        }

        accountBalance -= donationAmount;
        updateBalance();

        const currentAmountElement = document.getElementById(`current-amount-${this.dataset.id}`);
        const currentAmount = parseFloat(currentAmountElement.innerText.split(' ')[0]); 
        const newAmount = currentAmount + donationAmount;
        currentAmountElement.innerText = `${newAmount} BDT`; 

        const modal = document.getElementById(`modal-${this.dataset.id}`);
        if (modal) {
            modal.showModal(); 
        }

        const historyList = document.getElementById('history-list');
        const transactionTime = new Date().toLocaleString();
        const transactionEntry = document.createElement('div');
        transactionEntry.classList.add('card', 'bg-white', 'rounded-box','p-12', 'md:p-8', 'text-center', 'border', 'shadow-2xl', 'text-black', 'text-xl', 'flex', 'flex-col', 'gap-4');
        transactionEntry.innerHTML = `
            <strong>Successfully Donated BDT ${donationAmount} for ${this.dataset.cause}</strong>
            <div>Date: ${transactionTime}</div>
        `;
        historyList.appendChild(transactionEntry);

        donationAmountInput.value = '';

        updateTransactionHistory();
    });
});

document.getElementById('donation-btn').addEventListener('click', function () {
    document.getElementById('history-section').classList.add('hidden');
    document.getElementById('donation-section').classList.remove('hidden');
    updateButtonStyles(this, document.getElementById('history-btn'));
});

document.getElementById('history-btn').addEventListener('click', function () {
    document.getElementById('donation-section').classList.add('hidden');
    document.getElementById('history-section').classList.remove('hidden');
    updateButtonStyles(this, document.getElementById('donation-btn'));
});

function updateButtonStyles(activeButton, inactiveButton) {
    activeButton.classList.add('btn-white', 'text-white');
    activeButton.classList.remove('bg-white', 'text-black');
    inactiveButton.classList.remove('btn-white', 'text-white');
    inactiveButton.classList.add('bg-white', 'text-black');
}

document.querySelectorAll('.modal-action button').forEach(button => {
    button.addEventListener('click', function () {
        const modal = button.closest('dialog');
        if (modal) {
            modal.close();
        }
    });
});

updateTransactionHistory();
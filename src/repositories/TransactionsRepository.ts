import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDto{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let balance = {} as Balance;
    const incomeList = this.transactions.filter((transaction) => {
      return transaction.type === 'income';
    });
    const outcomeList = this.transactions.filter((transaction) => {
      return transaction.type === 'outcome';
    });


    balance.income = incomeList.reduce((sum, income) => {
      return sum + income.value;
    }, 0);
    balance.outcome = outcomeList.reduce((sum, income) => {
      return sum + income.value;
    }, 0);
    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({title, type, value}: CreateTransactionDto): Transaction {
    var transaction = new Transaction({title, value, type});
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;

import ExpensesList from './ExpensesList/ExpensesList';
import Card from '../UI/Card/Card';
import './Expenses.css';
import ExpensesFilter from './ExpensesFilter/ExpensesFilter';
import React, { useState } from 'react';
import ExpensesChart from './ExpensesChart';


function Expenses({ items }) {
    const [filteredYear, setFilteredYear] = useState('2020');

    const filterChangeHandler = selectedYear => {
        setFilteredYear(selectedYear);
    };

    const filteredExpenses = items.filter((item) => item.date.getFullYear().toString() === filteredYear);

    return (
        <Card className="expenses">
            <ExpensesFilter selected={filteredYear} onChangeFilter={filterChangeHandler} />
            <ExpensesChart expenses={filteredExpenses} />
            <ExpensesList items={filteredExpenses} />
        </Card>
    );
}

export default Expenses;
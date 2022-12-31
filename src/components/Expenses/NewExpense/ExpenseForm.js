import React, { useState } from 'react';
import Button from '../../UI/Button/Button';
import './ExpenseForm.css';

const initialState = {
    enteredTitle: '',
    enteredAmount: '',
    enteredDate: '',
};

const ExpenseForm = ({ onSaveExpenseData, onCancel }) => {
    const [userInput, setUserInput] = useState(initialState);

    // use fn syntax, if using prev state value, else can set new value directly, as setState is async
    const titleChangeHandler = (event) => {
        setUserInput((prevState) => ({
            ...prevState,
            enteredTitle: event.target.value
        }));
    };

    const amountChangeHandler = (event) => {
        setUserInput((prevState) => ({
            ...prevState,
            enteredAmount: event.target.value
        }));
    };

    const dateChangeHandler = (event) => {
        setUserInput((prevState) => {
            return {
                ...prevState,
                enteredDate: event.target.value
            }
        });
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const expenseData = {
            title: userInput.enteredTitle,
            amount: +userInput.enteredAmount,
            date: new Date(userInput.enteredDate)
        };

        onSaveExpenseData(expenseData);
        setUserInput(initialState);
    };

    return (
        <form onSubmit={submitHandler}>
            <div className='new-expense__controls'>
                <div className='new-expense__control'>
                    <label>Title</label>
                    <input type='text' value={userInput.enteredTitle} onChange={titleChangeHandler} />
                </div>
                <div className='new-expense__control'>
                    <label>Amount</label>
                    <input
                        type='number'
                        min='0.01'
                        step='0.01'
                        value={userInput.enteredAmount}
                        onChange={amountChangeHandler}
                    />
                </div>
                <div className='new-expense__control'>
                    <label>Date</label>
                    <input
                        type='date'
                        min='2019-01-01'
                        max='2023-12-31'
                        value={userInput.enteredDate}
                        onChange={dateChangeHandler}
                    />
                </div>
            </div>
            <div className='new-expense__actions'>
                <Button onClick={onCancel}>Cancel</Button>
                <Button type='submit'>Add Expense</Button>
            </div>
        </form>
    );
};

export default ExpenseForm;
import React, { useState } from 'react';
import { isValidDate } from '../../../utilities/utils';
import Button from '../../UI/Button/Button';
import { Modal } from '../../UI/Modal/Modal';

import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const didPassValidation = ({ title, amount, date }, setError) => {
    if (title.trim().length === 0 || amount === 0 || !isValidDate(date)) {
        setError({
            title: 'Invalid input',
            message: 'Please enter a valid title and amount and date (non-empty values).',
        });
        return false;
    }
    return true;
}

const NewExpense = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState();

    const saveExpenseDataHandler = (enteredExpenseData) => {
        // Do validation
        const validationResult = didPassValidation(enteredExpenseData, setError);
        if (!validationResult) {
            return;
        }

        const expenseData = {
            ...enteredExpenseData,
            id: Math.random().toString()
        };
        props.onAddExpense(expenseData);
        stopEditingHandler();
    };

    const startEditingHandler = () => {
        setIsEditing(true);
    };

    const stopEditingHandler = () => {
        setIsEditing(false);
    };

    return (
        <>
            <div className='new-expense'>
                {!isEditing && (
                    <Button onClick={startEditingHandler}>Add New Expense</Button>
                )}
                {isEditing && (
                    <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} onCancel={stopEditingHandler} />
                )}
            </div>
            {error && <Modal title={error.title} message={error.message} onConfirm={() => setError()} />}
        </>
    );
};

export default NewExpense;
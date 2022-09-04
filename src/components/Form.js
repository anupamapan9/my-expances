import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction } from "../features/transactions/transactionSlice";

export default function Form() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [amount, setAmount] = useState('')

    const { isLoading, isError, error } = useSelector(state => state.transactions)
    const handelCreate = (e) => {
        e.preventDefault();
        dispatch(createTransaction({
            name,
            type,
            amount: Number(amount)
        }))

    }
    return (
        <div className="form">
            <h3>Add new transaction</h3>
            <form onSubmit={handelCreate}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name={name}
                        placeholder="My Salary"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group radio">
                    <label >Type</label>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="income"
                            name='type'
                            checked={type === 'income'}
                            onChange={e => setType('income')}
                        />
                        <label>Income</label>
                    </div>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="expense"
                            name='type'
                            placeholder="Expense"
                            checked={type === 'expense'}
                            onChange={e => setType('expense')}
                        />
                        <label>Expense</label>
                    </div>
                </div>

                <div className="form-group">
                    <label >Amount</label>
                    <input
                        type="number"
                        placeholder="300"
                        name={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <button disabled={isLoading} className="btn" type="submit">Add Transaction</button>
                {!isLoading && !isError && error &&
                    <p className="error">
                        There is an error occurs
                    </p>
                }

            </form>
            <button className="btn cancel_edit" >Cancel Edit</button>
        </div>
    );
}

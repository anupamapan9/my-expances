import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTransaction, createTransaction } from "../features/transactions/transactionSlice";

export default function Form() {
    // get state -------------------------------
    const { isLoading, isError, error } = useSelector(state => state.transactions)
    const editing = useSelector(state => state.transactions.editing)
    // get form information ---------------
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [amount, setAmount] = useState('')
    const [editMood, setEditMood] = useState(false)
    // resetForm -----------------------------
    const resetForm = () => {
        setName('')
        setAmount('')
        setType('')
    }
    const cancelEditMood = () => {
        setEditMood(false)
        resetForm()
    }
    // lesten for edit mood -----------------------
    useEffect(() => {
        const { id, name, amount, type } = editing
        if (id) {
            setEditMood(true)
            setName(name)
            setAmount(amount)
            setType(type)
        } else {
            resetForm()
        }
    }, [editing])
    // create a new expense or income --------------------------
    const handelCreate = (e) => {
        e.preventDefault();
        dispatch(createTransaction({
            name,
            type,
            amount: Number(amount)
        }))
        resetForm()
    }

    const handelUpdate = (e) => {
        e.preventDefault()
        dispatch(changeTransaction({
            id: editing?.id,
            data: {
                name: name,
                amount: amount,
                type: type
            }

        }))
        resetForm()
        setEditMood(false)
    }
    return (
        <div className="form">
            <h3>Add new transaction</h3>
            <form onSubmit={editMood ? handelUpdate : handelCreate}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
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
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <button disabled={isLoading} className="btn" type="submit">
                    {editMood ? "Update Transaction" : "Add Transaction"}
                </button>
                {!isLoading && !isError && error &&
                    <p className="error">
                        There is an error occurs
                    </p>
                }

            </form>
            {editMood && < button className="btn cancel_edit" onClick={cancelEditMood} >Cancel Edit</button>}
        </div >
    );
}

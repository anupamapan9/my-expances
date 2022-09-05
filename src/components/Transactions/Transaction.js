import { useDispatch } from "react-redux";
import deleteImage from "../../assets/images/delete.svg";
import editImage from "../../assets/images/edit.svg";
import { editActive, removeTransaction } from "../../features/transactions/transactionSlice";

export default function Transaction({ transaction }) {

    const { id, name, amount, type } = transaction
    const disPatch = useDispatch();
    const handelEdit = () => {
        disPatch(editActive(transaction))
    }
    const handelDelete = () => {
        disPatch(removeTransaction(id))
    }
    return (
        <li className={`transaction ${type}`}>
            <p>{name}</p>
            <div className="right">
                <p>৳ {amount}</p>
                <button className="link" onClick={handelEdit}>
                    <img alt="Edit" className="icon" src={editImage} />
                </button>
                <button className="link" onClick={handelDelete}>
                    <img alt="Delete" className="icon" src={deleteImage} />
                </button>
            </div>
        </li>
    );
}

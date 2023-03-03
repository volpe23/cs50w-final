import '../../styles/utils/Button.scss';

export default function Button({ children, onClick, type }) {

    return (
        <button className={`btn`}
            onClick={onClick}>
        {children}
        </button>
    )
}
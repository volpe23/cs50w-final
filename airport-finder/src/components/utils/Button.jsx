import '../../styles/utils/Button.scss';

export default function Button({ children, onClick, type, ...args }) {

    return (
        <button className={`btn`} {...args}
            onClick={onClick}>
        {children}
        </button>
    )
}
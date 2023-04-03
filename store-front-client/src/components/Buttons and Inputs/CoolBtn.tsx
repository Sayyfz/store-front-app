import './cool-btn.scss';

interface CoolBtnProps {
    title: string;
    onClick?: () => void;
    type?: 'submit' | 'button' | 'reset';
    children?: React.ReactNode;
}

const CoolBtn = ({ title, onClick, type, children }: CoolBtnProps) => {
    return (
        <button type={type ?? 'button'} className={'coolBtn'} onClick={onClick}>
            {title}
            {children}
        </button>
    );
};

export default CoolBtn;

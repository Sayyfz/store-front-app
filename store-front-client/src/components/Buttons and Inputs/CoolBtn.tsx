import './cool-btn.scss';

interface CoolBtnProps {
    title: string;
    onClick?: () => void;
    children?: React.ReactNode;
}

const CoolBtn = ({ title, onClick, children }: CoolBtnProps) => {
    return (
        <button className={'coolBtn'} onClick={onClick}>
            {title}
            {children}
        </button>
    );
};

export default CoolBtn;

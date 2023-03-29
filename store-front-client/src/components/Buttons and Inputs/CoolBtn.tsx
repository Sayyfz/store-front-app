import './cool-btn.scss';

interface CoolBtnProps {
    title: string;
    onClick?: () => void;
}

const CoolBtn = ({ title, onClick }: CoolBtnProps) => {
    return (
        <button className={'coolBtn'} onClick={onClick}>
            {title}
        </button>
    );
};

export default CoolBtn;

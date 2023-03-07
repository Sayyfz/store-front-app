import '../styles/cool-btn.scss';

interface CoolBtnProps {
    title: string;
}

const CoolBtn = ({ title }: CoolBtnProps) => {
    return <button className={'coolBtn'}>{title}</button>;
};

export default CoolBtn;

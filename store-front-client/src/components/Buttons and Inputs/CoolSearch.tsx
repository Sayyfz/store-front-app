import './cool-search.scss';

interface CoolSearchProps {
    value: string;
    title: string;
    onKeyPress?: () => void;
    type?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CoolSearch = ({ title, onChange, value, onKeyPress, type }: CoolSearchProps) => {
    return (
        <input
            placeholder={title}
            type={type ?? 'text'}
            name='text'
            value={value}
            className='coolSearch'
            onChange={onChange}
            onKeyDown={onKeyPress}
        ></input>
    );
};

export default CoolSearch;

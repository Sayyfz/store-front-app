import './cool-search.scss';

interface CoolSearchProps {
    autoComplete?: string;
    name?: string;
    value: string;
    title: string;
    onKeyPress?: () => void;
    type?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CoolSearch = ({
    autoComplete,
    name,
    title,
    onChange,
    value,
    onKeyPress,
    type,
}: CoolSearchProps) => {
    return (
        <input
            autoComplete={autoComplete ?? ''}
            placeholder={title}
            type={type ?? 'text'}
            name={name ?? 'text'}
            value={value}
            className='coolSearch'
            onChange={onChange}
            onKeyDown={onKeyPress}
        ></input>
    );
};

export default CoolSearch;

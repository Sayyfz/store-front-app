import '../styles/cool-search.scss';

interface CoolSearchProps {
    value: string;
    title: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CoolSearch = ({ title, onChange, value }: CoolSearchProps) => {
    return (
        <input
            placeholder={title}
            type='text'
            name='text'
            value={value}
            className='coolSearch'
            onChange={onChange}
        ></input>
    );
};

export default CoolSearch;

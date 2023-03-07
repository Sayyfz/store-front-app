import '../styles/cool-search.scss';

interface CoolSearchProps {
    title: string;
}

const CoolSearch = ({ title }: CoolSearchProps) => {
    return <input placeholder={title} type='text' name='text' className='coolSearch'></input>;
};

export default CoolSearch;

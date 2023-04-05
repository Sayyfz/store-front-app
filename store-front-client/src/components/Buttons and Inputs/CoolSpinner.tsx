import './cool-spinner.scss';

const CoolSpinner = () => {
    return (
        <div
            className='d-flex align-items-center justify-content-center'
            style={{ height: '100vh' }}
        >
            <div className='loader '>
                <span className='hour'></span>
                <span className='min'></span>
                <span className='circle'></span>
            </div>
        </div>
    );
};

export default CoolSpinner;

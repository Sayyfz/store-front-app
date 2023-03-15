import NavbarComp from './components/Navbar';

type Props = {
    children: React.ReactNode;
};

const AppContainer = ({ children }: Props) => {
    return (
        <>
            <NavbarComp />
            {children}
        </>
    );
};

export default AppContainer;

import NavbarComp from './components/Header/Navbar';

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

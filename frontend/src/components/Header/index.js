import logo from '../../assets/logo.png'; 

const Header = () => {
    return(
        <header className="container-fluid d-flex justify-content-end">
            <div className="d-flex align-items-center">
                <div className="text-right-mr-10">
                    <span className="d-block m-0 p-0 text-white">Estúdio Keuanny</span>
                    <small className="m-0 p-0">Plano Gold</small>
                </div>
                <img src={logo} alt="" />
                <span className="mdi mdi-chevron-down text-white"></span>
            </div>
        </header>
    );
};

export default Header; 

import './styles.css'; 
import Header from './components/Header'; 
import Sidebar from './components/Sidebar'; 


const Routes = () => {
    return (
        <>
            <Header />
            <div 
                className="container-fluid"  
                style={{backgroundColor: '#f89'}}
            >
                <Sidebar />

            </div>
        </>
    );
};

export default Routes; 
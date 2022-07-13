import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

const Layout = (props) => {

    useEffect(() => {

    }, []);

    return(
        <div>
            <Navbar/>
            <ToastContainer autoClose={5000} />
            {props.children}
            <Footer/>
        </div>
    )
}


export default connect(null, {

}) (Layout)
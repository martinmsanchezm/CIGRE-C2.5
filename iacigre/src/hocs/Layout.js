import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { check_authenticated, load_user, refresh } from '../redux/actions/auth';

const Layout = (props) => {

    useEffect(() => {
        props.refresh()
        props.load_user()
        props.check_authenticated()
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
    check_authenticated,
    load_user,
    refresh,
}) (Layout)
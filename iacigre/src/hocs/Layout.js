import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { check_authenticated, load_user, refresh } from '../redux/actions/auth';
import { get_projects } from '../redux/actions/projects';
const Layout = (props, user) => {

    useEffect(() => {
        props.refresh()
        props.load_user()
        props.check_authenticated()
        props.get_projects()
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
    get_projects,
}) (Layout)
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { check_authenticated, load_user, refresh } from '../redux/actions/auth';
import { get_projects } from '../redux/actions/projects';
import { get_profile } from '../redux/actions/profile';

const Layout = (props) => {

    useEffect(() => {
        props.refresh()
        props.check_authenticated()
        props.load_user()
        if (props.isAuthenticated && props.user && props.user.id!==8){
            props.get_profile()
            props.get_projects(props.user.id)
        }else{
            props.get_projects(null)
        }
      }, []);

    return(
        <div>
            <Navbar/>
            {props.children}
            <Footer/>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
})

export default connect(mapStateToProps, {
    check_authenticated,
    load_user,
    refresh,
    get_projects,
    get_profile
}) (Layout)
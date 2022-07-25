import { connect } from 'react-redux';
import { useEffect } from "react";
import '../styles/pageMain.css';
import video from '../assets/mp4/bg.mp4';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OnlyAlert from '../containers/OnlyAlert';
import { check_authenticated, load_user, refresh } from '../redux/actions/auth';

const PageMain = (props) => {

    useEffect(() => {
        props.refresh()
        props.load_user()
        props.check_authenticated()
      }, []);

  return(
      <div className='body-bg'>
        <video className="bg-video" playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop"><source src={video} type="video/mp4" /></video>
        <div className="masthead">
            <div className="masthead-content text-white">
                <div className="container-fluid px-4 px-lg-0">
                    <OnlyAlert />
                    <ToastContainer autoClose={5000} />
                    {props.children}
                </div>
            </div>
        </div>
        <div className="social-icons">
            <div className="d-flex flex-row flex-lg-column justify-content-center align-items-center h-100 mt-3 mt-lg-0">
                <a className="btn btn-dark m-3" href="http://www.cigrecolombia.org/Pages/Home.aspx"><FontAwesomeIcon icon={faGlobe}/></a>
                <a className="btn btn-dark m-3" href="https://twitter.com/cigre_colombia"><FontAwesomeIcon icon={faTwitter} /></a>
                <a className="btn btn-dark m-3" href="https://www.instagram.com/cigre.ngn.co/?hl=es"><FontAwesomeIcon icon={faInstagram}/></a>
            </div>
        </div>
    </div>
  )
}


const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{
    check_authenticated,
    load_user,
    refresh,
}) (PageMain)
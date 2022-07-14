import { connect } from 'react-redux';
import { useEffect } from "react";
import '../styles/login.css';
import video from '../assets/mp4/bg.mp4';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Login = ({
    
}) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return(
      <div className='body-bg'>
        <video className="bg-video" playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop"><source src={video} type="video/mp4" /></video>
        <div className="masthead">
            <div className="masthead-content text-white">
                <div className="container-fluid px-4 px-lg-0">
                    <h1 className="fst-italic lh-1 mb-4">Bienvenidos al Grupo Cigre C2.5</h1>
                    <p className="mb-5">Modelos de inteligencia artificial aplicados a sistemas de eléctricos</p>
                    <p className="">Ingresa para participar</p>
                    <form>
                        <div className="mb-3">
                            <input className="form-control" id="email" type="email" placeholder="Enter email address..." required/>
                        </div>
                        <div className="mb-3">
                            <input className="form-control" id="password" type="password" placeholder="Enter email password..." required/>
                        </div>
                        <div className="">
                            <Link to='/home' className="btn btn-primary p-2 rounded" type="submit">Ingresar</Link>
                        </div>
                    </form>
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
}) (Login)
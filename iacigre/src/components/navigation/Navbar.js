import { connect } from 'react-redux';
import { Link } from "react-router-dom";

function Navbar({
}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container px-5">
            <Link className="navbar-brand" to='/home'>Cigre C2.5</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item"><Link className="nav-link" to='/about'>About</Link></li>
                    <li className="nav-item"><Link className="nav-link" to='/faq'>FAQ</Link></li>                    
                </ul>
            </div>
        </div>
    </nav>
  )
}
const mapStateToProps = state => ({

})
export default connect(mapStateToProps, {

})(Navbar)
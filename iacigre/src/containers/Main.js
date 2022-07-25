import PageMain from '../hocs/PageMain'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Main = ({
    isAuthenticated,
    user
    }) =>{

    return (
      <PageMain>
        <div>
        {/* <!-- Submit button --> */}
        <div className="my-5 text-center text-xl-start">
            <h1 className="display-5 fw-bolder text-white mb-2">Bienvenidos al Cigre Grupo C2.5</h1>
            <p className="lead fw-normal text-white-50 mb-4">
                Modelos de Intelignecia Artificial aplicados a sistemas eléctricos
            </p>
        </div>
        {isAuthenticated && user?
        <>
        <p className="secondary mt-2">
            {user.get_full_name}
        </p>
        <p className="secondary mt-2">
            Ir a &nbsp;
            <Link to="/home">
            Home
            </Link>
        </p>
        </>
        :
        <>
        <p className="secondary mt-2">
          Ir a &nbsp;
          <Link to="/login">
            Login
          </Link>
        </p> 
        <p className="secondary mt-2">
          O &nbsp;
          <Link to="/signup">
            Registrarse
          </Link>
        </p> 
        </>          
        }
        </div>
      </PageMain>
    )
  }


const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
})

export default connect(mapStateToProps,{
    
}) (Main)
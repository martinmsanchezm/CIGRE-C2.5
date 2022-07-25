import PageMain from '../../hocs/PageMain'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { connect } from 'react-redux'
import { activate } from '../../redux/actions/auth'
import { Navigate } from 'react-router'

import {Oval} from 'react-loader-spinner'

const Activate = ({
    activate,
    loading
    }) =>{
    const params = useParams();

    const [activated, setActivated] = useState(false);

    const activate_account = () => {
      const uid = params.uid
      const token = params.token
      activate(uid, token);
      setActivated(true);
    }

    if (activated && !loading)
    return <Navigate to='/' />;

    return (
      <PageMain>
        <div>
        {/* <!-- Submit button --> */}
        {loading?
        <button type="submit" className="btn btn-primary btn-block btn-lg">
            <Oval
            color="#fff"
            width={20}
            height={20}
            />
        </button>
        :
        <>
        <p>Click en activar cuenta</p>
        <button 
            className="btn btn-primary btn-block btn-lg"
            onClick={activate_account}>
            Activate Account
        </button> 
        </>                   
        }
        </div>
      </PageMain>
    )
  }


const mapStateToProps = state => ({
    loading: state.Auth.loading
})

export default connect(mapStateToProps,{
activate
}) (Activate)
import { connect } from 'react-redux';
import Layout from '../../hocs/Layout';
import { useRef} from 'react';
import {edit_profile, 
        reset_edit_status, 
        send_image,
        reset_image_status,
        get_profile
} from '../../redux/actions/profile';
import { Oval } from 'react-loader-spinner';
import { load_user } from '../../redux/actions/auth';

function Profile({
    user,
    edit_profile,
    loading,
    profileStatus,
    load_user,
    reset_edit_status,
    send_image,
    imageStatus,
    reset_image_status,
    get_profile,
    profile,
}) {

    const first_name = useRef(null);
    const last_name = useRef(null);
    const company = useRef(null);
    const profile_img = useRef(null);

    const onSend = (e) =>{
        edit_profile(
            first_name.current.value,
            last_name.current.value,
            company.current.value,
            // 
        )
        send_image(profile_img.current.files[0])
    }

    if (!loading && profileStatus){
        load_user();
        reset_edit_status();
    }

    if (!loading && imageStatus && user && user.id!==parseInt(`${process.env.REACT_APP_INVITADO_ID}`)){
      reset_image_status();
      get_profile();
  }

  return (
    <Layout>
    {user?
    <div className='col d-flex justify-content-center m-5'>
    <div className="card" style={{width: "30rem"}}>
        <div className="card-header ml-5 mr-5">
            <div className="text-center">
                <h1 className='m-2'>Editar Perfil</h1>
                <img className="img-fluid rounded-circle mb-4 px-4" 
                    src={profile.photo? profile.photo:"https://dummyimage.com/150x150/ced4da/6c757d"} 
                    alt="..." 
                    style={{width:'15rem', height:'12rem'}} />
                <h6>Upload a photo...</h6>                
                <div className="ml-2 mr-2 col-lg-12">
                    <input ref={profile_img} type="file" className="form-control"/>
                </div>                   
            </div>
        </div>               
        <div className="card-body m-2">
        <div className='ml-2'>
            <h3>Información Personal</h3>
        </div> 
        <form>
          <div className="form-group">
            <label className="col-lg-12 control-label">First name:</label>
            <div className="col-lg-12">
              <input ref={first_name} className="form-control" type="text" defaultValue={user.first_name}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-12 control-label">Last name:</label>
            <div className="col-lg-12">
              <input ref={last_name} className="form-control" type="text" defaultValue={user.last_name}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-12 control-label">Company:</label>
            <div className="col-lg-12">
              <input ref={company} className="form-control" type="text" defaultValue={profile.user_company?profile.user_company:""}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-12 control-label">Email:</label>
            <div className="col-lg-12">
              <input className="form-control" type="text" defaultValue={user.email} disabled/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-12 control-label"></label>            
            <div>
              {/* <!-- Submit button --> */}
              {loading?
                <button type="submit" className="btn btn-primary btn-block btn-lg m-0">
                    <Oval
                    color="#fff"
                    width={20}
                    height={20}
                    />
                </button>
                :
                <div className="col-md-12">
                  <input type="button" className="btn btn-primary" defaultValue="Save Changes" onClick={onSend}/>
                </div>                    
              }
          </div>
          </div>
        </form>
        </div>
      </div>
      </div>
      :null}
    </Layout>
  )
}
const mapStateToProps = state => ({
    user: state.Auth.user,
    loading: state.Auth.loading,
    profileStatus: state.Profile.profileStatus,
    imageStatus: state.Profile.imageStatus,
    profile: state.Profile.profile,
})
export default connect(mapStateToProps, {
    edit_profile,
    load_user,
    reset_edit_status,
    send_image,
    reset_image_status,
    get_profile
})(Profile)
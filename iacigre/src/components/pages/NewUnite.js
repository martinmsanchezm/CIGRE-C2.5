import { connect } from 'react-redux';
import {Modal} from 'react-bootstrap';
import {
    Set_view_unite_user,
    get_users,
    unite_user,
    reset_unite_status,
    get_unite
} from '../../redux/actions/unite';
import { useRef} from 'react';
import { Oval } from 'react-loader-spinner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus  } from "@fortawesome/free-solid-svg-icons";

function AddSection({
    show,
    loading,
    Set_view_unite_user,
    list_users,
    get_users,
    post_project,
    unite_user,
    reset_unite_status,
    UniteStatus,
    get_unite
}) {

    const name = useRef(null);
    
    const onSubmit = e =>{
        e.preventDefault();
        get_users(name.current.value, post_project.id)
    }  

    if (!loading && UniteStatus){
        reset_unite_status()
        Set_view_unite_user(false)
        get_unite(post_project.id)
    }

    const handleClose = (e) =>{
        Set_view_unite_user(false)
    }

  return (
        <>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Agregar Usuarios
                </Modal.Title>
            </Modal.Header>
                <Modal.Body>
                <form>
                    <div className="d-flex flex-row mb-2">
                            <input 
                                className="form-control" 
                                ref={name}
                                type="text"
                                maxLength={50}
                                placeholder="Nombre"
                            />
                        {/* <!-- Submit button --> */}
                        &nbsp;&nbsp;
                        {loading?
                        <button type="submit" className="btn btn-primary btn-block btn-lg m-0">
                            <Oval
                            color="#fff"
                            width={20}
                            height={20}

                            />
                        </button>
                        :
                        <button onClick={onSubmit} type="submit" className="btn btn-primary btn-block btn-sm">
                            Buscar
                        </button>                    
                        }
                    </div>
                    <hr className="m-4" />
                    {list_users.length?
                    <table className="table table-hover">
                    <tbody>
                        {list_users && 
                        list_users.length &&
                        list_users.map((user)=>(
                            <tr key={user.id}>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>
                                    <button onClick={(e)=>{
                                                    e.preventDefault();
                                                    unite_user(
                                                    user.id, 
                                                    user.get_full_name, 
                                                    post_project.id
                                                    )}} className='btn btn-sm m-0 p-0'>
                                        <FontAwesomeIcon icon={faPlus}/>
                                    </button>
                                </td>
                            </tr>
                        ))}                        
                    </tbody>
                    </table>
                    :
                    <p className="fs-5 m-3 d-flex justify-content-center">Click en buscar para mostrar los usuarios</p>}
                </form>
                </Modal.Body>
      </Modal>
        </>
  )
}
const mapStateToProps = state => ({
    loading: state.Auth.loading,
    show: state.Unite.show,
    list_users: state.Unite.list_users,
    post_project: state.Projects.post_project,
    UniteStatus: state.Unite.UniteStatus
})
export default connect(mapStateToProps, {
    Set_view_unite_user,
    get_users,
    unite_user,
    reset_unite_status,
    get_unite
})(AddSection)
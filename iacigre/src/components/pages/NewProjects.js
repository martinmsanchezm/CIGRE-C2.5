import { connect } from 'react-redux';
import {Modal, Dropdown} from 'react-bootstrap';
import {Set_view_new_project, 
        reset_project_status, 
        add_new_project,
        get_projects
} from '../../redux/actions/projects';
import { useRef, useState} from 'react';
import { Oval } from 'react-loader-spinner';

function NewProjects({
    show,
    Set_view_new_project,
    loading,
    newPrjStatus,
    reset_project_status,
    add_new_project,
    get_projects,
}) {

    const title = useRef(null);
    const desc = useRef(null);
    const [newCategory, setnewCategory] = useState("Eléctricos");
    
    const onSubmit = e =>{
        e.preventDefault();
        add_new_project(
            title.current.value,
            desc.current.value,
            newCategory,
            "",
            0
        )
    }

    const onSelect = e =>{
    e.preventDefault();
    setnewCategory(e.target.name)
    }    

    if (!loading && newPrjStatus){
    reset_project_status()
    Set_view_new_project(false)
    get_projects()
    }

    const handleClose = (e) =>{
        Set_view_new_project(false)
    }

  return (
        <>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Crear un Nuevo Proyecto
                </Modal.Title>
            </Modal.Header>
                <Modal.Body>
                <form onSubmit={e=>onSubmit(e)}>
                    <div className="form-outline mb-4">
                        <input 
                                className="form-control" 
                                ref={title}
                                type="text"
                                maxLength={100}
                                required
                            />
                        <label className="form-label" htmlFor="form3Example3">Título</label>
                    </div>
                    <div className="form-outline mb-4">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {newCategory}
                            </Dropdown.Toggle>
                            <Dropdown.Menu onClick={onSelect}>
                                <Dropdown.Item name="Eléctricos">Eléctricos</Dropdown.Item>
                                <Dropdown.Item name="Energéticos">Energéticos</Dropdown.Item>
                                <Dropdown.Item name="Económicos">Económicos</Dropdown.Item>
                                <Dropdown.Item name="Ambientales">Ambientales</Dropdown.Item>
                                <Dropdown.Item name="Otros">Otros</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <p>Categoria de los datos</p>
                    </div>                    
                    <div className="form-outline mb-4">
                        <textarea 
                                className="form-control" 
                                ref={desc}
                                type="text-area"
                                maxLength={490}
                                required
                            />
                        <label className="form-label" htmlFor="form3Example3">Descripción del proyecto</label>
                    </div>
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
                        <button type="submit" className="btn btn-primary btn-block btn-lg mb-2">
                            Enviar
                        </button>                    
                        }
                    </div>
                </form>
                </Modal.Body>
      </Modal>
        </>
  )
}
const mapStateToProps = state => ({
    loading: state.Auth.loading,
    show: state.Projects.show,
    newPrjStatus: state.Projects.newPrjStatus,
})
export default connect(mapStateToProps, {
    Set_view_new_project,
    reset_project_status,
    add_new_project,
    get_projects,
})(NewProjects)


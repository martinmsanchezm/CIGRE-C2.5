import { connect } from 'react-redux';
import {Modal, Dropdown} from 'react-bootstrap';
import {Set_view_new_project, 
        reset_project_status, 
        add_new_project,
        get_projects,
        send_image
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
    send_image
}) {

    const title = useRef(null);
    const desc = useRef(null);
    const image = useRef(null);
    const github = useRef(null);

    const [newCategory, setnewCategory] = useState("Eléctricos");
    
    const onSubmit = e =>{
        e.preventDefault();
        add_new_project(
            title.current.value,
            desc.current.value,
            newCategory,
            "",
            0,
            github.current.value
        )
        send_image(
            image.current.files[0],
            title.current.value,
            "add"
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
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Crear un Nuevo Proyecto
                </Modal.Title>
            </Modal.Header>
                <Modal.Body>
                <form onSubmit={e=>onSubmit(e)}>
                    <h6>Upload a photo...</h6>                
                    <div className="ml-2 mr-2 col-lg-12 mb-2">
                        <input ref={image} type="file" className="form-control"/>
                    </div>                    
                    <div className="form-outline mb-4">
                        <input 
                                className="form-control" 
                                ref={title}
                                type="text"
                                maxLength={80}
                                required
                            />
                        <label className="form-label" htmlFor="form3Example3">Título</label>
                    </div>
                    <div className="form-outline d-flex flex-row mb-4">
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
                        <p>Categoría de los datos</p>
                    </div>                    
                    <div className="form-outline mb-4">
                        <textarea 
                                className="form-control" 
                                ref={desc}
                                type="text-area"
                                maxLength={180}
                                required
                            />
                        <label className="form-label" htmlFor="form3Example3">Descripción del proyecto</label>
                    </div>
                    <div className="form-outline d-flex flex-row mb-4">
                        <label className="form-label m-1" htmlFor="form3Example3">GitHub</label>
                        <input 
                                className="form-control" 
                                ref={github}
                                type="text"
                                maxLength={145}
                                required
                            />
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
    send_image
})(NewProjects)


import { connect } from 'react-redux';
import {Modal, Dropdown, OverlayTrigger, Popover} from 'react-bootstrap';
import {Set_view_edit_project, 
        get_projects,
        reset_project_status,
        add_edit_project,
        delete_edit_project
} from '../../redux/actions/projects';
import { useRef, useState} from 'react';
import { Oval } from 'react-loader-spinner';


function NewProjects({
    edit_show,
    Set_view_edit_project,
    loading,
    editPrjStatus,
    reset_project_status,
    get_projects,
    edit_project,
    add_edit_project,
    delete_edit_project,
}) {

    const title = useRef(null);
    const desc = useRef(null);

    const [newCategory, setnewCategory] = useState("Eléctricos");
    const [editCategory, seteditCategory] = useState(false);

    const onSubmit = e =>{
        e.preventDefault();
        var category = null
        if (editCategory){
            category = newCategory
        } else {
            category = edit_project.category
        }        
        add_edit_project(
            edit_project.id,
            title.current.value, 
            desc.current.value, 
            category
        )
    }

    const onSelect = e =>{
    e.preventDefault();
    setnewCategory(e.target.name)
    seteditCategory(true)
    }    

    if (!loading && editPrjStatus){
    reset_project_status()
    Set_view_edit_project(false)
    get_projects()
    }

    const handleClose = (e) =>{
        Set_view_edit_project(false)
    }

    const onDelete = (e) =>{
        e.preventDefault();
        delete_edit_project(edit_project.id)
    }

    const onPrevent = (e) =>{
       e.preventDefault();
    }

  return (
        <>
        <Modal
            show={edit_show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Editar Proyecto
                </Modal.Title>
            </Modal.Header>
                <Modal.Body>
                <form>
                    <div className="form-outline mb-4">
                        <input 
                                className="form-control" 
                                name="title"
                                ref={title}
                                defaultValue={edit_project.title}
                                type="text"
                                maxLength={100}
                                required
                            />
                        <label className="form-label" htmlFor="form3Example3">Título</label>
                    </div>
                    <div className="form-outline mb-4">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {editCategory?
                                newCategory:edit_project.category}                             
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
                                name="desc"
                                ref={desc}
                                defaultValue={edit_project.desc}
                                type="text-area"
                                maxLength={490}
                                required
                            />
                        <label className="form-label" htmlFor="form3Example3">Descripción del proyecto</label>
                    </div>
                    <div className="d-flex flex-row-reverse">                        
                        {loading?
                            <button className="btn btn-primary btn-block btn-lg mr-5">
                                <Oval
                                color="#fff"
                                width={20}
                                height={20}
                                />
                            </button>
                            :
                            <button onClick={e=>onSubmit(e)} className="btn btn-primary btn-block btn-lg m-1">
                                Actualizar
                            </button>                    
                        }
                        <div className='m-3'></div>  
                        <OverlayTrigger
                            trigger="click"
                            placement="top"
                            className="m-0 p-0"
                            overlay={
                                <Popover className='m-0'>
                                    <Popover.Body className='m-0'>
                                        <button className='btn btn-danger m-0' onClick={onDelete}>Confirmar</button>
                                    </Popover.Body>
                                </Popover>}>
                            <button onClick={onPrevent} className="btn btn-danger m-2">Eliminar</button>
                            </OverlayTrigger>                                                                 
                    </div>
                </form>
                </Modal.Body>
      </Modal>
        </>
  )
}
const mapStateToProps = state => ({
    loading: state.Auth.loading,
    edit_show: state.Projects.edit_show,
    editPrjStatus: state.Projects.editPrjStatus,
    edit_project: state.Projects.edit_project,
})
export default connect(mapStateToProps, {
    Set_view_edit_project,
    get_projects,
    reset_project_status,
    add_edit_project,
    delete_edit_project
})(NewProjects)


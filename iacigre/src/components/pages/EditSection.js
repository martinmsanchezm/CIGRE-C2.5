import { connect } from 'react-redux';
import {
    Set_view_edit_section,
    reset_section_status,
    get_sections,
    setEditSection,
    delete_edit_section
} from '../../redux/actions/section';
import { useRef, useState, useEffect} from 'react';
import { Oval } from 'react-loader-spinner';
import { setAlert } from '../../redux/actions/alert';
import {Modal, OverlayTrigger, Popover} from 'react-bootstrap';
import MDEditor from '@uiw/react-md-editor';

function EditSection({
    loading,
    setAlert,
    reset_section_status,
    get_sections,
    Set_view_edit_section,
    show_edit,
    editSectionStatus,
    setEditSection,
    edit_section,
    post_project,
    delete_edit_section
}) {

    useEffect(() => {
        console.log('HOLAAAA')
      }, []);

    const title = useRef(null);
    const desc = useRef(null);
    const image = useRef(null);
    const code = useRef(null);
    const delete_image = useRef(null);
    const md = useRef(null);

    const [mdvalue, mdsetValue] = useState(edit_section?edit_section.desc:'');
    const [selectImage, setselectImage] = useState(false);

    const onSubmit = e =>{
        e.preventDefault();
        const image_value = image.current.files.length? image.current.files[0]:null
        const section_id = edit_section.id
        let checked_value = null
        if (!selectImage && delete_image.current){
            checked_value = delete_image.current.checked;
        }else{  
            checked_value = 'false';
        }
        if (image_value || 
            title.current.value ||
            desc.current.value || 
            code.current.value)
            {
                setEditSection(
                    image_value,
                    section_id,
                    title.current.value,
                    desc.current.value,
                    code.current.value,
                    checked_value                     
                )
        }else{
            setAlert(true,'Error, debe agregar al menos un elemento', '#fcbfbf')
        }
    }  

    if (!loading && editSectionStatus){
        Set_view_edit_section(false)
        reset_section_status()
        get_sections(post_project.id)
    }

    const handleClose = (e) =>{
        Set_view_edit_section(false)
        setselectImage(false)
    }

    const onDelete = (e) =>{
        e.preventDefault();
        delete_edit_section(edit_section.id)
    }

    const onPrevent = (e) =>{
       e.preventDefault();
    }

    const onImange = (e) =>{
        setselectImage(true)
    }

  return (
        <Modal
            show={show_edit}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            >
            <Modal.Header closeButton>
                <Modal.Title>
                    Editar Sección
                </Modal.Title>
            </Modal.Header>
                <Modal.Body>
                <form onSubmit={e=>onSubmit(e)}>
                    <h6>Upload a photo...</h6>                
                    <div className="ml-2 mr-2 col-lg-12 mb-0">
                        <input ref={image} onChange={onImange} type="file" className="form-control"/>
                    </div>
                    {!selectImage && edit_section && edit_section.photo?
                    <div className="form-check mb-4 ml-2">
                        <input ref={delete_image} className="form-check-input" type="checkbox" id="flexCheckDefault" />
                        <label className="form-check-label" for="flexCheckDefault">
                            Eliminar Imagen Existente
                        </label>
                    </div>
                    :<div className='mb-4'></div>}   
                    <div className="form-outline mb-2">
                            <input 
                                className="form-control" 
                                ref={title}
                                type="text"
                                defaultValue={edit_section?edit_section.title:''}
                                maxLength={200}
                            />
                        <label className="form-label" htmlFor="form3Example3">Título de la Sección</label>
                    </div>                 
                    <div className="form-outline mb-2">
                        <MDEditor
                            value={mdvalue}
                            autoFocus={false}
                            ref={md}
                            onChange={mdsetValue}
                            previewOptions={{ skipHtml: true, escapeHtml: true, transformLinkUri: null, linkTarget: '_blank' }}
                        />
                        <label className="form-label" htmlFor="form3Example3">Descripción de la Sección</label>
                    </div>
                    <div className="form-outline mb-2">
                        <textarea 
                                className="form-control" 
                                ref={code}
                                defaultValue={edit_section?edit_section.code:''}
                                type="text-area"
                            />
                        <label className="form-label" htmlFor="form3Example3">Código de la Sección</label>
                    </div>                     
                    <div className='d-flex flex-row-reverse'>
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
                        <button onClick={onSubmit} type="submit" className="btn btn-primary btn-block btn-lg mb-2">
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
  )
}
const mapStateToProps = state => ({
    loading: state.Auth.loading,
    show_edit: state.Section.show_edit,
    edit_section: state.Section.edit_section,
    editSectionStatus: state.Section.editSectionStatus,
    post_project: state.Projects.post_project,
})
export default connect(mapStateToProps, {
    setAlert,
    reset_section_status,
    get_sections,
    Set_view_edit_section,
    setEditSection,
    delete_edit_section
})(EditSection)


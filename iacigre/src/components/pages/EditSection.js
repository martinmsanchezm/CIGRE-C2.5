import { connect } from 'react-redux';
import {
    Set_view_edit_section,
    reset_section_status,
    get_sections,
    setEditSection,
    delete_edit_section
} from '../../redux/actions/section';
import { useRef, useState} from 'react';
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

    const image = useRef(null);
    const delete_image = useRef(null);
    const md = useRef(null);

    const [mdvalue, mdsetValue] = useState('');
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
            md.current.markdown)
            {
                setEditSection(
                    image_value,
                    section_id,
                    "",
                    md.current.markdown,
                    "",
                    checked_value                     
                )
        }else{
            setAlert(true,'Error, debe agregar al menos un elemento', '#fcbfbf')
        }
        mdsetValue('')
    }  

    if (!loading && editSectionStatus){
        Set_view_edit_section(false)
        reset_section_status()
        get_sections(post_project.id)
        mdsetValue('')
    }

    const handleClose = (e) =>{
        Set_view_edit_section(false)
        setselectImage(false)
        mdsetValue('')
    }

    const onDelete = (e) =>{
        e.preventDefault();
        delete_edit_section(edit_section.id)
        mdsetValue('')
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
                    <div className="form-outline mb-2" data-color-mode="light">
                        <MDEditor
                            value={mdvalue?mdvalue:edit_section?edit_section.desc:''}
                            autoFocus={false}
                            ref={md}
                            onChange={mdsetValue}
                            previewOptions={{ skipHtml: true, escapeHtml: true, transformLinkUri: null, linkTarget: '_blank' }}
                        />
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


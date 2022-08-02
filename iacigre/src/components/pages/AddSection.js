import { connect } from 'react-redux';
import {Modal} from 'react-bootstrap';
import {
    Set_view_new_section,
    setAddSection,
    reset_section_status,
    get_sections
} from '../../redux/actions/section';
import { useRef} from 'react';
import { Oval } from 'react-loader-spinner';
import { setAlert } from '../../redux/actions/alert';

function AddSection({
    show,
    loading,
    Set_view_new_section,
    setAddSection,
    setAlert,
    addSectionStatus,
    post_project,
    reset_section_status,
    get_sections
}) {

    const title = useRef(null);
    const desc = useRef(null);
    const image = useRef(null);
    const code = useRef(null);
    
    const onSubmit = e =>{
        e.preventDefault();
        const image_value = image.current.files.length? image.current.files[0]:null
        const post_prj_id = post_project.id 
        if (image_value || 
            title.current.value ||
            desc.current.value || 
            code.current.value)
            {
                setAddSection(
                    image_value,
                    post_prj_id,
                    title.current.value,
                    desc.current.value,
                    code.current.value 
                )
        }else{
            setAlert(true,'Error, debe agregar al menos un elemento', '#fcbfbf')
        }
    }  

    if (!loading && addSectionStatus){
        Set_view_new_section(false)
        reset_section_status()
        get_sections(post_project.id)
    }

    const handleClose = (e) =>{
        Set_view_new_section(false)
    }

  return (
        <>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Crear una Nueva Sección
                </Modal.Title>
            </Modal.Header>
                <Modal.Body>
                <form onSubmit={e=>onSubmit(e)}>
                    <h6>Upload a photo...</h6>                
                    <div className="ml-2 mr-2 col-lg-12 mb-4">
                        <input ref={image} type="file" className="form-control"/>
                    </div>   
                    <div className="form-outline mb-2">
                            <input 
                                className="form-control" 
                                ref={title}
                                type="text"
                                maxLength={200}
                            />
                        <label className="form-label" htmlFor="form3Example3">Título de la Sección</label>
                    </div>                 
                    <div className="form-outline mb-2">
                        <textarea 
                                className="form-control" 
                                ref={desc}
                                type="text-area"
                            />
                        <label className="form-label" htmlFor="form3Example3">Descripción de la Sección</label>
                    </div>
                    <div className="form-outline mb-2">
                        <textarea 
                                className="form-control" 
                                ref={code}
                                type="text-area"
                            />
                        <label className="form-label" htmlFor="form3Example3">Código de la Sección</label>
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
                        <button onClick={onSubmit} type="submit" className="btn btn-primary btn-block btn-lg mb-2">
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
    show: state.Section.show,
    addSectionStatus: state.Section.addSectionStatus,
    post_project: state.Projects.post_project,
})
export default connect(mapStateToProps, {
    Set_view_new_section,
    setAddSection,
    setAlert,
    reset_section_status,
    get_sections
})(AddSection)


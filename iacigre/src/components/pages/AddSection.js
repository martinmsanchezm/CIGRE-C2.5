import { connect } from 'react-redux';
import {Modal} from 'react-bootstrap';
import {
    Set_view_new_section,
    setAddSection,
    reset_section_status,
    get_sections
} from '../../redux/actions/section';
import { useRef, useState} from 'react';
import { Oval } from 'react-loader-spinner';
import { setAlert } from '../../redux/actions/alert';
import MDEditor from '@uiw/react-md-editor';

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

    const image = useRef(null);
    const md = useRef(null);

    const [mdvalue, mdsetValue] = useState("");
    
    const onSubmit = e =>{
        e.preventDefault();
        const image_value = image.current.files.length? image.current.files[0]:null
        const post_prj_id = post_project.id 
        if (image_value || 
            md.current.markdown)
            {
                setAddSection(
                    image_value,
                    post_prj_id,
                    "",
                    md.current.markdown,
                    "" 
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
                    <div className="form-outline mb-2" data-color-mode="light">
                        <MDEditor
                            value={mdvalue}
                            autoFocus={false}
                            ref={md}
                            onChange={mdsetValue}
                            previewOptions={{ skipHtml: true, escapeHtml: true, transformLinkUri: null, linkTarget: '_blank' }}
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


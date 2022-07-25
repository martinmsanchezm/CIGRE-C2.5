import {connect} from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import { setAlert } from '../redux/actions/alert'
function Alert ({ alert, setAlert }) {
    const handleClose = () => {
        setAlert(false, '', '')
    }

    return (
        <Modal show={alert.show} onHide={handleClose}>
            <Modal.Body style={{ backgroundColor: alert.alertType }}>
                {alert.msg}
            </Modal.Body>
        </Modal>
    )
}

const mapStateToProps = state => ({
    alert: state.Alert
})

export default connect(mapStateToProps, {setAlert})(Alert)
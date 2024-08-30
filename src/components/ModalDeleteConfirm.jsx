import Modal from 'react-bootstrap/Modal';

function ModalDeleteConfirm (props) {
    
    const handleSubmit = (event) => {
        if (!event.target.checkValidity()) {
            event.preventDefault();
            return;
        }

        event.preventDefault();
        props.handleDelete(props.id);
    }

    const modalProps = {show: props.show, onHide: props.onHide}
    return (
    <Modal {...modalProps}>
        <Modal.Header closeButton>
            <div className="modal-title">Delete Confirmation</div>
        </Modal.Header>
        <Modal.Body>
            <div>
                <h4>Are you sure you want to delete {props.name}?</h4>
                <hr />
                <div className="d-flex w-100 justify-content-between">
                    <button className="btn btn-secondary" onClick={props.onHide}>Cancel</button>
                    <button className="btn btn-danger" onClick={handleSubmit}>Confirm</button>

                </div>
            </div>
        </Modal.Body>
    </Modal>)
}



export default ModalDeleteConfirm;
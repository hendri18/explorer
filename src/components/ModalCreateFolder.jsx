import {  useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalCreateFolder (props) {
    const [name, setName] = useState('');
    
    const handleSubmit = (event) => {
        if (!event.target.checkValidity()) {
            event.preventDefault();
            return;
        }

        event.preventDefault();
        props.handleSave(name, (props.parent_id ?? null))
        setTimeout(() => setName(''), 500)
    }

    const modalProps = {show: props.show, onHide: props.onHide}
    return (
    <Modal {...modalProps}>
        <Modal.Header closeButton>
            <Modal.Title>Create Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" className="form-control" id="name" value={name} required={true} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mt-3 text-center">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </Modal.Body>
    </Modal>)
}



export default ModalCreateFolder;
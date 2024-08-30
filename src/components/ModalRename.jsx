import {  useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function ModalRename (props) {
    const [name, setName] = useState('');
    useEffect(() => { setName(props.name)}, [props.name] )

    const handleSubmit = (event) => {
        if (!event.target.checkValidity()) {
            event.preventDefault();
            return;
        }

        event.preventDefault();
        props.handleSave(props.id, name);
    }

    const modalProps = {show: props.show, onHide: props.onHide}
    const type = props.type ?? 'Folder';
    return (
    <Modal {...modalProps}>
        <Modal.Header closeButton>
            <Modal.Title>Rename {type}</Modal.Title>
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



export default ModalRename;
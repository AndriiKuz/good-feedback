import { forwardRef } from 'react';
import modalImg from '../../images/modal.png';
import './modal.scss';

const Modal = forwardRef((props, ref) => {
  return (
    <div className="modal" ref={ref}>
      <img className="modal-img" src={modalImg} alt="Modal" />
    </div>
  );
});
export default Modal;

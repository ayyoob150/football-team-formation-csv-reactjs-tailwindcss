import React from 'react'
import Modal from '../snippets/Modal';
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";


const FormationDialog = ({showFormationDialog,setShowFormationDialog,warning}) => {
  return (
    <Modal
    maxWidth={"max-w-sm"}
    isOpen={showFormationDialog}
    setIsOpen={setShowFormationDialog}
    isEableColose={true}
  >
    <div className="flex justify-center gap-x-1.5">
        <ExclamationTriangleIcon className='w-6 h-6 text-primary'/>
        <span className='text-white font-semibold'>{warning?.heading}</span>
    </div>
    <div className='text-center text-primary-text mt-2 text-sm'>{warning?.msg}</div>
  </Modal>
  )
}

export default FormationDialog
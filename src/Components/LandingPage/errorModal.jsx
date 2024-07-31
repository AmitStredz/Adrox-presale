import React from 'react';
import CloseIcon from "./CloseIcon";

function errorModal({closeModal, errorText}) {
    return (
        <div className="modal-overlay p-3" data-aos="fade-in">
          <div
            className="flex flex-col gap-3 p-4 sm:p-10 bg-gradient-to-tr from-[#0F011A] to-[#521B84] rounded-2xl"
            data-aos="zoom-in"
          >
            <div className="flex justify-between">
              <span className='text-2xl text-red-600 font-serif font-semibold'>Error</span>
              <div
                onClick={closeModal}
                style={{
                  cursor: "pointer",
                }}
              >
                <CloseIcon className="max-w-5" />
              </div>
            </div>
            <span className="text-red-500">
              {errorText}
            </span>
          </div>
        </div>
    );
}

export default errorModal;
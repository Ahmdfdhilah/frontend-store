import React from 'react';

const SmartphoneSpecs = ({ specs }) => {
  return (
    <div className="card shadow-sm my-3">
      <div className="card-header bg-black text-white">
        <h5 className="mb-0">Smartphone Specifications</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <p className="small mb-1"><strong>Brand:</strong> {specs.brand}</p>
            <p className="small mb-1"><strong>Model:</strong> {specs.model}</p>
            <p className="small mb-1"><strong>Company:</strong> {specs.company}</p>
            <p className="small mb-1"><strong>OS:</strong> {specs.os}</p>
            <p className="small mb-1"><strong>Chipset:</strong> {specs.chipset}</p>
            <p className="small mb-1"><strong>CPU:</strong> {specs.cpu}</p>
            <p className="small mb-1"><strong>GPU:</strong> {specs.gpu}</p>
            <p className="small mb-1"><strong>Card Slot:</strong> {specs.cardSlot ? 'Yes' : 'No'}</p>
            <p className="small mb-1"><strong>Internal:</strong> {specs.internal}</p>
            <p className="small mb-1"><strong>Dual Camera:</strong> {specs.dualCamera}</p>
            <p className="small mb-1"><strong>Features:</strong> {specs.features}</p>
            <p className="small mb-1"><strong>Dual Video:</strong> {specs.dualVideo}</p>
            <p className="small mb-1"><strong>Single Camera:</strong> {specs.singleCamera}</p>
            <p className="small mb-1"><strong>Single Video:</strong> {specs.singleVideo}</p>
            <p className="small mb-1"><strong>Loudspeaker:</strong> {specs.loudspeaker ? 'Yes' : 'No'}</p>
            <p className="small mb-1"><strong>WLAN:</strong> {specs.wlan}</p>
            <p className="small mb-1"><strong>Bluetooth:</strong> {specs.bluetooth}</p>
          </div>
          <div className="col-md-6">
            <p className="small mb-1"><strong>Positioning:</strong> {specs.positioning}</p>
            <p className="small mb-1"><strong>NFC:</strong> {specs.nfc ? 'Yes' : 'No'}</p>
            <p className="small mb-1"><strong>Infrared Port:</strong> {specs.infraredPort ? 'Yes' : 'No'}</p>
            <p className="small mb-1"><strong>Radio:</strong> {specs.radio ? 'Yes' : 'No'}</p>
            <p className="small mb-1"><strong>USB:</strong> {specs.usb}</p>
            <p className="small mb-1"><strong>Battery Type:</strong> {specs.batteryType}</p>
            <p className="small mb-1"><strong>Charging:</strong> {specs.charging}</p>
            <p className="small mb-1"><strong>Screen Type:</strong> {specs.screenType}</p>
            <p className="small mb-1"><strong>Screen Size:</strong> {specs.screenSize}</p>
            <p className="small mb-1"><strong>Resolution:</strong> {specs.resolution}</p>
            <p className="small mb-1"><strong>Dimensions:</strong> {specs.dimensions}</p>
            <p className="small mb-1"><strong>Weight:</strong> {specs.weight}</p>
            <p className="small mb-1"><strong>Build:</strong> {specs.build}</p>
            <p className="small mb-1"><strong>SIM:</strong> {specs.sim}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartphoneSpecs;
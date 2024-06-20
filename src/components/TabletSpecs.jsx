import React from 'react';

const TabletSpecs = ({ specs }) => {
  return (
    <div className="card shadow-sm my-3">
      <div className="card-header bg-black text-white">
        <h5 className="mb-0">Tablet Specifications</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <p className="small mb-1"><strong>Brand:</strong> {specs.brand}</p>
            <p className="small mb-1"><strong>Model:</strong> {specs.model}</p>
            <p className="small mb-1"><strong>Launched:</strong> {specs.launched}</p>
            <p className="small mb-1"><strong>Dimensions:</strong> {specs.dimensions}</p>
            <p className="small mb-1"><strong>Weight:</strong> {specs.weight}</p>
            <p className="small mb-1"><strong>Battery Capacity:</strong> {specs.batteryCapacity}</p>
            <p className="small mb-1"><strong>Removable Battery:</strong> {specs.removableBattery}</p>
            <p className="small mb-1"><strong>Screen Size:</strong> {specs.screenSize}</p>
            <p className="small mb-1"><strong>Touchscreen:</strong> {specs.touchscreen ? 'Yes' : 'No'}</p>
            <p className="small mb-1"><strong>Resolution:</strong> {specs.resolution}</p>
            <p className="small mb-1"><strong>PPI:</strong> {specs.ppi}</p>
            <p className="small mb-1"><strong>Processor:</strong> {specs.processor}</p>
            <p className="small mb-1"><strong>Processor Make:</strong> {specs.processorMake}</p>
            <p className="small mb-1"><strong>RAM:</strong> {specs.ram}</p>
            <p className="small mb-1"><strong>Internal Storage:</strong> {specs.internalStorage}</p>
            <p className="small mb-1"><strong>Expandable Storage:</strong> {specs.expandableStorage}</p>
          </div>
          <div className="col-md-6">
            <p className="small mb-1"><strong>Rear Camera:</strong> {specs.rearCamera}</p>
            <p className="small mb-1"><strong>Rear Flash:</strong> {specs.rearFlash}</p>
            <p className="small mb-1"><strong>Front Camera:</strong> {specs.frontCamera}</p>
            <p className="small mb-1"><strong>Operating System:</strong> {specs.operatingSystem}</p>
            <p className="small mb-1"><strong>Wi-Fi:</strong> {specs.wifi}</p>
            <p className="small mb-1"><strong>GPS:</strong> {specs.gps}</p>
            <p className="small mb-1"><strong>Bluetooth:</strong> {specs.bluetooth}</p>
            <p className="small mb-1"><strong>NFC:</strong> {specs.nfc ? 'Yes' : 'No'}</p>
            <p className="small mb-1"><strong>Infrared:</strong> {specs.infrared ? 'Yes' : 'No'}</p>
            <p className="small mb-1"><strong>USB OTG:</strong> {specs.usbOtg}</p>
            <p className="small mb-1"><strong>Headphones:</strong> {specs.headphones}</p>
            <p className="small mb-1"><strong>FM:</strong> {specs.fm ? 'Yes' : 'No'}</p>
            <p className="small mb-1"><strong>Wi-Fi Direct:</strong> {specs.wifiDirect ? 'Yes' : 'No'}</p>
            <p className="small mb-1"><strong>MHL:</strong> {specs.mhl ? 'Yes' : 'No'}</p>
            <p className="small mb-1"><strong>Compass/ Magnetometer:</strong> {specs.compassMagnetometer ? 'Yes' : 'No'}</p>
            <p className="small mb-1"><strong>Proximity Sensor:</strong> {specs.proximitySensor ? 'Yes' : 'No'}</p>
            <p className="small mb-1"><strong>Accelerometer:</strong> {specs.accelerometer ? 'Yes' : 'No'}</p>
            <p className="small mb-1"><strong>Ambient Light Sensor:</strong> {specs.ambientLightSensor ? 'Yes' : 'No'}</p>
            <p className="small mb-1"><strong>Gyroscope:</strong> {specs.gyroscope ? 'Yes' : 'No'}</p>
            <p className="small mb-1"><strong>Barometer:</strong> {specs.barometer ? 'Yes' : 'No'}</p>
            <p className="small mb-1"><strong>Temperature Sensor:</strong> {specs.temperatureSensor ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabletSpecs;
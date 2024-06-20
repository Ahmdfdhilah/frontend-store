import React from 'react';

const LaptopDetails = ({ specs }) => {
    return (
        <div className="card shadow-sm my-3">
            <div className="card-header bg-black text-white">
                <h5 className="mb-0">Laptop Specifications</h5>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <p className="small mb-1"><strong>Fingerprint Sensor:</strong> {specs.fingerprintSensor}</p>
                        <p className="small mb-1"><strong>Resolution:</strong> {specs.resolution}</p>
                        <p className="small mb-1"><strong>Wi-Fi Standards Supported:</strong> {specs.wifiStandardsSupported}</p>
                        <p className="small mb-1"><strong>Weight (kg):</strong> {specs.weight}</p>
                        <p className="small mb-1"><strong>Dimensions (mm):</strong> {specs.dimensions}</p>
                        <p className="small mb-1"><strong>Bluetooth Version:</strong> {specs.bluetoothVersion}</p>
                        <p className="small mb-1"><strong>Number of USB Ports:</strong> {specs.numberOfUSBPorts}</p>
                        <p className="small mb-1"><strong>Series:</strong> {specs.series}</p>
                        <p className="small mb-1"><strong>Internal Mic:</strong> {specs.internalMic}</p>
                        <p className="small mb-1"><strong>Touch Screen:</strong> {specs.touchScreen}</p>
                        <p className="small mb-1"><strong>Base Clock Speed:</strong> {specs.baseClockSpeed}</p>
                        <p className="small mb-1"><strong>Product Name:</strong> {specs.productName}</p>
                        <p className="small mb-1"><strong>Touchpad:</strong> {specs.touchpad}</p>
                        <p className="small mb-1"><strong>Battery Cell:</strong> {specs.batteryCell}</p>
                        <p className="small mb-1"><strong>Pointer Device:</strong> {specs.pointerDevice}</p>
                        <p className="small mb-1"><strong>Cache:</strong> {specs.cache}</p>
                        <p className="small mb-1"><strong>Mic In:</strong> {specs.micIn}</p>
                        <p className="small mb-1"><strong>Speakers:</strong> {specs.speakers}</p>
                        <p className="small mb-1"><strong>Multi Card Slot:</strong> {specs.multiCardSlot}</p>
                        <p className="small mb-1"><strong>RJ45 LAN:</strong> {specs.rj45LAN}</p>
                        <p className="small mb-1"><strong>HDMI Port:</strong> {specs.hdmiPort}</p>
                        <p className="small mb-1"><strong>Ethernet:</strong> {specs.ethernet}</p>
                        <p className="small mb-1"><strong>Battery Life:</strong> {specs.batteryLife}</p>
                        <p className="small mb-1"><strong>Dedicated Graphic Memory Type:</strong> {specs.dedicatedGraphicMemoryType}</p>
                        <p className="small mb-1"><strong>Expandable RAM:</strong> {specs.expandableRAM}</p>
                    </div>
                    <div className="col-md-6">
                        <p className="small mb-1"><strong>Brand:</strong> {specs.brand}</p>
                        <p className="small mb-1"><strong>Model:</strong> {specs.model}</p>
                        <p className="small mb-1"><strong>Company:</strong> {specs.company}</p>
                        <p className="small mb-1"><strong>RAM:</strong> {specs.ram}</p>
                        <p className="small mb-1"><strong>Size:</strong> {specs.size}</p>
                        <p className="small mb-1"><strong>SSD:</strong> {specs.ssd}</p>
                        <p className="small mb-1"><strong>Operating System:</strong> {specs.operatingSystem}</p>
                        <p className="small mb-1"><strong>Hard Disk:</strong> {specs.hardDisk}</p>
                        <p className="small mb-1"><strong>Model Number:</strong> {specs.modelNumber}</p>
                        <p className="small mb-1"><strong>Processor:</strong> {specs.processor}</p>
                        <p className="small mb-1"><strong>Graphics Processor:</strong> {specs.graphicsProcessor}</p>
                        <p className="small mb-1"><strong>Dedicated Graphics:</strong> {specs.dedicatedGraphics}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LaptopDetails;
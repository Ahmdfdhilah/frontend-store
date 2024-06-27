import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Card, CardBody } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AdminNavbar, Footer } from '../../../components';

const EditSpecs = () => {
    const { id, category } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch product details');
            }
            const data = await response.json();
            setProduct(data);
            initializeFormData(data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const initializeFormData = (productData) => {
        let initialData = {};

        switch (category) {
            case 'tablet':
                initialData = {
                    brand: productData.tabletSpecs.brand || '',
                    model: productData.tabletSpecs.model || '',
                    launched: productData.tabletSpecs.launched || '',
                    dimensions: productData.tabletSpecs.dimensions || '',
                    weight: productData.tabletSpecs.weight || '',
                    batteryCapacity: productData.tabletSpecs.batteryCapacity || '',
                    removableBattery: productData.tabletSpecs.removableBattery || '',
                    screenSize: productData.tabletSpecs.screenSize || '',
                    touchscreen: productData.tabletSpecs.touchscreen || false,
                    resolution: productData.tabletSpecs.resolution || '',
                    ppi: productData.tabletSpecs.ppi || '',
                    processor: productData.tabletSpecs.processor || '',
                    processorMake: productData.tabletSpecs.processorMake || '',
                    ram: productData.tabletSpecs.ram || '',
                    internalStorage: productData.tabletSpecs.internalStorage || '',
                    expandableStorage: productData.tabletSpecs.expandableStorage || '',
                    rearCamera: productData.tabletSpecs.rearCamera || '',
                    rearFlash: productData.tabletSpecs.rearFlash || '',
                    frontCamera: productData.tabletSpecs.frontCamera || '',
                    operatingSystem: productData.tabletSpecs.operatingSystem || '',
                    wifi: productData.tabletSpecs.wifi || '',
                    gps: productData.tabletSpecs.gps || '',
                    bluetooth: productData.tabletSpecs.bluetooth || '',
                    nfc: productData.tabletSpecs.nfc || false,
                    infrared: productData.tabletSpecs.infrared || false,
                    usbOtg: productData.tabletSpecs.usbOtg || '',
                    headphones: productData.tabletSpecs.headphones || '',
                    fm: productData.tabletSpecs.fm || false,
                    wifiDirect: productData.tabletSpecs.wifiDirect || false,
                    mhl: productData.tabletSpecs.mhl || false,
                    compassMagnetometer: productData.tabletSpecs.compassMagnetometer || false,
                    proximitySensor: productData.tabletSpecs.proximitySensor || false,
                    accelerometer: productData.tabletSpecs.accelerometer || false,
                    ambientLightSensor: productData.tabletSpecs.ambientLightSensor || false,
                    gyroscope: productData.tabletSpecs.gyroscope || false,
                    barometer: productData.tabletSpecs.barometer || false,
                    temperatureSensor: productData.tabletSpecs.temperatureSensor || false
                };
                break;
            case 'smartphone':
                initialData = {
                    brand: productData.smartphoneSpecs.brand || '',
                    model: productData.smartphoneSpecs.model || '',
                    company: productData.smartphoneSpecs.company || '',
                    os: productData.smartphoneSpecs.os || '',
                    chipset: productData.smartphoneSpecs.chipset || '',
                    cpu: productData.smartphoneSpecs.cpu || '',
                    gpu: productData.smartphoneSpecs.gpu || '',
                    cardSlot: productData.smartphoneSpecs.cardSlot || false,
                    internal: productData.smartphoneSpecs.internal || '',
                    dualCamera: productData.smartphoneSpecs.dualCamera || '',
                    features: productData.smartphoneSpecs.features || '',
                    dualVideo: productData.smartphoneSpecs.dualVideo || '',
                    singleCamera: productData.smartphoneSpecs.singleCamera || '',
                    singleVideo: productData.smartphoneSpecs.singleVideo || '',
                    loudspeaker: productData.smartphoneSpecs.loudspeaker || false,
                    wlan: productData.smartphoneSpecs.wlan || '',
                    bluetooth: productData.smartphoneSpecs.bluetooth || '',
                    positioning: productData.smartphoneSpecs.positioning || '',
                    nfc: productData.smartphoneSpecs.nfc || false,
                    infraredPort: productData.smartphoneSpecs.infraredPort || false,
                    radio: productData.smartphoneSpecs.radio || false,
                    usb: productData.smartphoneSpecs.usb || '',
                    batteryType: productData.smartphoneSpecs.batteryType || '',
                    charging: productData.smartphoneSpecs.charging || '',
                    screenType: productData.smartphoneSpecs.screenType || '',
                    screenSize: productData.smartphoneSpecs.screenSize || '',
                    resolution: productData.smartphoneSpecs.resolution || '',
                    dimensions: productData.smartphoneSpecs.dimensions || '',
                    weight: productData.smartphoneSpecs.weight || '',
                    build: productData.smartphoneSpecs.build || '',
                    sim: productData.smartphoneSpecs.sim || ''
                };
                break;
            case 'laptop':
                initialData = {
                    brand: productData.laptopSpecs.brand || '',
                    model: productData.laptopSpecs.model || '',
                    company: productData.laptopSpecs.company || '',
                    ram: productData.laptopSpecs.ram || '',
                    size: productData.laptopSpecs.size || '',
                    ssd: productData.laptopSpecs.ssd || '',
                    operatingSystem: productData.laptopSpecs.operatingSystem || '',
                    hardDisk: productData.laptopSpecs.hardDisk || '',
                    modelNumber: productData.laptopSpecs.modelNumber || '',
                    processor: productData.laptopSpecs.processor || '',
                    graphicsProcessor: productData.laptopSpecs.graphicsProcessor || '',
                    dedicatedGraphics: productData.laptopSpecs.dedicatedGraphics || '',
                    fingerprintSensor: productData.laptopSpecs.fingerprintSensor || '',
                    resolution: productData.laptopSpecs.resolution || '',
                    wifiStandardsSupported: productData.laptopSpecs.wifiStandardsSupported || '',
                    weight: productData.laptopSpecs.weight || '',
                    dimensions: productData.laptopSpecs.dimensions || '',
                    bluetoothVersion: productData.laptopSpecs.bluetoothVersion || '',
                    numberOfUSBPorts: productData.laptopSpecs.numberOfUSBPorts || '',
                    series: productData.laptopSpecs.series || '',
                    internalMic: productData.laptopSpecs.internalMic || '',
                    touchScreen: productData.laptopSpecs.touchScreen || '',
                    baseClockSpeed: productData.laptopSpecs.baseClockSpeed || '',
                    productName: productData.laptopSpecs.productName || '',
                    touchpad: productData.laptopSpecs.touchpad || '',
                    batteryCell: productData.laptopSpecs.batteryCell || '',
                    pointerDevice: productData.laptopSpecs.pointerDevice || '',
                    cache: productData.laptopSpecs.cache || '',
                    micIn: productData.laptopSpecs.micIn || '',
                    speakers: productData.laptopSpecs.speakers || '',
                    multiCardSlot: productData.laptopSpecs.multiCardSlot || '',
                    rj45LAN: productData.laptopSpecs.rj45LAN || '',
                    hdmiPort: productData.laptopSpecs.hdmiPort || '',
                    ethernet: productData.laptopSpecs.ethernet || '',
                    batteryLife: productData.laptopSpecs.batteryLife || '',
                    dedicatedGraphicMemoryType: productData.laptopSpecs.dedicatedGraphicMemoryType || '',
                    expandableRAM: productData.laptopSpecs.expandableRAM || ''
                };
                break;
            default:
                console.error('Invalid category:', category);
                break;
        }

        setFormData(initialData);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(formData);
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    [`${category}Specs`]: formData
                })
            });
            if (!response.ok) {
                throw new Error('Failed to update specifications');
            }
            navigate(`/admin/products/update-product/${id}`);
        } catch (error) {
            console.error('Error updating specifications:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const val = type === 'checkbox' ? checked : value;
        setFormData({
            ...formData,
            [name]: val
        });
    };

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <AdminNavbar />
            <div className="container mt-5 p-5">
                <Card className="p-4">
                    <Card.Header>
                        <h5 className="mb-0">Edit Specifications for  {product.name}</h5>
                    </Card.Header>
                    <CardBody>
                        <Form className='pb-5' onSubmit={handleFormSubmit}>
                            {category === 'tablet' && (
                                <>
                                    <Form.Group controlId="formBrand">
                                        <Form.Label>Brand</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="brand"
                                            value={formData.brand}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formModel">
                                        <Form.Label>Model</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="model"
                                            value={formData.model}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formLaunched">
                                        <Form.Label>Launched</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="launched"
                                            value={formData.launched}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formDimensions">
                                        <Form.Label>Dimensions</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="dimensions"
                                            value={formData.dimensions}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formWeight">
                                        <Form.Label>Weight</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="weight"
                                            value={formData.weight}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBatteryCapacity">
                                        <Form.Label>Battery Capacity</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="batteryCapacity"
                                            value={formData.batteryCapacity}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formRemovableBattery">
                                        <Form.Check
                                            type="checkbox"
                                            label="Removable Battery"
                                            name="removableBattery"
                                            checked={formData.removableBattery}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formScreenSize">
                                        <Form.Label>Screen Size</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="screenSize"
                                            value={formData.screenSize}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formTouchscreen">
                                        <Form.Check
                                            type="checkbox"
                                            label="Touchscreen"
                                            name="touchscreen"
                                            checked={formData.touchscreen}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formResolution">
                                        <Form.Label>Resolution</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="resolution"
                                            value={formData.resolution}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formPpi">
                                        <Form.Label>PPI</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="ppi"
                                            value={formData.ppi}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formProcessor">
                                        <Form.Label>Processor</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="processor"
                                            value={formData.processor}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formProcessorMake">
                                        <Form.Label>Processor Make</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="processorMake"
                                            value={formData.processorMake}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formRam">
                                        <Form.Label>RAM</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="ram"
                                            value={formData.ram}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formInternalStorage">
                                        <Form.Label>Internal Storage</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="internalStorage"
                                            value={formData.internalStorage}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formExpandableStorage">
                                        <Form.Label>Expandable Storage</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="expandableStorage"
                                            value={formData.expandableStorage}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formRearCamera">
                                        <Form.Label>Rear Camera</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="rearCamera"
                                            value={formData.rearCamera}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formRearFlash">
                                        <Form.Label>Rear Flash</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="rearFlash"
                                            value={formData.rearFlash}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formFrontCamera">
                                        <Form.Label>Front Camera</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="frontCamera"
                                            value={formData.frontCamera}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formOperatingSystem">
                                        <Form.Label>Operating System</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="operatingSystem"
                                            value={formData.operatingSystem}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formWifi">
                                        <Form.Label>Wi-Fi</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="wifi"
                                            value={formData.wifi}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formGps">
                                        <Form.Label>GPS</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="gps"
                                            value={formData.gps}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBluetooth">
                                        <Form.Label>Bluetooth</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="bluetooth"
                                            value={formData.bluetooth}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formNfc">
                                        <Form.Check
                                            type="checkbox"
                                            label="NFC"
                                            name="nfc"
                                            checked={formData.nfc}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formInfrared">
                                        <Form.Check
                                            type="checkbox"
                                            label="Infrared"
                                            name="infrared"
                                            checked={formData.infrared}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formUsbOtg">
                                        <Form.Label>USB OTG</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="usbOtg"
                                            value={formData.usbOtg}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formHeadphones">
                                        <Form.Label>Headphones</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="headphones"
                                            value={formData.headphones}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formFm">
                                        <Form.Check
                                            type="checkbox"
                                            label="FM Radio"
                                            name="fm"
                                            checked={formData.fm}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formWifiDirect">
                                        <Form.Check
                                            type="checkbox"
                                            label="Wi-Fi Direct"
                                            name="wifiDirect"
                                            checked={formData.wifiDirect}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formMhl">
                                        <Form.Check
                                            type="checkbox"
                                            label="MHL"
                                            name="mhl"
                                            checked={formData.mhl}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formCompassMagnetometer">
                                        <Form.Check
                                            type="checkbox"
                                            label="Compass Magnetometer"
                                            name="compassMagnetometer"
                                            checked={formData.compassMagnetometer}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formProximitySensor">
                                        <Form.Check
                                            type="checkbox"
                                            label="Proximity Sensor"
                                            name="proximitySensor"
                                            checked={formData.proximitySensor}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formAccelerometer">
                                        <Form.Check
                                            type="checkbox"
                                            label="Accelerometer"
                                            name="accelerometer"
                                            checked={formData.accelerometer}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formAmbientLightSensor">
                                        <Form.Check
                                            type="checkbox"
                                            label="Ambient Light Sensor"
                                            name="ambientLightSensor"
                                            checked={formData.ambientLightSensor}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formGyroscope">
                                        <Form.Check
                                            type="checkbox"
                                            label="Gyroscope"
                                            name="gyroscope"
                                            checked={formData.gyroscope}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBarometer">
                                        <Form.Check
                                            type="checkbox"
                                            label="Barometer"
                                            name="barometer"
                                            checked={formData.barometer}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formTemperatureSensor">
                                        <Form.Check
                                            type="checkbox"
                                            label="Temperature Sensor"
                                            name="temperatureSensor"
                                            checked={formData.temperatureSensor}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </>
                            )}
                            {category === 'smartphone' && (
                                <>
                                    <Form.Group controlId="formBrand">
                                        <Form.Label>Brand</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="brand"
                                            value={formData.brand}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formModel">
                                        <Form.Label>Model</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="model"
                                            value={formData.model}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formCompany">
                                        <Form.Label>Company</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formOS">
                                        <Form.Label>Operating System</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="os"
                                            value={formData.os}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formChipset">
                                        <Form.Label>Chipset</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="chipset"
                                            value={formData.chipset}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formCPU">
                                        <Form.Label>CPU</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="cpu"
                                            value={formData.cpu}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formGPU">
                                        <Form.Label>GPU</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="gpu"
                                            value={formData.gpu}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formCardSlot">
                                        <Form.Check
                                            type="checkbox"
                                            label="Card Slot"
                                            name="cardSlot"
                                            checked={formData.cardSlot}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formInternal">
                                        <Form.Label>Internal Storage</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="internal"
                                            value={formData.internal}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formDualCamera">
                                        <Form.Label>Dual Camera</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="dualCamera"
                                            value={formData.dualCamera}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formFeatures">
                                        <Form.Label>Features</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="features"
                                            value={formData.features}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formDualVideo">
                                        <Form.Label>Dual Video</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="dualVideo"
                                            value={formData.dualVideo}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formSingleCamera">
                                        <Form.Label>Single Camera</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="singleCamera"
                                            value={formData.singleCamera}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formSingleVideo">
                                        <Form.Label>Single Video</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="singleVideo"
                                            value={formData.singleVideo}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formLoudspeaker">
                                        <Form.Check
                                            type="checkbox"
                                            label="Loudspeaker"
                                            name="loudspeaker"
                                            checked={formData.loudspeaker}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formWlan">
                                        <Form.Label>Wi-Fi</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="wlan"
                                            value={formData.wlan}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBluetooth">
                                        <Form.Label>Bluetooth</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="bluetooth"
                                            value={formData.bluetooth}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formPositioning">
                                        <Form.Label>Positioning</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="positioning"
                                            value={formData.positioning}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formNfc">
                                        <Form.Check
                                            type="checkbox"
                                            label="NFC"
                                            name="nfc"
                                            checked={formData.nfc}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formInfraredPort">
                                        <Form.Check
                                            type="checkbox"
                                            label="Infrared Port"
                                            name="infraredPort"
                                            checked={formData.infraredPort}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formRadio">
                                        <Form.Check
                                            type="checkbox"
                                            label="Radio"
                                            name="radio"
                                            checked={formData.radio}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formUSB">
                                        <Form.Label>USB</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="usb"
                                            value={formData.usb}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBatteryType">
                                        <Form.Label>Battery Type</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="batteryType"
                                            value={formData.batteryType}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formCharging">
                                        <Form.Label>Charging</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="charging"
                                            value={formData.charging}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formScreenType">
                                        <Form.Label>Screen Type</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="screenType"
                                            value={formData.screenType}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formScreenSize">
                                        <Form.Label>Screen Size</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="screenSize"
                                            value={formData.screenSize}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formResolution">
                                        <Form.Label>Resolution</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="resolution"
                                            value={formData.resolution}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formDimensions">
                                        <Form.Label>Dimensions</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="dimensions"
                                            value={formData.dimensions}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formWeight">
                                        <Form.Label>Weight</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="weight"
                                            value={formData.weight}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBuild">
                                        <Form.Label>Build</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="build"
                                            value={formData.build}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formSim">
                                        <Form.Label>SIM</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="sim"
                                            value={formData.sim}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </>
                            )}
                            {category === 'laptop' && (
                                <>
                                    <Form.Group controlId="brand">
                                        <Form.Label>Brand</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="brand"
                                            value={formData.brand}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="model">
                                        <Form.Label>Model</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="model"
                                            value={formData.model}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="company">
                                        <Form.Label>Company</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="ram">
                                        <Form.Label>RAM</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="ram"
                                            value={formData.ram}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="size">
                                        <Form.Label>Size</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="size"
                                            value={formData.size}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="ssd">
                                        <Form.Label>SSD</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="ssd"
                                            value={formData.ssd}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="operatingSystem">
                                        <Form.Label>Operating System</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="operatingSystem"
                                            value={formData.operatingSystem}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="hardDisk">
                                        <Form.Label>Hard Disk</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="hardDisk"
                                            value={formData.hardDisk}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="modelNumber">
                                        <Form.Label>Model Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="modelNumber"
                                            value={formData.modelNumber}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="processor">
                                        <Form.Label>Processor</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="processor"
                                            value={formData.processor}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="graphicsProcessor">
                                        <Form.Label>Graphics Processor</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="graphicsProcessor"
                                            value={formData.graphicsProcessor}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="dedicatedGraphics">
                                        <Form.Label>Dedicated Graphics</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="dedicatedGraphics"
                                            value={formData.dedicatedGraphics}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="fingerprintSensor">
                                        <Form.Label>Fingerprint Sensor</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="fingerprintSensor"
                                            value={formData.fingerprintSensor}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="resolution">
                                        <Form.Label>Resolution</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="resolution"
                                            value={formData.resolution}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="wifiStandardsSupported">
                                        <Form.Label>Wi-Fi Standards Supported</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="wifiStandardsSupported"
                                            value={formData.wifiStandardsSupported}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="weight">
                                        <Form.Label>Weight</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="weight"
                                            value={formData.weight}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="dimensions">
                                        <Form.Label>Dimensions</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="dimensions"
                                            value={formData.dimensions}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="bluetoothVersion">
                                        <Form.Label>Bluetooth Version</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="bluetoothVersion"
                                            value={formData.bluetoothVersion}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="numberOfUSBPorts">
                                        <Form.Label>Number of USB Ports</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="numberOfUSBPorts"
                                            value={formData.numberOfUSBPorts}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="series">
                                        <Form.Label>Series</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="series"
                                            value={formData.series}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="internalMic">
                                        <Form.Label>Internal Microphone</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="internalMic"
                                            value={formData.internalMic}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="touchScreen">
                                        <Form.Label>Touch Screen</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="touchScreen"
                                            value={formData.touchScreen}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="baseClockSpeed">
                                        <Form.Label>Base Clock Speed</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="baseClockSpeed"
                                            value={formData.baseClockSpeed}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="productName">
                                        <Form.Label>Product Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="productName"
                                            value={formData.productName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="touchpad">
                                        <Form.Label>Touchpad</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="touchpad"
                                            value={formData.touchpad}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="batteryCell">
                                        <Form.Label>Battery Cell</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="batteryCell"
                                            value={formData.batteryCell}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="pointerDevice">
                                        <Form.Label>Pointer Device</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="pointerDevice"
                                            value={formData.pointerDevice}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="cache">
                                        <Form.Label>Cache</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="cache"
                                            value={formData.cache}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="micIn">
                                        <Form.Label>Mic In</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="micIn"
                                            value={formData.micIn}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="speakers">
                                        <Form.Label>Speakers</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="speakers"
                                            value={formData.speakers}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="multiCardSlot">
                                        <Form.Label>Multi Card Slot</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="multiCardSlot"
                                            value={formData.multiCardSlot}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="rj45LAN">
                                        <Form.Label>RJ45 LAN</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="rj45LAN"
                                            value={formData.rj45LAN}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="hdmiPort">
                                        <Form.Label>HDMI Port</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="hdmiPort"
                                            value={formData.hdmiPort}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="ethernet">
                                        <Form.Label>Ethernet</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="ethernet"
                                            value={formData.ethernet}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="batteryLife">
                                        <Form.Label>Battery Life</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="batteryLife"
                                            value={formData.batteryLife}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="dedicatedGraphicMemoryType">
                                        <Form.Label>Dedicated Graphic Memory Type</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="dedicatedGraphicMemoryType"
                                            value={formData.dedicatedGraphicMemoryType}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="expandableRAM">
                                        <Form.Label>Expandable RAM</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="expandableRAM"
                                            value={formData.expandableRAM}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>
                                </>
                            )}
                            <Button className='mt-4 px-5' variant="primary" type="submit">
                                Save
                            </Button>
                        </Form>
                    </CardBody>
                </Card>
            </div>
            <Footer />
        </>
    );
};

export default EditSpecs;
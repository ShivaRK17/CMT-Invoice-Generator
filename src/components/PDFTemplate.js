import ReactPrint from 'react-to-print'
import { useRef } from 'react';

function PDFTemplate(props) {
    const ref = useRef();
    const sum = props.InvoiceData.items.reduce((total, item) => total + item.quantity * item.price, 0);
    return (
        <>
            <div className="container bg-white shadow rounded p-10" ref={ref} >
                <div className="">
                    <div className="flex items-center justify-between">
                        <div className="">
                            <img src="/logo.png" width={100} height={100} alt="" />
                        </div>
                        <div className="m-4 text-right">
                            <h4 style={{ color: '#325aa8' }} className='font-bold text-lg'>CloneMyTrips</h4>
                            <p>(+91) 8527741952</p>
                            <p>admin@clonemytrips.com</p>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h2 className='font-bold text-lg' style={{ color: '#325aa8' }} >INVOICE</h2>
                            <h5> Id: {props.InvoiceData.invoiceNumber}</h5>
                        </div>
                    </div>
                    <br />
                    <div>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th><h5 className='bg-blue-200 p-2'>Place</h5></th>
                                    <th><h5 className='bg-blue-200 p-2'>Quantity</h5></th>
                                    <th><h5 className='bg-blue-200 p-2'>Price</h5></th>
                                    <th><h5 className='bg-blue-200 p-2'>Total</h5></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.InvoiceData.items.length ?
                                        props.InvoiceData.items.map((items, index) => {
                                            return (
                                                <tr key={index} >
                                                    <td className="col-md-9 m-0 p-2 text-center">{items.description}</td>
                                                    <td className="col-md-3 m-0 p-2 text-center"><i className="fas fa-rupee-sign" area-hidden="true"></i> {items.quantity}  </td>
                                                    <td className="col-md-3 m-0 p-2 text-center"><i className="fas fa-rupee-sign" area-hidden="true"></i> ₹ {items.price}  </td>
                                                    <td className="col-md-3 m-0 p-2 text-center"><i className="fas fa-rupee-sign" area-hidden="true"></i> ₹ {items.quantity * items.price}  </td>
                                                </tr>
                                            )
                                        }) : null
                                }
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className='col-md-3 m-0 p-2'>
                                        {/* <div className='flex w-full justify-end'><h4><strong>Total:</strong></h4><h4><strong><i className="fas fa-rupee-sign" area-hidden="true"></i> ₹ {sum} </strong></h4></div> */}
                                        <h4 className='font-bold text-red-500 py-4'>Total : ₹{sum}</h4>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div style={{ color: '#F81D2D' }}>
                        </div>
                    </div>
                    <div className='mt-10'>
                        <div className="col-md-12">
                            <div className='w-full flex justify-evenly'>
                                <p><b>Date :</b> {props.date} </p>
                                <p><b>Time :</b> {props.time} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ReactPrint trigger={() => <button className='bg-blue-500 px-7 py-1 m-5 rounded-full text-white m-2 font-bold'>Print</button>} content={() => ref.current} documentTitle={`INVOICE ${props.invoiceNumber}`} />

            {/* <button onClick={() => setAirPopup(true)} >Add Product</button> */}



            {/* <Popup openAirPopup={openAirPopup} setAirPopup={setAirPopup} products={Products} setProducts={setProducts} /> */}

            {/* POPUP OPEN */}
            {/* <Dialog open={openAirPopup} >
                <DialogTitle>
                    <div className="title">
                        <div className="hed">New product</div>
                        <div className="icon-cross" onClick={() => setAirPopup(false)} ><Close /></div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="container">
                        <div className="forms">
                            <input type="text" value={Item} onChange={(e) => setItem(e.target.value)} placeholder='PR Name' />
                            <input type="text" value={Amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount ₹' />
                        </div>
                        <div className="buttons">
                            <button onClick={addData} >Add</button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog> */}
            {/* POPUP CLOSED */}
        </>

    );
}

export default PDFTemplate;